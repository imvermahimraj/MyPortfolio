# Backend Integration Contracts - Himraj Verma Portfolio

## Overview
This document outlines the API contracts and integration plan for transforming the frontend mock data into a fully functional backend-integrated portfolio website.

## Current Mock Data Structure
- **Personal Info**: Static profile information (name, title, contact details)
- **Technical Skills**: Categorized skill sets
- **Professional Experience**: Job details and responsibilities  
- **Project Highlights**: Project descriptions and technologies
- **Personal Story**: QA journey and philosophy
- **Contact Form**: Currently shows mock success message

## Backend Implementation Plan

### 1. Database Models

#### Contact Messages Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required), 
  message: String (required),
  timestamp: Date (default: now),
  status: String (enum: ['new', 'read', 'replied'], default: 'new')
}
```

#### Profile Views Model (Analytics)
```javascript
{
  _id: ObjectId,
  visitorIP: String,
  userAgent: String,
  timestamp: Date (default: now),
  section: String (optional - which section was viewed)
}
```

### 2. API Endpoints

#### Contact Management
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, subject, message }`
  - Response: `{ success: true, message: "Message sent successfully" }`
  - Validation: Required fields, email format validation

- `GET /api/contact` - Get all contact messages (admin only)
  - Response: `{ messages: [...], total: number }`

#### Analytics
- `POST /api/analytics/view` - Track page/section views
  - Body: `{ section?: string }`
  - Response: `{ success: true }`

- `GET /api/analytics/stats` - Get portfolio statistics
  - Response: `{ totalViews: number, contactMessages: number }`

#### Profile Data (Static)
- `GET /api/profile` - Get complete profile data
  - Response: All portfolio content (future-proofing for CMS)

### 3. Frontend Integration Changes

#### Contact Form (`/components/Contact.jsx`)
- **Remove**: Mock alert on form submission
- **Add**: Actual API call to `/api/contact`
- **Add**: Loading state during submission
- **Add**: Success/error toast notifications
- **Add**: Form validation and error handling

#### Analytics Integration
- **Add**: Page view tracking on component mount
- **Location**: Hero, About, Skills, Experience, Projects sections
- **Implementation**: useEffect hook with API call

#### Header Component
- **Add**: Optional view counter display
- **Enhancement**: Smooth scroll with section tracking

### 4. Error Handling
- Network error handling for all API calls
- Form validation with user-friendly error messages
- Graceful degradation if backend is unavailable
- Loading states for better UX

### 5. Configuration
- Environment variables for API endpoints
- CORS configuration for frontend-backend communication
- Input sanitization and validation
- Rate limiting for contact form submissions

## Integration Steps

1. **Backend Development**: Create MongoDB models and API endpoints
2. **Frontend API Integration**: Replace mock functions with actual API calls
3. **Error Handling**: Add comprehensive error handling and loading states
4. **Testing**: Test all API endpoints and frontend integration
5. **Polish**: Add toast notifications and enhanced UX features

## Success Criteria
- ✅ Contact form saves messages to database
- ✅ Form submissions show proper success/error feedback
- ✅ Page view analytics working
- ✅ All API endpoints properly secured and validated
- ✅ Frontend gracefully handles API errors
- ✅ Mobile responsiveness maintained

## Notes
- Keep all existing mock data as fallbacks
- Maintain current design and functionality
- Add progressive enhancement with backend features
- Ensure fast loading times and good UX