from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints.users import users
from app.endpoints.funds import funds

# Create an APIRouter instance to organize endpoints
api_router = APIRouter()

# Create a FastAPI instance
app = FastAPI()

# Include routers for different endpoint groups
api_router.include_router(users)
api_router.include_router(funds)

# Include the main APIRouter instance in the FastAPI app
app.include_router(api_router)

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to your specific allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

"""
FastAPI Application Configuration

This script sets up a FastAPI application with CORS middleware and includes routers
for handling user and fund endpoints.

- `api_router`: An APIRouter instance to organize different endpoint groups.
- `app`: The FastAPI instance that serves as the main application.
- CORS Middleware: Allows cross-origin requests from any origin with credentials, methods, and headers.

"""




