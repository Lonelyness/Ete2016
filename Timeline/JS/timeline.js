﻿var format = d3.time.format("%d/%m/%Y");
var startDate = format.parse("01/01/1945");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var endDate = format.parse(dd+"/"+mm+"/"+yyyy);


var margin = {top: 200, right: 100, bottom: 70, left: 70},
    width = Math.min(620,window.innerWidth) - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.time.scale()
    .domain([startDate, endDate])
    .nice(d3.time.month)
    .range([0, width]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(d3.svg.axis().scale(x).orient("bottom"));
	
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0])
		.html(function(d,i) {
			var nom = d.nom;
			var date = d.date_attentat_txt;
			var age = d.age;
			var fonction = d.fonction;
			var photo = d.photo;
			var note = d.Texte;
			return '<div class="flotte"><img src="' + photo + '" style="width:80px;" > </div> <div class=texte><span class="nom">'+ nom +' </span><br/> <span class="fonction">' + fonction + '</span><br/> Attentat survenu le '+ date + ' <br/> ' + note ;
		;});	
	

//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1SjNM3P5I7u-xvYz4wbVEtswydhte83poBOI-aYkprTg/pubhtml'	
function drawChart(data) {
	
	var group = svg.append("g");
	
	group.append("line")
			.attr("class", "separation")
			.attr("x1", x(startDate))
			.attr("x2", x(endDate))
			.attr("y1", 30)
			.attr("y2", 30)
			.attr("opacity", .6)
			.attr("stroke", "black");
	
	group.selectAll('cicle')
		.data(data)
		.enter()
		.append('circle')
		.attr("cy",30)
		.attr("cx",function(d) {
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
		.style("fill","white")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);
		
	group.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr("class","nomtrav")
		.attr("y",50)
		.attr("x",function(d) {
			var date = d.date_assassinat;
			var y = x(format.parse(date));
			return y+7;
		})
		.style("fill","black")
		.text(function(d) {
			if (d.nom=="Robert F. Kennedy") {
				return "";
			}
			if (d.nom=="Gabrielle Giffords") {
				return "";
			}
			return d.nom;
		})
		.attr("transform",function(d) {
			var date = d.date_assassinat;
			var y = x(format.parse(date));
		return "rotate(55 "+ y +" 50)"
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
