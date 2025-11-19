from fastapi import HTTPException
from sqlalchemy.orm import Session
from config import settings
from datetime import datetime, timedelta, timezone
import jwt
import uuid
from models.user import User
from schemas.user import UserResponse


if not settings.SECRET_KEY:
    raise ValueError("Could not load env data. Make sure env data is configured")
    
def create_jwt_token(data: dict, expires: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    now = datetime.now(timezone.utc)
    expire = now + expires

    to_encode.update({
        "exp": int(expire.timestamp()),  # expiration timestamp
        "iat": int(now.timestamp()),     # issued at timestamp
        "jti": str(uuid.uuid4())        # unique token id
    })

    token = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)
    return token


def verify_jwt_token(token: str, db: Session):
    try:
        payload = jwt.decode(jwt=token,key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_email = payload.get("sub")
    
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.email == user_email).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


