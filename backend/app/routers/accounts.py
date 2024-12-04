from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from .. import crud, schemas, database
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/accounts",
    tags=["accounts"]
)

@router.get("/", response_model=List[schemas.Account])
async def read_accounts(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    type: Optional[str] = None,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get list of accounts with optional filtering by type
    """
    try:
        accounts = await crud.get_accounts(
            db,
            skip=skip,
            limit=limit,
            type=type
        )
        
        # Convert SQLAlchemy models to dictionaries
        accounts_data = []
        for account in accounts:
            accounts_data.append({
                "slno": account.slno,
                "accountname": account.accountname,
                "type": account.type,
                "accid": account.accid,
                "balance": float(account.balance),
                "intrate": float(account.intrate),
                "nextduedate": account.nextduedate,
                "bank": account.bank,
                "tenure": account.tenure,
                "emiamt": float(account.emiamt),
                "comments": account.comments
            })
        
        return JSONResponse(content=accounts_data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch accounts: {str(e)}"
        )

@router.get("/{accid}", response_model=schemas.Account)
async def read_account(
    accid: str,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get a specific account by ID
    """
    account = await crud.get_account(db, accid)
    if account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

@router.get("/freedom/", response_model=List[schemas.Freedom])
async def read_freedom_transactions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    paid: Optional[str] = None,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get list of freedom (future) transactions with optional filtering
    """
    try:
        transactions = await crud.get_freedom_transactions(
            db,
            skip=skip,
            limit=limit,
            paid=paid
        )
        
        # Convert SQLAlchemy models to dictionaries
        freedom_data = []
        for transaction in transactions:
            freedom_data.append({
                "trno": transaction.trno,
                "date": transaction.date.isoformat(),
                "description": transaction.description,
                "amount": float(transaction.amount),
                "paymentmode": transaction.paymentmode,
                "accid": transaction.accid,
                "department": transaction.department,
                "comments": transaction.comments,
                "category": transaction.category,
                "paid": transaction.paid
            })
        
        return JSONResponse(content=freedom_data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch freedom transactions: {str(e)}"
        )
