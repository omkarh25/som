from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import transactions, accounts, metadata

app = FastAPI(
    title="SOM API",
    description="Office Management System API",
    version="1.0.0"
)

# Configure CORS with more permissive settings for development
origins = [
    "http://localhost:3000",    # Next.js frontend
    "http://127.0.0.1:3000",
    "http://localhost:8000",    # FastAPI docs
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Include routers
app.include_router(transactions.router)
app.include_router(accounts.router)
app.include_router(metadata.router)

@app.get("/")
async def root():
    """
    Root endpoint with API information
    """
    return {
        "app": "SOM - Office Management System",
        "version": "1.0.0",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }
