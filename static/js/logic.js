// function createMap(housing) {

//   // Create the tile layer that will be the background of our map.
//   let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });


//   // Create a baseMaps object to hold the streetmap layer.
//   let baseMaps = {
//     "Street Map": streetmap
//   };

//   // Create an overlayMaps object to hold the bikeStations layer.
//   let overlayMaps = {
//     "Properties": housing
//   };

//   // Create the map object with options.
//   let map = L.map("map-id", {
//     center: [40.73, -74.0059],
//     zoom: 12,
//     layers: [streetmap, housing]
//   });

//   // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }

// // function createMarkers(response) {

// //   // Pull the "stations" property from response.data.
// //   let stations = response.data.stations;

// //   // Initialize an array to hold bike markers.
// //   let bikeMarkers = [];

// //   // Loop through the stations array.
// //   for (let index = 0; index < stations.length; index++) {
// //     let station = stations[index];

// //     // For each station, create a marker, and bind a popup with the station's name.
// //     let bikeMarker = L.marker([station.lat, station.lon])
// //       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

// //     // Add the marker to the bikeMarkers array.
// //     bikeMarkers.push(bikeMarker);
// //   }

// //   // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
// //   createMap(L.layerGroup(bikeMarkers));
// // }


// // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("housingdata.geojson");



// Store our API endpoint as queryUrl.
let query = "housingdata.geojson";

// let myMap = L.map("map", {
//   center: [43.62, -79.59],
//   zoom: 9
// });


d3.json(query).then(function (data) {
    // console.log(data)

    createFeatures(data.features)

});

function createFeatures(housingdata) {

    function onOurFeature(feature, layer)  {       
        layer.bindPopup(`<h3>Location: ${feature.properties.Address}</h3><hr><p>Listed Price: ${feature.properties.Price_Listed}</p>`);
    }
  
    function createMarkers(response) {

        // Pull the "stations" property from response.data.
        let house = response.data.features;
      
        // Initialize an array to hold bike markers.
        let houseMarkers = [];
      
        // Loop through the stations array.
        for (let index = 0; index < house.length; index++) {
          let house = house[index];
      
          // For each station, create a marker, and bind a popup with the station's name.
          let houseMarker = L.marker([properties.Latitude, properties.Longitude])
            .bindPopup("<h3>" + house.Address + "<h3><h3>Capacity: " + house.Neighbourhood + "</h3>");
      
          // Add the marker to the bikeMarkers array.
          houseMarkers.push(houseMarker);
        }
      
        // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
        createMap(L.layerGroup(houseMarkers));
      }


    // function createMarker(feature, latlng){
    //     let markers = {
    //     //  radius:feature.properties.Price_Listed*2,
    //      fillColor: chooseColor(feature.geometry.coordinates),
    //      color: "black",
    //      weight: 0.5,
    //      opacity: 0.8,
    //      fillOpacity: 0.7
    //     } 
    //     return L.circleMarker(latlng, markers);
    //  }
     
     let houses = L.geoJSON(housingdata, {
         onEachFeature: onOurFeature
         //pointToLayer: createMarkers
     });
 
     
     createMap(houses);
 }
 
 function chooseColor(listedprice){
    if (listedprice < 100000) return "lime";
    else if (listedprice < 300000) return "#D4E157";
    else if (listedprice < 500000) return "#FFCA28";
    else if (listedprice < 700000) return "#FF9800";
    else if (listedprice < 900000) return "#FF7043";
    else return "red";
}


let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let grades = [300000, 500000, 700000, 800000, 900000, 1000000];
    let labels = [];
    let legendInfo = "<h4></h4>";
    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };
           

  function createMap(houses) {
    //BASE MAPS
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  let overlayMaps = {
    "Houses" : houses
  }

  let myMap = L.map("map", {
    center: [43.62, -79.59],
    zoom: 9,
    layers: [street, houses]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend.addTo(myMap);
    
  }

