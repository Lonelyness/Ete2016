var width = document.documentElement.clientWidth*0.8,
    height = 800,
    padding = 2, // separation between nodes
    maxRadius = 12,
	centreX = - 100 + width/2,
	centreY = - 100 + height/2
	espace = 150,
	m = 4,
	legende = ["Indécis","Alexandre Cloutier","Véronique Hivon","Jean-François Lisée"];
	
var force;	

var color = d3.scale.category20()
	.domain(d3.range(m));
	
var colorbis = d3.scale.ordinal()
  .domain([1, 2, 3])
  .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)"]);
	
var x = d3.scale.quantize()
    .domain(d3.range(m))
    .range([centreX, centreX-espace, centreX+espace, centreX]);

var y = d3.scale.quantize()
    .domain(d3.range(m))
    .range([centreY, centreY-espace, centreY-espace, centreY+Math.sqrt(espace*espace+espace*espace)]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
	
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1CQllJ4CJKgkIEjsk6q4lZYBo-DSmRWOOkWNBPAOBlaY/pubhtml';

var nodes ;

//Création du Tooltip			
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0])
		.html(function(d) {
			return d.nom;
		});



function drawChart(data) {
nodes = d3.range(data.length).map(function(i) {
  var group = data[i].support;
  var nomDep = data[i].depute;
  var sexe = data[i].sexe;
  var type = data[i].type;

	return {
	nom : nomDep,
	sexe : sexe,
	type : type,
	group : group,
    radius: 10,
    colorS: color(group),
	colorT: colorbis(type),
    cx: x(group),
    cy: y(group)
  };
  
});

force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(0)
    .charge(0)
    .on("tick", tick)
    .start();

var circle = svg.selectAll("circle")
    .data(nodes)
	.enter()
	.append("circle")
	.attr("class","cercle")
    .attr("r", function(d) { return d.radius; })
    .style("fill", function(d) { return d.colorS; })
    .call(force.drag)
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);

function tick(e) {
  circle
      .each(gravity(.2 * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}	
};

function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}

function draw(data, tabletop) {
  // draw chart
  drawChart(data);
}

// ** Update data section (Called from the onclick)
$("#checkboxSexe").on('change',function() {
	alert("change");
	document.getElementById("checkboxType").checked = false;
	document.getElementById("checkboxSoutien").checked = false;
	
	d3.select("svg").selectAll(".cercle").filter(function(d,i){return d.sexe==1}).style("fill","blue");
	d3.select("svg").selectAll(".cercle").filter(function(d,i){return d.sexe==2}).style("fill","pink");
	svg.select(".legendOrdinal")
		.remove();
		
	svg.append("g")
		.attr("class", "legendOrdinal2")
		.attr("transform", "translate("+(width-200)+","+height/2+")");
	svg.select(".legendOrdinal2")
		.call(legendOrdinal2);
	});

function updateDataSexe() {
	document.getElementById("checkboxType").checked = false;
	document.getElementById("checkboxSoutien").checked = false;
	d3.select("svg").selectAll(".cercle").filter(function(d,i){return d.sexe==1}).style("fill","blue");
	d3.select("svg").selectAll(".cercle").filter(function(d,i){return d.sexe==2}).style("fill","pink");
	svg.select(".legendOrdinal")
		.remove();
		
	svg.append("g")
		.attr("class", "legendOrdinal2")
		.attr("transform", "translate("+(width-200)+","+height/2+")");
	svg.select(".legendOrdinal2")
		.call(legendOrdinal2);
};

function updateDataType() {
	document.getElementById("checkboxSexe").checked = false;
	document.getElementById("checkboxSoutien").checked = false;
	d3.select("svg").selectAll(".cercle").style("fill",function(d){return d.colorT});
	svg.select(".legendOrdinal2")
		.remove();
	svg.append("g")
		.attr("class", "legendOrdinal")
		.attr("transform", "translate("+(width-200)+","+height/2+")");
	svg.select(".legendOrdinal")
		.call(legendOrdinal);
};

function updateDataSoutien() {
	document.getElementById("checkboxType").checked = false;
	document.getElementById("checkboxSexe").checked = false;
	d3.select("svg").selectAll(".cercle").style("fill",function(d){return d.colorS});
	svg.select(".legendOrdinal")
		.remove();
	svg.select(".legendOrdinal2")
		.remove();
};


renderSpreadsheetData();

svg.call(tip);	

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (d.cy - d.y) * alpha;
    d.x += (d.cx - d.x) * alpha;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
            r = d.radius + quad.point.radius + (d.group !== quad.point.group) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

//Légende
//Légende Type
var ordinal = d3.scale.ordinal()
  .domain(["Député", "Ex-député", "Autre"])
  .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)"]);

svg.append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate("+(width-200)+","+height/2+")");

var legendOrdinal = d3.legend.color()
  .shape("path", d3.svg.symbol().type("circle").size(150)())
  .shapePadding(10)
  .scale(ordinal);
  
  
//Légende Genre
var ordinal2 = d3.scale.ordinal()
  .domain(["Homme", "Femme"])
  .range([ "blue", "pink",]);

svg.append("g")
  .attr("class", "legendOrdinal2")
  .attr("transform", "translate("+(width-200)+","+height/2+")");

var legendOrdinal2 = d3.legend.color()
  .shape("path", d3.svg.symbol().type("circle").size(150)())
  .shapePadding(10)
  .scale(ordinal2);


//Titre des zones
svg.append("text")
	.attr("class","titre")
	.text(legende[1])
	.attr("text-anchor", "middle")
	.attr("x", centreX-espace)
	.attr("y", centreY-espace-75)
	.attr("font-family", "sans-serif")
	.attr("font-size", "18px")
	.attr("fill", "black");	
	
svg.append("text")
	.attr("class","titre")
	.text(legende[2])
	.attr("text-anchor", "middle")
	.attr("x", centreX+espace)
	.attr("y", centreY-espace-75)
	.attr("font-family", "sans-serif")
	.attr("font-size", "18px")
	.attr("fill", "black");	
	
svg.append("text")
	.attr("class","titre")
	.text(legende[3])
	.attr("text-anchor", "middle")
	.attr("x", centreX)
	.attr("y", centreY+Math.sqrt(espace*espace+espace*espace)-75)
	.attr("font-family", "sans-serif")
	.attr("font-size", "18px")
	.attr("fill", "black");
	
svg.append("text")
	.attr("class","titre")
	.text(legende[0])
	.attr("text-anchor", "middle")
	.attr("x", centreX)
	.attr("y", centreY-75)
	.attr("font-family", "sans-serif")
	.attr("font-size", "18px")
	.attr("fill", "black");	
