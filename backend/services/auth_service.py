from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserSignup
from utils.security import hash_password, verify_password
from fastapi import HTTPException

def create_user(db: Session, user: UserSignup):
    """Create a new user with hashed password"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user with hashed password
    db_user = User(
        name=user.name,
        email=user.email.lower(),
        hashed_password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, str(user.hashed_password)):
        return None
    return user
