# Backend - Login Signup API

FastAPI backend with PostgreSQL, SQLAlchemy, and JWT authentication.

## Setup

1. **Create virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# venv\Scripts\activate  # On Windows
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Set up PostgreSQL database:**

-   Create a new PostgreSQL database
-   Copy `.env.example` to `.env`
-   Update database credentials in `.env`

4. **Generate a secret key:**

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Add this to your `.env` as `SECRET_KEY`

5. **Run the server:**

```bash
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

## API Endpoints

-   `POST /api/auth/signup` - Register new user
-   `POST /api/auth/login` - Login and get JWT token
-   `GET /` - Welcome message
-   `GET /health` - Health check

## Documentation

Interactive API docs available at:

-   Swagger UI: `http://localhost:8000/docs`
-   ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── main.py              # FastAPI app entry point
├── config.py            # Configuration settings
├── database.py          # Database connection
├── models/              # SQLAlchemy models
│   └── user.py
├── schemas/             # Pydantic schemas
│   └── user.py
├── routers/             # API endpoints
│   └── auth.py
├── services/            # Business logic
│   └── auth_service.py
└── utils/               # Utilities
    └── security.py      # Password hashing, JWT
```
