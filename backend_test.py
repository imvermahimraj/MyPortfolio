#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Himraj Verma Portfolio
Tests all backend endpoints for functionality, validation, and error handling
"""

import requests
import json
import time
from datetime import datetime
import sys
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    base_url = line.split('=', 1)[1].strip()
                    return f"{base_url}/api"
        return None
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

print(f"🔗 Testing backend at: {BASE_URL}")

class BackendTester:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.results = []
        
    def log_result(self, test_name, success, message="", details=""):
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.results.append(result)
        
        if success:
            self.passed += 1
            print(f"{status} {test_name}: {message}")
        else:
            self.failed += 1
            print(f"{status} {test_name}: {message}")
            if details:
                print(f"   Details: {details}")
    
    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_result("Root Endpoint", True, "API info returned successfully")
                    return True
                else:
                    self.log_result("Root Endpoint", False, "Missing required fields in response", str(data))
                    return False
            else:
                self.log_result("Root Endpoint", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Root Endpoint", False, "Request failed", str(e))
            return False
    
    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        valid_data = {
            "name": "Himraj Verma",
            "email": "himraj.verma@example.com",
            "subject": "Portfolio Inquiry - Collaboration Opportunity",
            "message": "Hello Himraj, I came across your portfolio and I'm impressed with your work. I would like to discuss a potential collaboration opportunity for a web development project. Please let me know if you're available for a brief call this week."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=valid_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.log_result("Contact Form Valid", True, "Message submitted successfully")
                    return data.get("id")
                else:
                    self.log_result("Contact Form Valid", False, "Invalid response format", str(data))
                    return None
            else:
                self.log_result("Contact Form Valid", False, f"HTTP {response.status_code}", response.text)
                return None
                
        except Exception as e:
            self.log_result("Contact Form Valid", False, "Request failed", str(e))
            return None
    
    def test_contact_form_validation(self):
        """Test POST /api/contact with invalid data"""
        test_cases = [
            {
                "name": "Empty Name",
                "data": {"name": "", "email": "test@example.com", "subject": "Test Subject", "message": "Test message content"},
                "expected_error": "name validation"
            },
            {
                "name": "Invalid Email",
                "data": {"name": "John Doe", "email": "invalid-email", "subject": "Test Subject", "message": "Test message content"},
                "expected_error": "email validation"
            },
            {
                "name": "Short Subject",
                "data": {"name": "John Doe", "email": "test@example.com", "subject": "Hi", "message": "Test message content"},
                "expected_error": "subject length"
            },
            {
                "name": "Short Message",
                "data": {"name": "John Doe", "email": "test@example.com", "subject": "Test Subject", "message": "Short"},
                "expected_error": "message length"
            },
            {
                "name": "Long Name",
                "data": {"name": "A" * 101, "email": "test@example.com", "subject": "Test Subject", "message": "Test message content"},
                "expected_error": "name length"
            },
            {
                "name": "Long Subject",
                "data": {"name": "John Doe", "email": "test@example.com", "subject": "A" * 201, "message": "Test message content"},
                "expected_error": "subject length"
            },
            {
                "name": "Long Message",
                "data": {"name": "John Doe", "email": "test@example.com", "subject": "Test Subject", "message": "A" * 2001},
                "expected_error": "message length"
            }
        ]
        
        validation_passed = 0
        for test_case in test_cases:
            try:
                response = requests.post(f"{BASE_URL}/contact", json=test_case["data"], timeout=10)
                
                if response.status_code == 422:  # Validation error
                    validation_passed += 1
                    self.log_result(f"Validation - {test_case['name']}", True, "Validation error returned as expected")
                else:
                    self.log_result(f"Validation - {test_case['name']}", False, f"Expected 422, got {response.status_code}", response.text)
                    
            except Exception as e:
                self.log_result(f"Validation - {test_case['name']}", False, "Request failed", str(e))
        
        return validation_passed == len(test_cases)
    
    def test_contact_messages_retrieval(self):
        """Test GET /api/contact"""
        try:
            response = requests.get(f"{BASE_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "messages" in data and "total" in data:
                    self.log_result("Contact Messages Retrieval", True, f"Retrieved {data['total']} messages")
                    return True
                else:
                    self.log_result("Contact Messages Retrieval", False, "Invalid response format", str(data))
                    return False
            else:
                self.log_result("Contact Messages Retrieval", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Contact Messages Retrieval", False, "Request failed", str(e))
            return False
    
    def test_analytics_view_tracking(self):
        """Test POST /api/analytics/view"""
        test_cases = [
            {"section": "about"},
            {"section": "projects"},
            {"section": "contact"},
            {"section": None}  # No section
        ]
        
        tracking_passed = 0
        for test_data in test_cases:
            try:
                # Filter out None values
                payload = {k: v for k, v in test_data.items() if v is not None}
                
                response = requests.post(f"{BASE_URL}/analytics/view", json=payload, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        tracking_passed += 1
                        section_name = test_data.get("section", "no section")
                        self.log_result(f"Analytics Tracking - {section_name}", True, "View tracked successfully")
                    else:
                        self.log_result(f"Analytics Tracking - {section_name}", False, "Success flag false", str(data))
                else:
                    section_name = test_data.get("section", "no section")
                    self.log_result(f"Analytics Tracking - {section_name}", False, f"HTTP {response.status_code}", response.text)
                    
            except Exception as e:
                section_name = test_data.get("section", "no section")
                self.log_result(f"Analytics Tracking - {section_name}", False, "Request failed", str(e))
        
        return tracking_passed == len(test_cases)
    
    def test_analytics_stats(self):
        """Test GET /api/analytics/stats"""
        try:
            response = requests.get(f"{BASE_URL}/analytics/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["total_views", "contact_messages", "unique_visitors"]
                
                if all(field in data for field in required_fields):
                    # Verify all values are integers
                    if all(isinstance(data[field], int) for field in required_fields):
                        self.log_result("Analytics Stats", True, f"Stats: {data['total_views']} views, {data['contact_messages']} messages, {data['unique_visitors']} unique visitors")
                        return True
                    else:
                        self.log_result("Analytics Stats", False, "Non-integer values in stats", str(data))
                        return False
                else:
                    self.log_result("Analytics Stats", False, "Missing required fields", str(data))
                    return False
            else:
                self.log_result("Analytics Stats", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Analytics Stats", False, "Request failed", str(e))
            return False
    
    def test_cors_configuration(self):
        """Test CORS headers"""
        try:
            # Make an OPTIONS request with proper CORS headers to check CORS
            headers = {
                'Origin': 'https://example.com',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = requests.options(f"{BASE_URL}/contact", headers=headers, timeout=10)
            
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            headers_present = 0
            for header in cors_headers:
                if header in response.headers:
                    headers_present += 1
            
            if headers_present >= 2:  # At least origin and methods should be present
                self.log_result("CORS Configuration", True, "CORS headers configured properly")
                return True
            else:
                self.log_result("CORS Configuration", False, "Missing CORS headers", str(dict(response.headers)))
                return False
                
        except Exception as e:
            self.log_result("CORS Configuration", False, "Request failed", str(e))
            return False
    
    def test_error_handling(self):
        """Test error handling for malformed requests"""
        try:
            # Send malformed JSON
            response = requests.post(f"{BASE_URL}/contact", 
                                   data="invalid json", 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_result("Error Handling", True, "Malformed request handled properly")
                return True
            else:
                self.log_result("Error Handling", False, f"Expected 400/422, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Error Handling", False, "Request failed", str(e))
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Himraj Verma Portfolio Backend API Tests")
        print("=" * 60)
        
        # Test basic connectivity
        print("\n📡 Testing Basic Connectivity...")
        self.test_root_endpoint()
        
        # Test contact form functionality
        print("\n📝 Testing Contact Form API...")
        contact_id = self.test_contact_form_valid()
        self.test_contact_form_validation()
        self.test_contact_messages_retrieval()
        
        # Test analytics functionality
        print("\n📊 Testing Analytics API...")
        self.test_analytics_view_tracking()
        time.sleep(1)  # Brief pause to ensure views are recorded
        self.test_analytics_stats()
        
        # Test general API features
        print("\n🔧 Testing General API Features...")
        self.test_cors_configuration()
        self.test_error_handling()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📋 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"📊 Total: {self.passed + self.failed}")
        
        if self.failed == 0:
            print("\n🎉 All tests passed! Backend is working correctly.")
        else:
            print(f"\n⚠️  {self.failed} test(s) failed. Check the details above.")
        
        # Print detailed results
        print("\n📝 DETAILED RESULTS:")
        print("-" * 40)
        for result in self.results:
            status = "✅" if result['success'] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
            if result['details'] and not result['success']:
                print(f"   Details: {result['details']}")
        
        return self.failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)