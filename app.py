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

#Assigning our db to a variable  

db = mongo['properties']

#Assigning our collections to a variable

all_houses = db["all_houses"]
leisure_spaces=db['leisure_spaces']
sold_houses = db['sold_houses']
weather_data = db['weather_data']
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

@app.route("/map")
def map():
    return (render_template('map.html'))

#2.API Page
    # the below json_util formula came from stack overflow https://stackoverflow.com/questions/16586180/typeerror-objectid-is-not-json-serializable
    
@app.route("/api/v1.0/housing")
def api_data():
    query = {"city":{"$in":['Oshawa','Oakville','Vaughan','Milton','Burlington']}}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))
                
@app.route("/api/v1.0/oakville")
def api_oakville():
    query = {"city":'Oakville'}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/oshawa")
def api_oshawa():
    query = {"city":'Oshawa'}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/milton")
def api_milton():
    query = {"city":'Milton'}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/burlington")
def api_burlington():
    query = {"city":'Burlington'}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/vaughan")
def api_vaughan():
    query = {"city":'Vaughan'}
    results = all_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/leisure")
def api_leisure():
    query = {}
    results = leisure_spaces.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/sold-houses")
def api_sold_houses():
    query = {}
    results = sold_houses.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

@app.route("/api/v1.0/weather")
def weather():
    query = {}
    results = weather_data.find(query)
    output = []
    for x in results:
        output.append(x) 
    return json.loads(json_util.dumps(output))

if __name__ == '__main__':
    app.run(debug=True)