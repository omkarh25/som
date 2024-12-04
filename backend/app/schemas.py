from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class TransactionBase(BaseModel):
    date: datetime
    description: str
    amount: float
    paymentmode: str
    accid: str
    department: str
    comments: Optional[str] = None
    category: str
    reconciled: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    trno: int

    class Config:
        from_attributes = True

class AccountBase(BaseModel):
    accountname: str
    type: str
    accid: str
    balance: float
    intrate: float
    nextduedate: str
    bank: str
    tenure: int
    emiamt: float
    comments: Optional[str] = None

class AccountCreate(AccountBase):
    pass

class Account(AccountBase):
    slno: int

    class Config:
        from_attributes = True

class FreedomBase(BaseModel):
    date: datetime
    description: str
    amount: float
    paymentmode: str
    accid: str
    department: str
    comments: Optional[str] = None
    category: str
    paid: str

class FreedomCreate(FreedomBase):
    pass

class Freedom(FreedomBase):
    trno: int

    class Config:
        from_attributes = True

class TableColumn(BaseModel):
    name: str
    type: str
    primary_key: bool
    nullable: bool

class TableInfo(BaseModel):
    name: str
    columns: List[TableColumn]

    class Config:
        from_attributes = True

class DatabaseInfo(BaseModel):
    tables: List[TableInfo]

    class Config:
        from_attributes = True

class ErrorResponse(BaseModel):
    detail: str
