# Login & Signup Website

A full-stack authentication app with a **Next.js** frontend and a **FastAPI** backend. Users can sign up, log in, and access protected resources via JWT-based session cookies.

## Tech Stack

**Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

**Backend:** FastAPI, SQLAlchemy, PostgreSQL, Pydantic

**Auth:** JWT tokens (HttpOnly cookies), bcrypt password hashing

## Project Structure

```
frontend/               # Next.js app
  app/
    (auth)/             # Login & signup pages + shared AuthForm component
    (main)/             # Home page with welcome message
    components/         # Navbar, Footer, buttons
    services/           # API client functions (login, signup, logout, getMe)

backend/                # FastAPI app
  routers/auth.py       # Auth endpoints (signup, login, logout, me)
  models/user.py        # SQLAlchemy User model
  schemas/user.py       # Pydantic request/response schemas
  services/             # Business logic (user creation, authentication)
  utils/                # Password hashing (bcrypt) and JWT utilities
  config.py             # Environment settings via pydantic-settings
  database.py           # SQLAlchemy engine and session setup
```

## API Endpoints

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/api/auth/signup` | Create a new account               |
| POST   | `/api/auth/login`  | Log in and receive a session cookie |
| POST   | `/api/auth/logout` | Clear the session cookie           |
| GET    | `/api/auth/me`     | Get the current authenticated user |

## Authentication Flow

1. User submits credentials via the frontend form
2. Backend validates credentials, hashes passwords with bcrypt on signup
3. A JWT token is created and set as an HttpOnly cookie
4. Subsequent requests include the cookie automatically
5. The `/me` endpoint verifies the token and returns the user

## Getting Started

### Prerequisites

- Node.js
- Python 3.12+
- PostgreSQL

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-secret-key
ALGORITHM=HS256
```

Run the server:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
