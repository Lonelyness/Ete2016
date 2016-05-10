var largeurSVG = 800;
var hauteurSVG = 500;
var margin = 50;
var echelleLargeur = d3.scale.linear().domain([1968,2016]).range([margin,largeurSVG-margin]);
var echelleHauteur = d3.scale.linear().domain([70,35]).range([margin,hauteurSVG-margin]);

var svg = d3.select("body")
			.append("svg");
svg.attr("width",largeurSVG) // largeur du graph
			.attr("height", hauteurSVG);

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zVvQWAuYnZbLtGs-yxANFTPUBUAquJ4Dek8OggY4bP4/pubhtml';

			
var line = d3.svg.line()
    .x (function(d){return echelleLargeur(d.Année);})
    .y (function(d){return echelleHauteur(d.Age);})
	.interpolate("linear");

var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d,i) {
		return "Age des chefs du Parti québécois";
		});


function drawChart(data) {
svg.append("path")
	.attr("class","line")
    .attr("d",line(data))
    .attr("fill", "none")
    .attr("stroke", "#3399FF")
    .attr("stroke-width","1")
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);
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

renderSpreadsheetData();
	
var xAxis = d3.svg.axis()
				.scale(echelleLargeur)
				.ticks(8)
				.orient("bottom");
				
var yAxis = d3.svg.axis()
			.scale(echelleHauteur)
			.ticks(10, "s")
			.orient("left");
			  
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (hauteurSVG - margin) + ")")
	.call(xAxis);
				
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + margin + ",0)")
	.call(yAxis);
	
	
svg.call(tip);	