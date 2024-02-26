# Import the dependencies.
import datetime as dt
import numpy as np
import pandas as pd
from pymongo import MongoClient
from pprint import pprint
from bson import json_util
from flask import Flask, jsonify, render_template
import json
from api_keys import mongo_username,mongo_password


#################################################
# Database Setup
#################################################
#Creating an instance of MongoClient

connection_string = f'mongodb+srv://{mongo_username}:{mongo_password}@cluster0.9gjuly6.mongodb.net/'
mongo = MongoClient(port=27017) ##here I have to use, the connection_string instead of the port

#Importing the csv files 
#Looks like this doesn't work and might have to be done with Jupyter Notebook ?
#! mongoimport --type csv -d Household_size -c size --headerline --drop Resources/2016_Household_Size.csv

#Assigning our db to a variable

    #I'm using a db from a previous work.
    

db = mongo['Household_size']

#Assigning our collection to a variable

size = db["size"]

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
    query = {}
    results = size.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))
                
                
if __name__ == '__main__':
    app.run(debug=True)