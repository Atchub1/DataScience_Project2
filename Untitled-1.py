import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
from sqlalchemy.ext.declarative import declarative_base
#################################################
# Database Setup
#################################################
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/ridership_data.sqlite"
# db = SQLAlchemy(app)
# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)
# print(Base.metadata.tables.keys())
# Save references to each table
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@:5432/CTA"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# session = Session(engine)
# Save references to each table
Stations_Metadata = Base.classes.ten_year
# print(Station_Metadata)
# This is the first route
@app.route("/")
def index():
   return render_template("index.html")
# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")
@app.route("/years/<year>")
def ridership_by_year(year):
    sel = [
        Stations_Metadata.Station_Name,
        getattr(Stations_Metadata, +year),
    ]
    results = db.session.query(*sel).all()
    # Format the data to send as json
    data = {
        "station": [result[0] for result in results],
        "ridership": [result[1] for result in results]
    }
    return jsonify(data)


# @app.route("/stations/<station>")
# def ridership_by_station(station):
#     stmt = db.session.query(Stations_Metadata).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#     ridership_data = df.loc[df['Station_Name'] == station, :]
#     years = [year for years in ridership_data.columns.values[3:]]
#     ridership = ridership_data.values[0][3:]
#     data = {
#         'year': years,
#         'ridership': ridership.tolist()
#     }
#     return jsonify(data)
# @app.route("/years")
# def years():
#    stmt = db.session.query(Stations_Metadata).statement
#    df = pd.read_sql_query(stmt, db.session.bind)
#    ridership_data = df.loc[:,:]
#    years = [year for years in ridership_data.columns.values[3:]]
#    return jsonify(years)
# @app.route("/stations")
# def stations():
#     sel = [Stations_Metadata.Station_Name]
#     stations = [station[0] for station in db.session.query(*sel).all()]
#     print(stations)
#     return jsonify(stations)
if __name__ == "__main__":
   app.run()