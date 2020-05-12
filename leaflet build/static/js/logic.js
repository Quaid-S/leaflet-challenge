// loading tile layer
let graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// creating map 
let map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
  });

  graymap.addTo(map);

// loading json data object
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

//creating functions for marker size, markercolor markerstyle, and the popup.

    function markerSize(magnitude) {
        if (magnitude === 0) {
            return 1;
          }
          return magnitude * 5;
    }

    function markerColor(magnitude) {
        switch (true) {
        case magnitude > 5:
            return "#ea2c2c";
        case magnitude > 4:
            return "#ea822c";
        case magnitude > 3:
            return "#ee9c00";
        case magnitude > 2:
            return "#eecc00";
        case magnitude > 1:
            return "#d4ee00";
        default:
            return "#98ee00";
        }
    }



    function markerStyle(feature, latlng) {
        return {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.properties.mag),
        color: markerColor(feature.properties.mag),
        fillOpacity: 1
        };
    }
    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.title);
        }
    
// refrencing geojson structure to properly use the data.
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        },
        style: markerStyle,
        onEachFeature: onEachFeature
        
        
    }).addTo(map);

  });
