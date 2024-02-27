# Import the dependencies.
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
mongo = MongoClient(connection_string)

#Importing the csv files 
#Done in Terminal using mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.9gjuly6.mongodb.net/" --type csv -d Housing -c data --headerline --drop housingdata.csv

#Assigning our db to a variable  

db = mongo['Housing']

#Assigning our collection to a variable

db_data = db["data"]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

#1. Main Page + Charts
    #Below I am taking a random index.html file to test
@app.route("/")
def main():
    return (render_template('index.html'))

#2.API Page
    # the below json formula came from stack overflow https://stackoverflow.com/questions/16586180/typeerror-objectid-is-not-json-serializable
    #I think we need to make sure our data is raw so that Json can read it properly
@app.route("/api/housing")
def api_data():
    query = {}
    results = db_data.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))
                
                
if __name__ == '__main__':
    app.run(debug=True)