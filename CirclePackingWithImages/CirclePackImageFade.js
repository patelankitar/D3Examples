const svg   = d3.select("svg"),
width = +svg.attr("width"),
  		height= +svg.attr("height"),
      color = chroma
    				.scale(['#ED9367','#FAE8CB'])
    				.mode('lch')
    				.colors(3)

const g = svg.append("g").attr("transform", "translate(1, 1)");

	
const layout = d3.pack()
  			.size([width - 2, height - 2])
			.padding(0)
			
var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();			
    
// Get the data from our CSV file
				// CirclePacking.csv
d3.csv('CirclePackImageFade.csv', function(error, data) {
	data.sort(function(x, y){ return d3.ascending(x.size, y.size) })
	if (error) throw error;
	
	const stratData = d3.stratify()(data),
		  root = d3.hierarchy(stratData)
    			 .sum(function (d) { return d.data.size })
    			 .sort(function(a, b) { return b.value - a.value }),
  		  nodes = root.descendants()
  	
  layout(root)
  
  
  var defs = svg.append("defs");
	
defs.selectAll(".child")
	.data(nodes)
	.enter()
	.append("pattern")
	.attr("id",function(d){ 
		if(d.depth == "2")
			return d.data.leaves().map( d => d.data.UniqueId )
		else 
			return 0;})
	.attr("height","100%")
	.attr("width","100%")
	.attr("patternContentUnits","objectBoundingBox")
	.append("image")
	.attr("height","1")
	.attr("width","1")
	.attr("preserveAspectRatio","none")
	.attr("xmlns:xlink","http://wwww.w3.org/1999/xlink")
	.attr("xlink:href", function(d){ 
		if (d.depth == "2")
			return d.data.leaves().map( d => d.data.ImagePath)
		else 
			return "road-720.jpg"	
		});
	
  var slices = g.selectAll('circle')
	.data(nodes)
	.enter()
	.append('circle')
	.attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.r; })
	.attr("class", function(d) {
		if(d.depth == "1")
			{
			if(d.data.leaves().map( d => d.data.ShowPriority)[0] === "Low")
				return "LowNode";
			else if (d.data.leaves().map( d => d.data.ShowPriority)[0] === "Medium")
				return "MediumNode";
			else 
				return "HighNode";
			}
		else if (d.depth == "2")
			return d.data.leaves().map( d => d.data.ShowPriority ) +"Child";
		else 
			return "root";})
	.attr("fill", function (d) {  
		if(d.depth == "1")
			return  randomColor();
		else if (d.depth == "2")
			return "url(#" + d.data.leaves().map( d => d.data.UniqueId ) + ")";
		else 
			return "#ffffff";})
	.attr("id", function(d,i){return "s"+i;})
	
	var text = g.selectAll("text")
	.data(nodes)
	.enter().append("text")
    .attr("class", "label")
	.attr('x', function (d) { return d.x -20 ; })
	.attr('y', function (d) { return d.y - d.r + 20; })
	.style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
	.style("display", function(d) { return d.parent === root ? "inline" : "none"; })
	.text(function(d) { return d.data.id; });

 
//  var hiddenArcWrapper = svg.append("g")
//      .attr("class", "hiddenArcWrapper")
//
//  var arcText = hiddenArcWrapper.selectAll(".circleText")
//      .data(nodes)
//      .enter().append("text")
//      .attr("class", "circleText")
//      .style("font-size", 10)
//      .attr("dy", -10)
//      .attr('pointer-events', 'none')
//      .append("textPath")
//      .attr("startOffset", function (d, i) { 
//    	  //console.log(50 + d.data.id.length + (d.r / 8 ));
//    	  console.log("...."+(60/360) * 2 * 3.14 * (r - 35));
//    	  var r ;
//    	  g.selectAll("#s"+i).attr("r" , function(d){r = d.r; return d.r;})
//    	  console.log(".i..."+(270/360) * 2 * 3.14 * (r - 35)); 
//    	  console.log(".r..."+  (d.data.id.length));
//    	  //return String(50 + d.data.id.length+ (d.r / 8 )) + "%";
//    	  //return  "67%";
//    	  return (270/360) * 2 * 3.14 * (r - 35) ;
//    	  })
//      .attr("xlink:href", function (d, i) { return "#s" + i; })
//      .text(function (d  , i) {
//    	  return i 
//      	  //return d.data.id 
//    	  })
//      .transition()
//      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
//      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })

     		
	var val = 1;
	
	var lowNode = g.selectAll('.LowNode');
	var lowChild = g.selectAll('.LowChild');
	var lowVal = 1;
	
	
	var mediumNode = g.selectAll('.MediumNode');
	var mediumChild = g.selectAll('.MediumChild');
	var mediumVal = 1;
	
	var highNode = g.selectAll('.HighNode');
	var highChild = g.selectAll('.HighChild');
	var highVal = 1;
	
	
	
	lowNode.attr('r', function (d) { return d.r - 35; })
	mediumNode.attr('r', function (d) { return d.r - 35; })
	highNode.attr('r', function (d) { return d.r - 35; })
	
	
	lowChild.attr('r', function (d) { return d.r - 35; })
	mediumChild.attr('r', function (d) { return d.r - 35; })
	highChild.attr('r', function (d) { return d.r - 35; })

		
	lowNode.style("opacity", 0.25);
	mediumNode.style("opacity", 0.25);
	highNode.style("opacity", 0.25);
  		
	
  	
	function animateLow() {
		
		lowVal = lowVal === 1 ? 0 : 1; 
		var randomX = d3.randomUniform(100, 200)();
		
		if(lowVal === 1)
		{
//			lowNode
//		    	.transition()
//		    	.duration(1000)
//		    	.ease(d3.easeLinear)           
//		    	.style("opacity", lowVal) 
		    	//.attr('cx', function (d) { return d.x - randomX; })
		    	//.attr('cy', function (d) { return d.y; })
	    	
	    	 lowChild
		    	.transition()
		    	.duration(1000)
		    	.ease(d3.easeLinear)           
		    	.style("opacity", lowVal) 
		    	//.attr('cx', function (d) { return d.x - randomX; })
		    	//.attr('cy', function (d) { return d.y; })
		}
		
		else 
		{
//			lowNode
//	    	.transition()
//	    	.duration(1000)
//	    	.ease(d3.easeLinear)           
//	    	.style("opacity", lowVal) 
//	    	//.attr('cx', function (d) { return d.x + randomX; })
//	    	//.attr('cy', function (d) { return d.y; })
	    	
		    lowChild
		    	.transition()
		    	.duration(1000)
		    	.ease(d3.easeLinear)           
		    	.style("opacity", lowVal) 
		    	//.attr('cx', function (d) { return d.x + randomX; })
		    	//.attr('cy', function (d) { return d.y; })
		}
	       
	}
	
	function animateMedium() {
		mediumVal = mediumVal === 1 ? 0 : 1; 
		
//		mediumNode
//    		.transition()
//    		.duration(1000)
//    		.ease(d3.easeLinear)           
//    		.style("opacity", mediumVal) 
	    
    	mediumChild
    		.transition()
    		.duration(1000)
    		.ease(d3.easeLinear)           
    		.style("opacity", mediumVal) 
			
	}
	
	function animateHigh() {
		highVal = highVal === 1 ? 0 : 1; 
		
//		highNode
//	    	.transition()
//	    	.duration(2000)
//	    	.ease(d3.easeLinear)           
//	    	.style("opacity", highVal) 
	    
	    highChild
	    	.transition()
	    	.duration(2000)
	    	.ease(d3.easeLinear)           
	    	.style("opacity", highVal) 
	    	
	   	
	}
	
	setInterval(function(){
	  
	  if((val % 3)  === 0 )
		  animateMedium();
	  
	  else if((val % 4) === 0)
		  animateLow();
	  
	  else if((val % 2) === 0)
		  animateHigh();
	  
	  val = val + 1;
	  
  }, 1000)

});




// -----------------

/*
 * var diameter = 400, format = d3.format(",d") color = d3.scale.category20c();
 * 
 * var pack = d3.layout.pack() .size([diameter, diameter]) .padding(1.5)
 * .value(function(d) { return d.weightage; });
 * 
 * var vis = d3.select("#svgid").append("svg") .attr("width", diameter)
 * .attr("height", diameter) .attr("class", "pack") .append("g");
 * 
 * d3.csv("data.csv", function(csvData) { // put csv into a data structure pack
 * layout will accept var data = { name: "decade", children: csvData };
 * 
 * var node = vis.data([data]).selectAll("circle") .data(pack.nodes)
 * .enter().append("circle") .attr("class", "node") .attr("transform",
 * function(d) { return "translate(" + d.x + "," + d.y + ")"; }) .attr("r",
 * function(d) { return d.r; }) .style("fill", function(d) { return
 * color(d.group); });
 * 
 * node.append("title") .text(function(d) { return d.name ; }); });
 */