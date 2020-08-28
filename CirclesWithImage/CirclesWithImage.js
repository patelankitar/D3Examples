var width = 1500,
    height = 900 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "pink")
	

d3.csv("data.csv", function(data){




var circles = svg.append("circle")
.data(data)
					
					.attr("fill", "blue")
					.attr("cx", function(d){console.log(d.cx); return d.cx})
					.attr("cy", function(d){console.log(d.cy);return d.cy})
					.attr("r", function(d){console.log("1");return d.weightage})
					.style("stroke-width", 3) 

});
