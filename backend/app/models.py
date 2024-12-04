from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from .database import Base

class Transaction(Base):
    """Model for transactions table"""
    __tablename__ = "transactions"

    trno = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, index=True)
    description = Column(Text)
    amount = Column(Float)
    paymentmode = Column(String)
    accid = Column(String)
    department = Column(String, index=True)
    comments = Column(Text)
    category = Column(String)
    reconciled = Column(String)

class Account(Base):
    """Model for accounts table"""
    __tablename__ = "accounts"

    slno = Column(Integer, primary_key=True)
    accountname = Column(String)
    type = Column(String)
    accid = Column(String, index=True)
    balance = Column(Float)
    intrate = Column(Float)
    nextduedate = Column(String)
    bank = Column(String)
    tenure = Column(Integer)
    emiamt = Column(Float)
    comments = Column(Text)

class Freedom(Base):
    """Model for freedom table (future transactions)"""
    __tablename__ = "freedom"

    trno = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, index=True)
    description = Column(Text)
    amount = Column(Float)
    paymentmode = Column(String)
    accid = Column(String)
    department = Column(String)
    comments = Column(Text)
    category = Column(String)
    paid = Column(String)
