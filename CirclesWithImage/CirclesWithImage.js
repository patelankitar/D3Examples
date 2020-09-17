var width = 800 , height = 800;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "gray")

d3.csv("data.csv", function(CSVdata){
	
	var defs = svg.append("defs");
	
	defs.selectAll("circle")
		.data(CSVdata)
		.enter()
		.append("pattern")
		.attr("id", function(d){ return  d.id;})
		.attr("height","100%")
		.attr("width","100%")
		.attr("patternContentUnits","objectBoundingBox")
		.append("image")
		.attr("height","1")
		.attr("width","1")
		.attr("preserveAspectRatio","none")
		.attr("xmlns:xlink","http://wwww.w3.org/1999/xlink")
		.attr("xlink:href", function(d){ return d.imagePath	});

	var circles = svg.selectAll("circle")
                          .data(CSVdata)
                          .enter()
                          .append("circle");

	var circleAttributes = circles
                       .attr("cx", function (d) { return d.cx; })
                       .attr("cy", function (d) { return d.cy; })
                       .attr("r", function (d) { return d.weightage; })
                       .style("fill", function (d) { return "url(#" + d.id + ")" })
		       .style("stroke-width", 3);
});
