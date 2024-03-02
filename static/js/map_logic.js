
let queryUrl = "/api/v1.0/housing"

// Define arrays to hold the created city and state markers.
let layers = {
    one: new L.LayerGroup(),
    two: new L.LayerGroup(),
    three: new L.LayerGroup(),
    four: new L.LayerGroup(),
    five: new L.LayerGroup(),
    six: new L.LayerGroup(),
    seven: new L.LayerGroup(),
};

let layerOneMarkers = [];
let layerTwoMarkers = [];
let layerThreeMarkers = [];


let group1;
let group2;
let group3;

//d3.json(queryUrl).then(data => {

    //createMarkers(data);

    function createMap() {
        console.log('map function');
          // Create the tile layer that will be the background of our map.
          let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          });
        
        
          // Create a baseMaps object to hold the streetmap layer.
          let baseMaps = {
            "Street Map": streetmap
          };
        
          // Create an overlayMaps object to hold the bikeStations layer.
          let overlayMaps = {
            "Layer1": group1,
            "Layer2": group2,
            "Layer3": group3
          };
          console.log('before create map');
          // Create the map object with options.
          let map = L.map("map", {
            center: [43.62, -79.59],
            zoom: 9.5,
            layers: [streetmap, group1, group2, group3]
          });
        
          console.log('before layer');
          // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
          L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
          }).addTo(map);
    }

    

    function createMarkers(response) {
        console.log('marker fn');
        // Pull the "stations" property from response.data.
        let stations = response;
        console.log(stations);
        // Initialize an array to hold bike markers.
        

        for (let index = 0; index < stations.length ; index++) {
        
          let station = stations[index];
      
          if ( station.price < 250000 ) {
            layerOneMarkers.push(L.marker([station.longitude, station.latitude]));
          } else if ( station.price >= 250000 && station.price < 500000) {
            layerTwoMarkers.push(L.marker([station.longitude, station.latitude]));
          } else if ( station.price > 500000) {
            layerThreeMarkers.push(L.marker([station.longitude, station.latitude]));
          }

          if ( station.city == "Oakville"){}
        }
      
        group1 = L.layerGroup(layerOneMarkers);
        group2 = L.layerGroup(layerTwoMarkers);
        group3 = L.layerGroup(layerThreeMarkers);
        //layers.one.addLayer(layerOneMarkers);
        //layers.two.addLayer(layerTwoMarkers);
        // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
        createMap();
      }
//});

d3.json(queryUrl).then(createMarkers);