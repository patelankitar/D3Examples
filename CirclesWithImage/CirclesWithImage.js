var width = 1500,
    height = 900 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
	

d3.text("data.csv", function(error, text) {
	if (error) throw error;
	var colNames = "id,cx,cy,weightage,imagePath\n" + text;
	var data = d3.csv.parse(colNames);
	   	
var defs = svg.append("defs");

defs.selectAll("circle")
	.data(nodes)
	.enter()
	.append("pattern")
	.attr("id",function(d){ return d.id })
	.attr("height","100%")
	.attr("width","100%")
	.attr("patternContentUnits","objectBoundingBox")
	.append("image")
	.attr("height","1")
	.attr("width","1")
	.attr("preserveAspectRatio","none")
	.attr("xmlns:xlink","http://wwww.w3.org/1999/xlink")
	.attr("xlink:href", function(d){ return d.imagePath});

var circles = svg.append("circle")
					.attr("class","circle")
					//.attr("fill", function (d) { return "url(#" + d.id + ")" })
					.attr("fill", "blue")
					.attr("cx", function(d){return d.cx})
					.attr("cy", function(d){return d.cy})
					.attr("r", function(d){return d.weightage})
					.style("stroke-width", 3) 

});
