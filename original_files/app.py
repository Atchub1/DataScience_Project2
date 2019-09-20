from numpy import genfromtxt
from time import time
from datetime import datetime
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import session
import csv
import pandas as pd

Base = declarative_base()

class system (Base):
    __tablename__ = 'system'
    STOP_ID = Column(Integer, primary_key=True, nullable=False)
    DIRECTION_ID = Column(String)
    STOP_NAME = Column(String)
    STATION_NAME = Column(String)
    STATION_DESCRIPTIVE_NAME = Column(String)
    Station_ID = Column(Integer)
    ADA = Column(Integer)
    RED = Column(Integer)
    BLUE = Column(Integer)
    G = Column(Integer)
    BRN = Column(Integer)
    P = Column(Integer)
    PEXP = Column(Integer)
    Y = Column(Integer)
    PINK = Column(Integer)
    O = Column(Integer)
    Location = Column(String)

    engine = create_engine('sqlite:///system.db')
    Base.metadata.create_all(engine)
    file_name = 'CTA_-_System_Information_-_List_of__L__Stops.csv'
    df = pd.read_csv(file_name)
    df.to_sql('system', con=engine, index_label='id', if_exists='replace')

engine = create_engine("sqlite:///system.db")
conn = engine.connect()
Base.metadata.create_all(engine)

from sqlalchemy.orm import Session
session = Session(bind=engine)

engine.execute("SELECT * FROM system").limit(5).all()





