# Import the dependencies.
import datetime as dt
import numpy as np
import pandas as pd
from pymongo import MongoClient
from pprint import pprint
from bson import json_util
from flask import Flask, jsonify, render_template
import json


#################################################
# Database Setup
#################################################
#Creating an instance of MongoClient

mongo = MongoClient(port=27017)

#Importing the csv files 

#mongoimport --type json -d uk_food -c establishments --drop ../Resources/data.csv

#Assigning our db to a variable

    #I'm using a db from a previous work.
    

db = mongo['uk_food']

#Printing all the collections in our db
db.list_collection_names()

#Assigning our collection to a variable

establishments = db["establishments"]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

#1. Main Page + Charts
    #Below I am taking a random index.html file to test
    #Maybe I should ask Maise to list our routes in the html intro and we could add a 'onclick' event
@app.route("/")
def main():
    return (render_template('index.html'))

#2.API Page
    # the below json formula came from stack overflow https://stackoverflow.com/questions/16586180/typeerror-objectid-is-not-json-serializable
@app.route("/api/housing")
def api_data():
    query = {'scores.Hygiene':{'$eq':20}}
    results = establishments.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))
                
                
if __name__ == '__main__':
    app.run(debug=True)