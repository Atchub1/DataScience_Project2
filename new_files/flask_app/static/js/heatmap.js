var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 13
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";

d3.json(url).then(function(data) {
  var heatArray = [];

  data.forEach((response) => {
    // object destructuring
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { location } = response;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  });

  L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);
}).catch(function(error) {
  console.log(error);
});
