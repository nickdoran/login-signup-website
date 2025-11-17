#!/usr/bin/env python3
"""
Clear all users from the database (for development/testing only!)
"""
from database import SessionLocal
from models.user import User

db = SessionLocal()

try:
    # Delete all users
    count = db.query(User).delete()
    db.commit()
    print(f"✅ Deleted {count} users from the database")
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
