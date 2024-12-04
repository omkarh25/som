from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import crud, schemas, database
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/metadata",
    tags=["metadata"]
)

@router.get("/tables/{table_name}", response_model=schemas.TableInfo)
async def get_table_info(
    table_name: str,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get information about a specific table's structure
    """
    table_info = await crud.get_table_info(db, table_name)
    if table_info is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return table_info

@router.get("/database", response_model=schemas.DatabaseInfo)
async def get_database_info(
    db: AsyncSession = Depends(database.get_db)
):
    """
    Get information about all tables in the database
    """
    try:
        database_info = await crud.get_database_info(db)
        return database_info
    except Exception as e:
        print(f"Error in get_database_info: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
