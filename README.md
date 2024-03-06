# Ontario Housing Market Analysis

# Project Overview
1. For Project 3, we are analyzing listings in 5 Ontarian cities (Oshawa, Oakville, Burlington, Vaughan and Milton) and building a website with various filters across these 5 cities. 
2. We will be looking at the different building types (townhouses, condos & houses), prices and properties for each listing per city and per neighborhoods.
3. Using the data created, we will display the notable tendencies on maps and charts.

# Methodology
1. Data & Delivery
	a. We will scrape websites to obtain listings for each city and store them in a MongoDB database.
	b. We will then displaye pur data in our API endpoint using Flask and filtering the cities and specific detail we need (i.e. Price ranges, house status, city, etc.).
2. Back End & Visualization
	a. Using JS, we will create a map that will be displaying all our listings and nearby leisures spots using Leaflet.
	b. Still using Leaflet, we will make any user capable of filtering what they see on the map.
	c. Using Chartjs, we will display charts discribing our listings (prices, density, neighborhoods, etc.). The charts will be filtered by city using a click event button.

# Datasets used:

GEOAPIFY API (weather data + leisure spots) and House Sigma (listings).

# Members of the Group & Work breakdown structure
1. Peggy Tadi (@peggz19); Flask app –  Create app.py in vs code
2. Jaylene Hughes (@jhyooz); API scraper & convert data from sqllit to mongodb
3. Maisie DeGraaf (@MaisieDeGraaf); Html & CSS code - Create the html header, Body, Div.
4. Pooja Niranjan (@Pooja14n); Visualization – Leaflet maps & bind popups for each house for each city
5. Robert Skrepnek (@RSkrep); Dropdown menu for each city, neighborhood, home type (condo, townhome, semi-detached, detached), price*(filter)

# Technologies used
1. MongoDB
2. Python
3. Flask
5. Javascript - Leaflet, Chartjs
6. HTML/CSS

# References
Referred to various class activity exercises, got support from Assistant Instructor, and websites.

# Link to Presentation: 

https://www.canva.com/design/DAF98YLI6t8/WEgsgGw7uR6DxIoG4mJ-lg/edit

