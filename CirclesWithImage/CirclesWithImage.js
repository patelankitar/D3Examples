var width = 500 , height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "black")

d3.csv("data.csv", function(CSVdata){

	var circles = svg.selectAll("circle")
                          .data(CSVdata)
                          .enter()
                          .append("circle");

	var circleAttributes = circles
                       .attr("cx", function (d) { return d.cx; })
                       .attr("cy", function (d) { return d.cy; })
                       .attr("r", function (d) { return 100; })
                       .style("fill", "red");
});
