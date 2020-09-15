var width = 1500,
    height = 900 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "pink")
	

d3.csv("data.csv", function(data){




var circles = svg.selectAll('circle').data(data).enter().append('circle')

					
					.attr("fill", "blue")
					.attr("cx", function(d){console.log(d.cx); return 100})
					.attr("cy", function(d){console.log(d.cy);return 100})
					.attr("r", function(d){console.log("1");return 10})
					.style("stroke-width", 3) 

});
