from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from sqlalchemy.orm import load_only
from typing import List, Optional
from . import models, schemas
from datetime import datetime

async def get_transactions(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    department: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
) -> List[models.Transaction]:
    """Get transactions with optional filtering"""
    query = select(models.Transaction)
    
    if department:
        query = query.where(models.Transaction.department == department)
    if start_date:
        query = query.where(models.Transaction.date >= start_date)
    if end_date:
        query = query.where(models.Transaction.date <= end_date)
    
    query = query.order_by(desc(models.Transaction.date)).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def get_transaction(db: AsyncSession, trno: int) -> Optional[models.Transaction]:
    """Get a specific transaction by ID"""
    result = await db.execute(select(models.Transaction).where(models.Transaction.trno == trno))
    return result.scalar_one_or_none()

async def create_transaction(db: AsyncSession, transaction: schemas.TransactionCreate) -> models.Transaction:
    """Create a new transaction"""
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    await db.commit()
    await db.refresh(db_transaction)
    return db_transaction

async def get_accounts(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    type: Optional[str] = None
) -> List[models.Account]:
    """Get accounts with optional filtering"""
    query = select(models.Account)
    
    if type:
        query = query.where(models.Account.type == type)
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def get_account(db: AsyncSession, accid: str) -> Optional[models.Account]:
    """Get a specific account by ID"""
    result = await db.execute(select(models.Account).where(models.Account.accid == accid))
    return result.scalar_one_or_none()

async def get_freedom_transactions(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    paid: Optional[str] = None
) -> List[models.Freedom]:
    """Get freedom (future) transactions with optional filtering"""
    query = select(models.Freedom)
    
    if paid is not None:
        query = query.where(models.Freedom.paid == paid)
    
    query = query.order_by(models.Freedom.date).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def get_table_info(db: AsyncSession, table_name: str) -> Optional[schemas.TableInfo]:
    """Get table information including column names and types"""
    if table_name == "transactions":
        model = models.Transaction
    elif table_name == "accounts":
        model = models.Account
    elif table_name == "freedom":
        model = models.Freedom
    else:
        return None

    columns = []
    for column in model.__table__.columns:
        column_info = schemas.TableColumn(
            name=column.name,
            type=str(column.type),
            primary_key=column.primary_key,
            nullable=column.nullable
        )
        columns.append(column_info)

    return schemas.TableInfo(
        name=table_name,
        columns=columns
    )

async def get_database_info(db: AsyncSession) -> schemas.DatabaseInfo:
    """Get information about all tables in the database"""
    tables = []
    for table_name in ["transactions", "accounts", "freedom"]:
        table_info = await get_table_info(db, table_name)
        if table_info:
            tables.append(table_info)
    
    return schemas.DatabaseInfo(tables=tables)
