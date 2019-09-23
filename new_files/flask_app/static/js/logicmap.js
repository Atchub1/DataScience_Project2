function createCircles(year) {
    let url = `/years/${year}`

    // Perform a GET request to the query URL
    d3.json(url).then(function(response) {
    // Once we get a response, send the data.features object to the createFeatures function
    // Initialize an array to hold circles
        let centers = [];
        // Loop through the earthquake array
        response.forEach(data => {
            // For each earthquake, create a circle and bind a popup with the earthquake's magnitude 
            let location = [data.lat, data.lon];
            //console.log(location); 
            let ridership = data.ridership;
            let station = data.stations;
            if(ridership > 0){
            //console.log(mag);
            let center = L.circle(location, {
                fillOpacity: .75,
                color: getColor(ridership),
                fillColor: getColor(ridership),
                //Adjust radius
                radius: ridership/5000})
                //}).addTo(myMap);
                .bindPopup(`<h1> ${station} </h1> <hr> <h3>Ridership: ${ridership} </h3>`);
                // Add the center to the centers array
                centers.push(center);
            };
        });
        let ctaLayer = L.layerGroup(centers);
        createMap(ctaLayer);
    });
}

//create a function to return the color for earthquake magnitude https://leafletjs.com/examples/choropleth/
function getColor(ridership) {
return ridership/100000 > 5 ? '#ff0008' :
        ridership/100000 > 4  ? '#ff7b00' :
        ridership/100000 > 3  ? '#ffcd03' :
        ridership/100000 > 2  ? '#f2ff00' :
        ridership/100000 > 1   ? '#aaff00' :
        ridership/100000 > 0   ? '#26ff00' :
                '#00ffd0';
}

// Create the createMap function
function createMap(ctaLayer) {
//  console.log(ctaLayer);

    // Create the tile layer that will be the background of our map
    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
        });
    
        var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
        });
    
        var grayscalemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
        });

    // Create a baseMaps object to hold the satellite layer
    var baseMaps={
        "Outdoor Map": outdoorsmap,
        "Greyscale Map": grayscalemap,
        "Satellite Map": satellitemap
    };
    
    // Create an overlayMaps object to hold the earthquake layer
    var overlayMap = {
        'CTA Stations' : ctaLayer
    };

    // Create the map object with options
    var map = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11,
    layer: [outdoorsmap, overlayMap]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMap, {collapsed: false}).addTo(map);

    //create legend https://leafletjs.com/examples/choropleth/
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            mult = 1000;
            mags = [0, 100, 200, 300, 400, 500],
            colors =[],
        labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor((mags[i] + 1)* mult) + '"></i> ' +
            mags[i] +"k" + (mags[i + 1] ? '&ndash;' + mags[i + 1] + "k" + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
    map.setMaxBounds(  [[-90,-180],   [90,180]]  )
}

function init() {      

    // Set up the dropdown menu
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDatasetYear");
  
    // Use the list of sample names to populate the select options
    d3.json("/years").then((Years) => {
        Years.forEach((year) => {
        selector
            .append("option")
            .text(year)
            .property("value", year);
        });
  
    // Use the first sample from the list to build the initial plots
    const firstYear = Years[0];
    createCircles(firstYear);
    createLayer(firstYear);
    });
  
  }
function optionChanged(newYear) {
// Fetch new data each time a new state is selected
    createCircles(newYear);
}

  
init();