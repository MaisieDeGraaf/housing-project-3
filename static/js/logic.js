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
    zoom: 9.5,
});

// Add OpenStreetMap as a base layer and define basemap layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let baseMaps = {
    "Street Map": streetmap
};

// Add icons for housing markers
let homeIcon = L.icon({
    iconUrl: '../static/home_2544087.png',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});
let greenIcon = L.icon({
    iconUrl: '../static/green.jpg',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});
let blueIcon = L.icon({
    iconUrl: '../static/blue.png',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});
let orangeIcon = L.icon({
    iconUrl: '../static/orange.png',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});
let yellowIcon = L.icon({
    iconUrl: '../static/yellow.jpg',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});
let redIcon = L.icon({
    iconUrl: '../static/red.png',
    iconSize: [15, 15], 
    iconAnchor: [7, 7], 
    popupAnchor: [0, -10] 
});

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
    console.log(data)
        layers.one = L.marker(data, {
            filter: function (feature, layer) {
                return (feature.properties.price <= 250000.0);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: greenIcon });
            },

            onEachFeature: function (feature, layer) {
                
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.bathrooms + ' baths' + ' / ' +
                    feature.properties.status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.two = L.marker(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.price >= 250000.0 &&
                    feature.properties.price <= 500000.0
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: blueIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.bathrooms + ' baths' + ' / ' +
                    feature.properties.status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.three = L.marker(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.price >= 500000.0 &&
                    feature.properties.price <= 750000.0
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: orangeIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.bathrooms + ' baths' + ' / ' +
                    feature.properties.status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.four = L.marker(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.price >= 750000.0 &&
                    feature.properties.price <= 1000000.0
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: yellowIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.bathrooms + ' baths' + ' / ' +
                    feature.properties.status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.five = L.marker(data, {
            filter: function (feature, layer) {
                return (feature.properties.price >= 1000000.0);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: redIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.bathrooms + ' baths' + ' / ' +
                    feature.properties.status + ' status' + ' / ' +
                    '</p>')
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

        d3.json(leisureUrl).then(leisureData => {

            let leisureLayer = L.layerGroup(); 
        
            leisureData.forEach(point => {
                let latlng = L.latLng(point.Latitude, point.Longitude);
                console.log(latlng);  // Are they NULL? (it was complaining but I can't find any NULL.)
        
                let leisureMarker = L.circleMarker(latlng, {
                    radius: 5, 
                    fillColor: "blue",
                    color: "blue",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
        
                leisureMarker.bindPopup(
                    '<h3>' + point.City + '</h3><hr>' +
                    '<p>Leisure Type: ' + point["Leisure Type"] + '</p>'
                );
        
                leisureLayer.addLayer(leisureMarker);
            })

        console.log("Finished processing!")
      // Add overlay maps      
            let overlayMaps = {
                "<img src='../static/green.jpg' width = 15 /> <span>Up to $250K</span>": layers.one,
                "<img src='../static/blue.png' width = 15 /> <span>$250K - $500K</span>": layers.two,
                "<img src='../static/orange.png' width = 15 /> <span>$500K - $750K</span>": layers.three,
                "<img src='../static/yellow.jpg' width = 15 /> <span>$750K - $1M</span>": layers.four,
                "<img src='../static/red.png' width = 15 /> <span>$1M+</span>": layers.five,
                "<img src='../static/city.png' width = 15 /> <span>City </span>": layers.six,
                "<img src='../static/leisure.png' width = 15 /> <span>Leisure Spots</span>": layers.seven
            };

            // Add controls 
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);

            L.control.scale(position = 'topleft').addTo(myMap);
},)})
