var width = 500,
    height = 500 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lightblue")
	

d3.csv("data.csv", function(data){
    console.log(data)
});
