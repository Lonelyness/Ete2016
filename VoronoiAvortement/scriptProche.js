var width = 620,
   height = window.innerHeight*0.9/2;

var svg2 = d3.select("#svg2")
			.append("svg")
				.attr("viewBox", [
				0,
				0,
				width,
				height
				].join(" "));
				
var circle;
			
svg.append("rect")
		.attr("class", "overlay")
		.attr("width", width)
		.attr("height", height);			
			
var projection2 = d3.geo.mercator()
  					//.center([-72, 49.5])
  					//.scale(1800)
					.center([-73.7, 45.553])
  					.scale(50000)
  					.translate([(width) / 2, (height)/2]);

var path2 = d3.geo.path()
  				.projection(projection2);
				
var voronoi2 = d3.geom.voronoi()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .clipExtent([[0, 0], [width, height]]);	

queue()
    .defer(d3.json, "quebec.json")
    .defer(d3.csv, "centre.csv")
    .await(ready);

	
function ready(error, qbec, centre) {
	if (error) throw error;		
	
	var centrefil = centre.filter(function(d) {
      d[0] = +d.long;
      d[1] = +d.lat;
      var position = projection2(d);
      d.x = position[0];
      d.y = position[1];
      return true;
  });
	
	
	voronoi(centrefil)
      .forEach(function(d) { d.point.cell = d; });
	
  	svg2.append("path")
      .datum(topojson.feature(qbec, qbec.objects.map_qc))
      .attr("id", "area")
      .attr("d", path2)
	  .style("fill","grey");	
	
	var centres = svg2.append("g")
      .attr("class", "centres")
    .selectAll("g")
    .data(centrefil)
	.enter().append("g")
    .attr("class", "centre");

	 centres.append("path")
      .attr("class", "centre-cell")
	  .style("fill","none")
	  .style("stroke","white")
	  .style("stroke-width",1)
      .attr("d", function(d) { return d.cell.length ? "M" + d.cell.join("L") + "Z" : null; });
	  
	centres.append("circle")
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", 2 );
	};
