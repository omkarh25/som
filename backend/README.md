# SOM Backend API

FastAPI backend for the Office Management System (SOM) that provides APIs for managing transactions, accounts, and database metadata.

## Features

- RESTful API endpoints for:
  - Transactions management
  - Accounts management
  - Freedom (future transactions) tracking
  - Database metadata and schema information
- Async SQLite database operations
- CORS support for frontend integration
- OpenAPI documentation

## Project Structure

```
backend/
├── app/
│   ├── routers/
│   │   ├── transactions.py
│   │   ├── accounts.py
│   │   └── metadata.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   └── main.py
├── requirements.txt
└── README.md
```

## Database Schema

### Transactions Table
- trno (INTEGER, Primary Key)
- date (TIMESTAMP)
- description (TEXT)
- amount (REAL)
- paymentmode (TEXT)
- accid (TEXT)
- department (TEXT)
- comments (TEXT)
- category (TEXT)
- reconciled (TEXT)

### Accounts Table
- slno (INTEGER, Primary Key)
- accountname (TEXT)
- type (TEXT)
- accid (TEXT)
- balance (REAL)
- intrate (REAL)
- nextduedate (TEXT)
- bank (TEXT)
- tenure (INTEGER)
- emiamt (REAL)
- comments (TEXT)

### Freedom Table
- trno (INTEGER, Primary Key)
- date (TIMESTAMP)
- description (TEXT)
- amount (REAL)
- paymentmode (TEXT)
- accid (TEXT)
- department (TEXT)
- comments (TEXT)
- category (TEXT)
- paid (TEXT)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: http://localhost:8000/docs
- ReDoc documentation: http://localhost:8000/redoc

## API Endpoints

### Transactions
- GET /transactions/ - List transactions with filtering options
- GET /transactions/{trno} - Get specific transaction
- POST /transactions/ - Create new transaction

### Accounts
- GET /accounts/ - List accounts with filtering options
- GET /accounts/{accid} - Get specific account
- GET /accounts/freedom/ - List freedom transactions

### Metadata
- GET /metadata/tables/{table_name} - Get table structure
- GET /metadata/database - Get database schema
- GET /metadata/health - Health check

## Development

The backend uses:
- FastAPI for the web framework
- SQLAlchemy for database operations
- Pydantic for data validation
- Uvicorn as the ASGI server

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
