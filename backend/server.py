from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from fastapi import Request


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Himraj Verma Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Portfolio Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ProfileView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    visitor_ip: str
    user_agent: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    section: Optional[str] = None

class ProfileViewCreate(BaseModel):
    section: Optional[str] = None

class AnalyticsStats(BaseModel):
    total_views: int
    contact_messages: int
    unique_visitors: int

# Portfolio Routes
@api_router.get("/")
async def root():
    return {"message": "Himraj Verma Portfolio API", "version": "1.0.0"}

@api_router.post("/contact")
async def submit_contact_message(contact_data: ContactMessageCreate):
    """Submit a new contact message"""
    try:
        contact_dict = contact_data.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Insert into database
        result = await db.contact_messages.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return {
                "success": True, 
                "message": "Thank you for your message! I will get back to you soon.",
                "id": contact_obj.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact")
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return {
            "messages": [ContactMessage(**msg) for msg in messages],
            "total": len(messages)
        }
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/analytics/view")
async def track_page_view(view_data: ProfileViewCreate, request: Request):
    """Track a page or section view"""
    try:
        # Get client IP and user agent
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "Unknown")
        
        view_dict = view_data.dict()
        view_obj = ProfileView(
            visitor_ip=client_ip,
            user_agent=user_agent,
            **view_dict
        )
        
        # Insert into database
        await db.profile_views.insert_one(view_obj.dict())
        
        return {"success": True}
        
    except Exception as e:
        logger.error(f"Error tracking page view: {str(e)}")
        # Don't fail if analytics tracking fails
        return {"success": False}

@api_router.get("/analytics/stats")
async def get_analytics_stats():
    """Get portfolio analytics statistics"""
    try:
        # Count total views
        total_views = await db.profile_views.count_documents({})
        
        # Count contact messages
        contact_messages = await db.contact_messages.count_documents({})
        
        # Count unique visitors
        unique_visitors_pipeline = [
            {"$group": {"_id": "$visitor_ip"}},
            {"$count": "unique_count"}
        ]
        unique_result = await db.profile_views.aggregate(unique_visitors_pipeline).to_list(1)
        unique_visitors = unique_result[0]["unique_count"] if unique_result else 0
        
        return AnalyticsStats(
            total_views=total_views,
            contact_messages=contact_messages,
            unique_visitors=unique_visitors
        )
        
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        return AnalyticsStats(total_views=0, contact_messages=0, unique_visitors=0)

# Legacy routes (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
