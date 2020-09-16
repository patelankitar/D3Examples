var width = 500,
    height = 500 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "red")
	

d3.csv("data.csv", function(data){
   var circles = svg.selectAll("circle")
                           .data(data)
                           .enter()
                           .append("circle");
	
	//Add the circle attributes
var circleAttributes = circles
                       .attr("cx", 100)
                       .attr("cy", 200)
                       .attr("r", 50)
                       .style("fill", "blue");
});
