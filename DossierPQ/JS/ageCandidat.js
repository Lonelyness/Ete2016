﻿var largeurSVG = 800;
var hauteurSVG = 500;
var margin = 50;
var echelleLargeur = d3.scale.linear().domain([1968,2016]).range([margin,largeurSVG-margin]);
var echelleHauteur = d3.scale.linear().domain([70,35]).range([margin,hauteurSVG-margin]);
var election = [1968,1985,1988,1996,2001,2005,2007,2015,2016];

var svg = d3.select("body")
			.append("svg");
svg.attr("width",largeurSVG) // largeur du graph
			.attr("height", hauteurSVG);

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zVvQWAuYnZbLtGs-yxANFTPUBUAquJ4Dek8OggY4bP4/pubhtml';
			
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d,i) {
		var temp = " : ";
		if (d.Elu==1)
			temp = " élu : "	
		return "Candidat" + temp + d.Candidats + "</br>" + d.Age + " ans.";
		});


function drawChart(data) {
d3.select("svg").selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","circle")
	.attr("cx", function(d){return echelleLargeur(parseInt(d.Annee));})
	.attr("cy", function(d){return echelleHauteur(d.Age);})
    .attr("fill", function(d){
		if (d.Elu==1)
			return "blue";
		else return "black";})
    .attr("r", function(d){
		if (d.Elu==1)
			return "4";
		else return "3";})
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
				.ticks(election)
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