
// API endpoint"
// let queryUrl = "static/data/housingdata.marker";

let queryUrl = "/api/v1.0/housing"
// var image1 = document.getElementById('image-source').getAttribute('src');
// var image1 = new Image()
// image1.src="../images/blue.png"
// var image1 = document.createElement("img");
// image1.src = '../images/green.jpg';

// function to add commas to List Price popup
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

d3.json(queryUrl).then(data => {
    console.log(data)

        let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        let baseMaps = {
            "Street Map": streetmap
           
        };

        
        // let homeIcon = L.icon({
        //     iconUrl: image1,

        //     iconSize: [15, 15], 
        //     iconAnchor: [7, 7], 
        //     popupAnchor: [0, -10] 
        // });

        let greenIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        let blueIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        let orangeIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',

            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        let yellowIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
            iconSize: [15, 15], 
            iconAnchor: [7, 7], 
            popupAnchor: [0, -10] 
        });

        let redIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',

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
        
        });
        console.log("Finished processing!")
            
            let overlayMaps = {
                '<i class="bi bi-house"> under 250K </i>' : layers.one,
                '<i class="bi bi-house"> $250K - $500K </i>' : layers.two,
                '<i class="bi bi-house"> $500K - $750K </i>': layers.three,
                '<i class="bi bi-house"> $750K - $1M </i>': layers.four,
                '<i class="bi bi-house"> $1M </i>': layers.five,
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

    
});
