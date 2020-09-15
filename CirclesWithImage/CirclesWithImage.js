var width = 1500,
    height = 900 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "pink")
	

d3.csv("data.csv", function(data){
console.log("123");
	
var circles = svg.selectAll('circle')
.data(data).enter().append('circle')
.attr("cx", "100")
.attr("cy", "100")
.attr("r", "50");


});
