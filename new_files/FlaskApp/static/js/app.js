function buildCharts(station) {
    // TO DO: Iterate through all states

    d3.json(`/metadata/${stations}`, function(ridershipData) {
        console.log(station);

        // Cast rates as numbers

        console.log('ridership data', ridershipData);
        
        // Build line chart
	    var trace1 = {
            x: ridershipData.year,
            y: ridershipData.ridership,
            type: "line",
            text: 'Counts per 1,000'
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
    d3.json("/stations").then((stations) => {
        stations.forEach((station) => {
        selector
            .append("option")
            .text(station)
            .property("value", station);
        });

        // Use Alabama to build the initial plot
        const defaultStation = station[0];
        buildCharts(defaultStation);
    });
}

function optionChanged(newStation) {
    // Fetch new data each time a new state is selected
    buildCharts(newStation);
}

init();