from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from database import get_db
from schemas.user import UserSignup, UserLogin, LoginResponse, UserResponse
from services.auth_service import create_user, authenticate_user
from utils.jwt_utils import create_jwt_token, verify_jwt_token
from models.user import User


router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user: UserSignup,response: Response, db: Session = Depends(get_db)):
    try:
        user = create_user(db, user)
        access_token = create_jwt_token({"sub": user.email})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=3600

        )
        return user;    

    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=LoginResponse)
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    try:
        db_user = authenticate_user(db, user.email, user.password)
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        
        access_token = create_jwt_token({"sub": user.email})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=3600
        )
        
        return {
            "success": True,
            "message": "Login successful",
            "user": db_user
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/me", response_model=UserResponse)
def get_me(request: Request, db: Session = Depends(get_db)):
    
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user = verify_jwt_token(token, db)
    
    return user
        



@router.post("/logout")
def logout(response: Response):
    """Clear the access token cookie to log out the user"""
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=False,
        samesite="lax"
    )
    return {"success": True, "message": "Logged out successfully"}

