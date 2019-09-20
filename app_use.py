import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cta.db"
# db = SQLAlchemy(app)
# engine = create_engine('sqlite:///cta.db')

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# # Base.prepare(db.engine, reflect=True)
# Base.prepare(engine, reflect=True)

# # Save references to each table
# # daily_ridership = Base.classes.daily_ridership

Base = declarative_base()
engine = create_engine('sqlite:///cta.db')
Base.metadata.create_all(engine)

conn = engine.connect()
Base.metadata.create_all(engine)

session = Session(bind=engine)



@app.route("/")
def index():
    """Return the homepage."""
    print(engine.execute("SELECT * FROM daily_ridership").fetchall())
    return render_template("index.html")
    


@app.route("/stations")
def names():
    """Return a list of station names."""
    print(session.query(stationname FROM daily_ridership"))


    # Use Pandas to perform the sql query
    # stations = db.session.query(daily_ridership).stationname
    # df = pd.read_sql_query(stations, db.session.bind)


    # Return a list of the column names (sample names)
    # return jsonify(list(df.columns)[2:])


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
