﻿//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Z7VEqCF34To1SC0k1yrEy2l_nAHM-XvZ8Lxr5OmO79Q/pubhtml?gid=0&single=true'	

//Variable de début et de fin de la timeline
var format = d3.time.format("%Y.%m.%d");
var startDate = format.parse("1939.01.01");
/*var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var endDate = format.parse(dd+"/"+mm+"/"+yyyy);*/
var endDate = format.parse("2016.07.01");

var xprec = 0;


//Marge et taille du svg
var margin = {top: 220, right: 95, bottom: 70, left: 95},
    width = window.innerWidth - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom;

	
//Echelle de temps	
var x = d3.time.scale()
    .domain([startDate, endDate])
    .nice(d3.time.month)
    .range([0, width]);

	
//Création du svg et de la légende des années	
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(d3.svg.axis().scale(x).orient("bottom"));

// Infos Bulle
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0])
		.html(function(d,i) {
			var nom = d.Nom;
			var date = d.date;
			var fonction = d.Titre;
			var photo = "";//d.photo;
			var note = "";//d.Texte;
			return '<div class="flotte"><img src="' + photo + '" style="width:80px;" > </div> <div class=texte><span class="nom">'+ nom +' </span><br/> <span class="fonction">' + fonction + '</span><br/> Discours le '+ date + ' <br/> ' + note ;
		;});	
	

//Dessin des évènements
function drawChart(data) {
	
	var group = svg.append("g");
	
	group.append("line")
			.attr("class", "separation")
			.attr("x1", x(startDate))
			.attr("x2", x(endDate))
			.attr("y1", -20)
			.attr("y2", -20)
			.attr("opacity", .6)
			.attr("stroke", "black");
	
	group.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr("cy",-20)
		.attr("cx",function(d) {
			var date = d.date;
			var y = x(format.parse(date));
			if (Math.abs(xprec-y) < 2) y-=4;
			xprec = y;
			
			return y;
		})
		.attr("r", function(d) {
			if (d.Affichage==1)
				return 5;
			else
		return 0;
	})
		.style("stroke","black")
		.style("fill","white")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);
		
	group.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr("class","nomtrav")
		.attr("y",-30)
		.attr("x",function(d) {
			var date = d.date;
			var y = x(format.parse(date));
			return y+7;
		})
		.style("fill","black")
		.text(function(d) {
			if (d.Affichage==1)
				return d.Nom;
			else
				return "";
		})
		.attr("transform",function(d) {
			var date = d.date;
			var y = x(format.parse(date));
		return "rotate(-55 "+ y +" -30)"
		});
		
	
			
}	
//Appel à la Google sheet par 2 fonctions
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
 svg.call(tip);


/*
if (window.innerWidth<=500) {
	var margin = {top: 30, right: 30, bottom: 30, left: 55},
    width = window.innerWidth - 30 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.time.scale()
    .domain([startDate, endDate])
    .nice(d3.time.month)
    .range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(d3.svg.axis().scale(x).orient("left"));
	
//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1SjNM3P5I7u-xvYz4wbVEtswydhte83poBOI-aYkprTg/pubhtml'	
function drawChart(data) {
	
	var group = svg.append("g");
	
	group.append("line")
			.attr("class", "separation")
			.attr("y1", x(startDate))
			.attr("y2", x(endDate))
			.attr("x1", 30)
			.attr("x2", 30)
			.attr("opacity", .6)
			.attr("stroke", "black");
	
	group.selectAll('cicle')
		.data(data)
		.enter()
		.append('circle')
		.attr("cx",30)
		.attr("cy",function(d) {
			var date = d.date_assassinat;
			//var y = d.date_assassinat.slice(-4);
			var y = x(format.parse(date));		
			if (d.nom=="Martin Luther King") {
				y +=6;
				}
			if (d.nom=="Robert F. Kennedy") {
				y -=6;
				}
			return y;
		})
		.attr("r",7)
		.style("stroke","black")
		.style("fill","white");
		
	group.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr("class","nomtrav")
		.attr("x",50)
		.attr("y",function(d) {
			var date = d.date_assassinat;
			var y = x(format.parse(date));
			if (d.nom=="Martin Luther King") {
				y +=7;
				}
			if (d.nom=="Robert F. Kennedy") {
				y -=7;
				}
			
			return y+7;
		})
		.style("fill","black")
		.text(function(d) {
			return d.nom;
		});
		
	
			
}	
//Appel à la Google sheet par 2 fonctions
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
	
	
}*/
