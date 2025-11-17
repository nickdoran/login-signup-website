#!/usr/bin/env python3
"""
Simple test script to verify backend endpoints are working
"""
import requests
import json

API_URL = "http://localhost:8000"

def test_root():
    """Test root endpoint"""
    print("Testing root endpoint...")
    response = requests.get(f"{API_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_signup():
    """Test signup endpoint"""
    print("Testing signup endpoint...")
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "testpassword123"
    }
    response = requests.post(
        f"{API_URL}/api/auth/signup",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    return response.json()

def test_login(email, password):
    """Test login endpoint"""
    print("Testing login endpoint...")
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(
        f"{API_URL}/api/auth/login",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

if __name__ == "__main__":
    try:
        test_root()
        user = test_signup()
        test_login("test@example.com", "testpassword123")
        print("✅ All tests passed!")
    except Exception as e:
        print(f"❌ Error: {e}")
