
// API endpoint"
let queryUrl = "static/data/housingdata.geojson";

// let queryUrl = "http://127.0.0.1:5000/api/housing"


// function to add commas to List Price popup
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

d3.json(queryUrl).then(data => {

    createMap();

    function createMap() {

        let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        let baseMaps = {
            "Street Map": streetmap
            // "Light Map": lightmap
        };

        
        var homeIcon = L.icon({
            iconUrl: '../images/home.PNG',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        var greenIcon = L.icon({
            iconUrl: '..images/green.jpg',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        var blueIcon = L.icon({
            iconUrl: '../images/blue.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        var orangeIcon = L.icon({
            iconUrl: '../images/orange.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        var yellowIcon = L.icon({
            iconUrl: '../images/yellow.jpg',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        var redIcon = L.icon({
            iconUrl: '../images/red.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });


        const layers = {
            active: [],
            one: new L.LayerGroup(),
            two: new L.LayerGroup(),
            three: new L.LayerGroup(),
            four: new L.LayerGroup(),
            five: new L.LayerGroup(),
            six: new L.LayerGroup()
        };


        layers.one = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.Price_Listed <= 250000);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: greenIcon });
            },

            onEachFeature: function (feature, layer) {
                
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.Address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.Price_Listed) + ' / ' +
                    feature.properties.Bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.Bathrooms + ' baths' + ' / ' +
                    feature.properties.Status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.two = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.Price_Listed >= 250000 &&
                    feature.properties.Price_Listed <= 500000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: blueIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.Address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.Price_Listed) + ' / ' +
                    feature.properties.Bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.Bathrooms + ' baths' + ' / ' +
                    feature.properties.Status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.three = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.Price_Listed >= 500000 &&
                    feature.properties.Price_Listed <= 750000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: orangeIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.Address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.Price_Listed) + ' / ' +
                    feature.properties.Bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.Bathrooms + ' baths' + ' / ' +
                    feature.properties.Status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.four = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.Price_Listed >= 750000 &&
                    feature.properties.Price_Listed <= 1000000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: yellowIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.Address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.Price_Listed) + ' / ' +
                    feature.properties.Bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.Bathrooms + ' baths' + ' / ' +
                    feature.properties.Status + ' status' + ' / ' +
                    '</p>')
            }
        })

        layers.five = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.Price_Listed >= 1000000);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: redIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.Address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.Price_Listed) + ' / ' +
                    feature.properties.Bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.Bathrooms + ' baths' + ' / ' +
                    feature.properties.Status + ' status' + ' / ' +
                    '</p>')
            }
        })
       
 
        d3.json(queryUrl).then(citydata => {
            
            cityMap();
            maplegend();

            function cityMap() {

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


                // School Quality layer - mimics a heatmap based on school rating
                layers.six = L.geoJson(citydata, {

                    // call "features" of geojson file
                    filter: function (feature, layer) {
                        return citydata.features;
                    },

                    pointToLayer: function (feature, latlng) {
                        let city = feature.properties.City;
                        return L.circle(latlng, circleStyle[city]); 
                    },

                })
            }
        });


        function maplegend() {
            
            let overlayMaps = {
                "<img src='../images/green.jpg' width = 15 /> <span>Up to $250K</span>": layers.one,
                "<img src='../images/blue.png' width = 15 /> <span>$250K - $500K</span>": layers.two,
                "<img src='../images/orange.png' width = 15 /> <span>$500K - $750K</span>": layers.three,
                "<img src='../images/yellow.jpg' width = 15 /> <span>$750K - $1M</span>": layers.four,
                "<img src='../images/red.png' width = 15 /> <span>$1M+</span>": layers.five,
                "City": layers.six
            };

            let myMap = L.map("map", {
                center: [
                    43.62, -79.59
                ],
                zoom: 9.5,
                layers: [
                    streetmap
                    // layers.one,
                    // layers.two,
                    // layers.three,
                    // layers.four,
                    // layers.five
                ]
            });

            
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);

            L.control.scale(position = 'topleft').addTo(myMap);

            
        } 
    };
});
