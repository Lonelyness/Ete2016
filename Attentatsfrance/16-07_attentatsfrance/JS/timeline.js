//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1cQVOLeFr4rTnNck4qMr-phxeNx2CTmhqeF6-Odz5V1o/pubhtml?gid=788345292&single=true'
// Si tooltip fixe et affichage du premier élement fixe=true;
var fixe = true;

var format = d3.time.format("%d/%m/%Y");
var startDate = format.parse("01/01/2015");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var endDate = format.parse(dd+"/"+mm+"/"+yyyy);
var formatDate = d3.time.format("%m/%Y");

var decalage = 300;

if (window.innerWidth<800) {
	decalage = 260
};
if (window.innerWidth<620) {
	decalage = 220;
};
if (window.innerWidth<375) {
	decalage = 120;
};





document.getElementById('titre').style.width = Math.min(590,window.innerWidth-30)+"px";


var margin = {top: 20, right: 95, bottom: 20, left: 70},
    width = Math.min(window.innerHeight,600) - margin.left - margin.right,
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
    .call(d3.svg.axis().scale(x).orient("left").tickFormat(formatDate));
	
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function(d) {
			if ((fixe==false)&&(window.innerWidth<420)&&(d.uid==12)) {
				return [200,decalage];
				}
			return [80,decalage];
		})
		.html(function(d,i) {
			var ville = d.ville;
			var etat = d.etat;
			var nom = d.nom;
			var date = d.Date;
			var age = d.age;
			var note = d.detail;
			return '<div class=texte><b>Le '+ date + ' </b><br/><span class="note">' + note + '</span>' ;
		;});	
	

	
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
	
	group.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('id', function(d){ 
			return d.uid;
		})
		.attr("cx",30)
		.attr("cy",function(d) {

			var date = d.date_txt;
			//var y = d.date_assassinat.slice(-4);
			var y = x(format.parse(date));
			if (d.uid==1) {
				return y+10;
				}
			if (d.uid==9) {
				return y+6;
				}				
			return y;
		})
		.attr("r",5)
		.style("stroke","#fff")
		.style("fill","#4c7d95")
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
			return y+4;
		})
		.style("fill","black")
		.text(function(d) {
			return d.nom;
		});
		
		
		if ((fixe)&&(window.innerWidth>=375))  {
		tip.show(data[data.length-1], document.getElementById('13'));
		}
		if ((fixe)&&(window.innerWidth<375))  {
		tip.show(data[data.length-1], document.getElementById('11'));
		}
	
			
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

