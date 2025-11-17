# Login Signup Backend

FastAPI backend with login and signup functionality.

## Tech Stack

-   **FastAPI** - Modern web framework
-   **SQLAlchemy** - ORM for database
-   **PostgreSQL** - Database
-   **Pydantic** - Data validation
-   **Passlib + Bcrypt** - Password hashing

## Setup

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost/dbname
FRONTEND_URL=http://localhost:3000
```

4. Run the server:

```bash
uvicorn main:app --reload
```

## API Endpoints

### POST /api/auth/signup

Register a new user.

**Request:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-11-15T10:30:00Z"
}
```

### POST /api/auth/login

Login with email and password.

**Request:**

```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Login successful",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2025-11-15T10:30:00Z"
    }
}
```

## Project Structure

```
backend/
├── main.py              # FastAPI app entry point
├── config.py            # Settings configuration
├── database.py          # Database setup
├── requirements.txt     # Dependencies
├── models/
│   └── user.py         # User model
├── schemas/
│   └── user.py         # Pydantic schemas
├── routers/
│   └── auth.py         # Auth endpoints
├── services/
│   └── auth_service.py # Business logic
└── utils/
    └── security.py     # Password hashing
```

## Features

✅ User registration with email validation
✅ Secure password hashing with bcrypt
✅ User login with credential verification
✅ SQLAlchemy ORM
✅ Pydantic validation
✅ CORS enabled for frontend
❌ No sessions (stateless)
❌ No automatic login persistence
