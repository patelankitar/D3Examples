var width = 1500,
    height = 900 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
	

d3.csv("data.csv", function(data){




var circles = svg.append("circle")
					.attr("class","circle")
					//.attr("fill", function (d) { return "url(#" + d.id + ")" })
					.attr("fill", "blue")
					.attr("cx", function(d){return d.cx})
					.attr("cy", function(d){return d.cy})
					.attr("r", function(d){return d.weightage})
					.style("stroke-width", 3) 

});
