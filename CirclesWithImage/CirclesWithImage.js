var width = 500,
    height = 500 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lightblue")
	

d3.csv("data.csv", function(data){
   var circles = svg.selectAll("circle")
                           .data(data)
                           .enter()
                           .append("circle");
	
	//Add the circle attributes
var circleAttributes = circles
                       .attr("cx", function (d) { return d.cx; })
                       .attr("cy", function (d) { return d.cy; })
                       .attr("r", function (d) { return 50; })
                       .style("fill", "red");
});
