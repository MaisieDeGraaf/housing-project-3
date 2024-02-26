# Import the dependencies.
import datetime as dt
import numpy as np
import pandas as pd
from pymongo import MongoClient
from pprint import pprint

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
#Creating an instance of MongoClient

mongo = MongoClient(port=27017)

#Assigning our db to a variable
    #I'm using a db from a previous work. Should we first use jupyter notebook to turn the data in our df into a json type ?

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

#1. Main Page
    #Below I am taking a random index.html file to test
    #Maybe I should ask Maise to list our routes in the html intro and we could add a 'onclick' event
@app.route("/")
def main():
    return (render_template('index.html'))

#2.API Page
@app.route("/api/housing")
def api_data():
    query = {'scores.Hygiene':{'$eq':20}}
    output = []
    for x in establishments.find(query):
        output.append(x)
    return (output)
#3. Charts Page
@app.route("/charts")

def charts():
    return print('This is just a test')
                
                
if __name__ == '__main__':
    app.run(debug=True)