function buildMetadata(station) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    var url = `/metadata/${station}`;


    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(url).then(function(station) {
      var sampleMetadata = d3.select("#sample-metadata");
  
    // Use `.html("") to clear any existing metadata
      sampleMetadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(station).forEach(function ([key, value]) {
        var row = sampleMetadata.append("p");
        row.text(`${key}: ${value}`);
      });
    });
}


function buildCharts(station) {
  // TO DO: Iterate through all states
  var url = `/stations/${station}`
  d3.json(url).then(function(data) {     
      // Build line chart
      var x= data.year;
      var y= data.ridership;
      var values= data.year;

          var trace1 = {
              x: x,
              y: y,
              text: values,
              mode: 'lines'
          };
      var data = [trace1];

      var layout = {
          title: `${station} Ridership Data`,
          xaxis: { title: "Year"},
          yaxis: { title: "Average Ridership over the years"}
      };
      Plotly.newPlot("line", data, layout);        
  });
}

function init() {      

  // Set up the dropdown menu
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/stations").then((stationNames) => {
      stationNames.forEach((station) => {
      selector
          .append("option")
          .text(station)
          .property("value", station);
      });

  // Use the first sample from the list to build the initial plots
  const firstStation = stationNames[0];
  buildMetadata(firstStation);
  buildCharts(firstStation);
  });
}

function optionChanged(newStation) {
  // Fetch new data each time a new state is selected
  buildMetadata(newStation);
  buildCharts(newStation);
}

init();