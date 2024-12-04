from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime
from .. import crud, schemas, database
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)

@router.get("/", response_model=List[schemas.Transaction])
async def read_transactions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    department: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get list of transactions with optional filtering
    """
    try:
        transactions = await crud.get_transactions(
            db,
            skip=skip,
            limit=limit,
            department=department,
            start_date=start_date,
            end_date=end_date
        )
        
        # Convert SQLAlchemy models to dictionaries
        transactions_data = []
        for transaction in transactions:
            transactions_data.append({
                "trno": transaction.trno,
                "date": transaction.date.isoformat(),
                "description": transaction.description,
                "amount": float(transaction.amount),
                "paymentmode": transaction.paymentmode,
                "accid": transaction.accid,
                "department": transaction.department,
                "comments": transaction.comments,
                "category": transaction.category,
                "reconciled": transaction.reconciled
            })
        
        return JSONResponse(content=transactions_data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch transactions: {str(e)}"
        )

@router.get("/{trno}", response_model=schemas.Transaction)
async def read_transaction(
    trno: int,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get a specific transaction by ID
    """
    transaction = await crud.get_transaction(db, trno)
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.post("/", response_model=schemas.Transaction)
async def create_transaction(
    transaction: schemas.TransactionCreate,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Create a new transaction
    """
    return await crud.create_transaction(db, transaction)
