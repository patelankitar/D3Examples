var width = 500,
    height = 500 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "yellow")
	

d3.csv("data.csv", function(csvdata){
 var jsonCircles = [
   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
   { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
   { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];
 
	console.log(csvdata);

var circles = svg.selectAll("circle")
                          .data(csvdata)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return 100; })
                       .attr("cy", function (d) { return 200; })
                       .attr("r", function (d) { return 50; })
                       .style("fill", "red");
});
