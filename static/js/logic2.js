//Defining our cities coordinates
let cities = [{
    location: [43.46, -79.66],
    name: "Oakville"
  },
  {
    location: [43.89, -78.86],
    name: "Oshawa"
  },
  {
    location: [43.52, -79.89],
    name: "Milton",
  },
  {
    location: [43.80, -79.55],
    name: "Vaughan"
  },
  {
    location: [43.32, -79.81],
    name: "Burlington"
  }
  ];
  
// API endpoints
let queryUrl = "http://127.0.0.1:5000/api/v1.0/housing"
let leisureUrl = "http://127.0.0.1:5000/api/v1.0/leisure";

// function to add commas to List Price popup
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Create map
let myMap = L.map("map-id", {
    center: [43.62, -79.59],
    zoom: 9.2,
});

// Add OpenStreetMap as a base layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//BASE MAP
let baseMaps = {
    "Street Map": streetmap
};

// Add icons for housing markers src: https://leafletjs.com/examples/custom-icons/
let LeafIcon = L.Icon.extend({
    options: {
        iconSize: [15, 15], 
        iconAnchor: [7, 7], 
        popupAnchor: [0, -10] 
}});

var homeIcon = new LeafIcon({iconUrl: '../static/home.png'}),
    greenIcon = new LeafIcon({iconUrl: '../static/green.jpg'}),
    blueIcon = new LeafIcon({iconUrl: '../static/blue.png'}),
    orangeIcon = new LeafIcon({iconUrl:'../static/orange.png'}),
    yellowIcon = new LeafIcon({iconUrl: '../static/yellow.jpg'}),
    redIcon = new LeafIcon({iconUrl: '../static/red.png'});
    cityIcon = new LeafIcon({iconUrl: '../static/city.png'});
    leisureIcon = new LeafIcon({iconUrl: '../static/leisure.png'});

L.icon = function (options) {
    return new L.Icon(options);
};   

//L.marker([43.63, -79.60], {icon: redIcon}).addTo(myMap); to test if the icons work and they do.

// Add layer groups for housing markers
let layers = {
    one: new L.LayerGroup(),
    two: new L.LayerGroup(),
    three: new L.LayerGroup(),
    four: new L.LayerGroup(),
    five: new L.LayerGroup(),
    six: new L.LayerGroup(),
    seven: new L.LayerGroup(),
};

// Get housing data and process it
d3.json(queryUrl).then(data => {
        data.forEach(function (city) {
                if (city.price <250000){
                    let myMarker = L.marker([city.longitude,city.latitude], {icon:greenIcon});
                    myMarker.bindPopup(`Address :${city.address} <br> Price:${numberWithCommas(city.price)} <br> Bathrooms : ${city.bathrooms} <br> Bedrooms : ${city.bedrooms}`);
                    layers.one.addLayer(myMarker);
                }
                else if (city.price >= 250000 && city.price <500000){
                    let myMarker = L.marker([city.longitude,city.latitude], {icon:blueIcon});
                    myMarker.bindPopup(`Address :${city.address} <br> Price:${numberWithCommas(city.price)} <br> Bathrooms : ${city.bathrooms} <br> Bedrooms : ${city.bedrooms}`);
                    layers.two.addLayer(myMarker);
                }
                else if (city.price >= 500000 && city.price <750000){
                    let myMarker = L.marker([city.longitude,city.latitude], {icon:orangeIcon});
                    myMarker.bindPopup(`Address :${city.address} <br> Price:${numberWithCommas(city.price)} <br> Bathrooms : ${city.bathrooms} <br> Bedrooms : ${city.bedrooms}`);
                    layers.three.addLayer(myMarker);
                }
                else if (city.price >= 750000 && city.price <1000000){
                    let myMarker = L.marker([city.longitude,city.latitude], {icon:yellowIcon});
                    myMarker.bindPopup(`Address :${city.address} <br> Price:${numberWithCommas(city.price)} <br> Bathrooms : ${city.bathrooms} <br> Bedrooms : ${city.bedrooms}`);
                    layers.four.addLayer(myMarker);
                }
                else if (city.price >= 1000000){
                    let myMarker = L.marker([city.longitude,city.latitude], {icon:redIcon});
                    myMarker.bindPopup(`Address :${city.address} <br> Price:${numberWithCommas(city.price)} <br> Bathrooms : ${city.bathrooms} <br> Bedrooms : ${city.bedrooms}`);
                    layers.five.addLayer(myMarker);
                }
        })
       
        d3.json(queryUrl).then(citydata => {
                let circleStyle = {};
                circleStyle.Oakville = {
                    color: "green",
                    fillColor: "lightgreen",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.Burlington = {
                    color: "blue",
                    fillColor: "lightblue",
                    fillOpacity: 0.3,
                    radius: 250,
                    weight: 0
                };
                circleStyle.Vaughan = {
                    color: "yellow",
                    fillColor: "yellow",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.Milton = {
                    color: "pink",
                    fillColor: "pink",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.Oshawa = {
                    color: "red",
                    fillColor: "red",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };

                layers.six = L.marker(citydata, {

                    // call "features" of marker file
                    filter: function (feature, layer) {
                        return citydata.features;
                    },

                    pointToLayer: function (feature, latlng) {
                        let city = feature.properties.city;
                        return L.circle(latlng, circleStyle[city]); 
                    },
                })
            })

        // CREATING THE CITY LAYER BASED on the dict at line 2
        cities.forEach(function (city) {
            let myMarker = L.marker(city.location, {
                title: city.name,
                icon : cityIcon}).bindPopup(city.name)
            layers.six.addLayer(myMarker)})

        
        // LEISURE ICON - to change opacity and add a border
        let leisureIcon = L.icon({
            iconUrl: '../static/leisure.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
            opacity: 0.3, // 0.0 is fully transparent and 1.0 is fully opaque
            className: 'leisure-marker' // Add a custom class for styling
        });

        // CREATE LEISURE LAYER
        let leisureLayer = L.layerGroup();

        d3.json(leisureUrl).then(leisureData => {
            leisureData.forEach(point => {
                let latlng = L.latLng(point.Latitude, point.Longitude);

                // Use the custom leisureIcon
                let leisureMarker = L.marker(latlng, { icon: leisureIcon });

                leisureMarker.bindPopup(
                    '<h3>' + point.City + '</h3><hr>' +
                    '<p>Leisure Type: ' + point["Leisure Type"] + '</p>'
                );

                leisureLayer.addLayer(leisureMarker);
            });

            leisureLayer.addTo(mymap);
        });


        console.log("Finished processing!")
      // Add overlay maps      
            let overlayMaps = {
                "<img src='../static/green.jpg' width = 15 /> <span>Up to $250K</span>": layers.one,
                "<img src='../static/blue.png' width = 15 /> <span>$250K - $500K</span>": layers.two,
                "<img src='../static/orange.png' width = 15 /> <span>$500K - $750K</span>": layers.three,
                "<img src='../static/yellow.jpg' width = 15 /> <span>$750K - $1M</span>": layers.four,
                "<img src='../static/red.png' width = 15 /> <span>$1M+</span>": layers.five,
                "<img src='../static/city.png' width = 15 /> <span>City </span>": layers.six,
                "<img src='../static/leisure.png' width = 15 /> <span>Leisure Spots</span>": leisureLayer
            };

            // Add controls 
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);

            L.control.scale(position = 'topleft').addTo(myMap)})
