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
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@:5432/CTA"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

#
# session = Session(engine)

# Save references to each table
Stations_Metadata = Base.classes.ten_year

# print(Station_Metadata)


# This is the first route
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/metadata/<station>")
def station_metadata(station):
    """Return the MetaData for a given sample."""
    sel = [
        Stations_Metadata.Station_Name
    ]

    results = db.session.query(*sel).filter(Stations_Metadata.Station_Name == station).all()

    station_metadata = {}
    for result in results:
        station_metadata["Station"] = result[0]

    
    print(station_metadata)
    return jsonify(station_metadata)


@app.route("/stations")
def stations():
    sel = [Stations_Metadata.Station_Name]

    stations = [station[0] for station in db.session.query(*sel).all()]

    return jsonify(stations)

@app.route("/stations/<station>")
def ridership_by_station(station):

    stmt = db.session.query(Stations_Metadata).statement

    df = pd.read_sql_query(stmt, db.session.bind)

    ridership_data = df.loc[df['Station_Name'] == station]

    years = list(df.columns)[3:]

    ridership = ridership_data.values[0][3:]

    data = {
        'year': years,
        'ridership': ridership.tolist()
    }

    return jsonify(data)


if __name__ == "__main__":
    app.run()
