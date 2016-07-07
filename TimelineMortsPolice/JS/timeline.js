var format = d3.time.format("%d/%m/%Y");
var startDate = format.parse("01/01/2014");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var endDate = format.parse(dd+"/"+mm+"/"+yyyy);
var formatDate = d3.time.format("%m/%Y");

document.getElementById('titre').style.width = Math.min(590,window.innerWidth-30)+"px";


var margin = {top: 100, right: 95, bottom: 100, left: 70},
    width = Math.min(window.innerHeight,600) - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

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
    .call(d3.svg.axis().scale(x).orient("left").tickFormat(formatDate));
	
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function(d) {
			if (d.nom=="Alton Sterling") {
				return [220,120];
			}
			else if (d.nom=="Philando Castile") {
				return [300,120];
			}
		else {
			return [20,120];}
		})
		.html(function(d,i) {
			var ville = d.ville;
			var etat = d.etat;
			var nom = d.nom;
			var date = d.Date;
			var age = d.age;
			var note = d.detail;
			return '<div class=texte><span class="villeEtat">'+ville +', '+ etat+'</span><br><span class="nom">'+ nom +', '+age+' </span><br/> <br/> Le '+ date + ' <br/><span class="note">' + note + '</span>' ;
		;});	
	

//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1CS4pMerMS9y2D8T1s1j33yxTLSatkEWz8yyEBBmCd90/pubhtml'	
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
			var date = d.date_txt;
			//var y = d.date_assassinat.slice(-4);
			var y = x(format.parse(date));		
			if (d.nom=="Alton Sterling") {
				y +=5;
				}
			if (d.nom=="Philando Castile") {
				y -=5;
				}
			if (d.nom=="Walter L. Scott") {
				y +=3;
				}
			if (d.nom=="Freddie Gray") {
				y -=3;
				}
			if (d.nom=="Michael Brown") {
				y +=5;
				}
			if (d.nom=="John Crawford III") {
				y -=8;
				}				
			return y;
		})
		.attr("r",5)
		.style("stroke","black")
		.style("fill","white")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);
		
	group.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr("class","nomtrav")
		.attr("x",50)
		.attr("y",function(d) {
			var date = d.date_txt;
			var y = x(format.parse(date));
			if (d.nom=="Alton Sterling") {
				y +=5;
				}
			if (d.nom=="Philando Castile") {
				y -=5;
				}
			if (d.nom=="Walter L. Scott") {
				y +=3;
				}
			if (d.nom=="Freddie Gray") {
				y -=3;
				}
			if (d.nom=="Michael Brown") {
				y +=5;
				}
			if (d.nom=="John Crawford III") {
				y -=8;
				}
			return y+4;
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
