//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1cQVOLeFr4rTnNck4qMr-phxeNx2CTmhqeF6-Odz5V1o/pubhtml?gid=788345292&single=true'
var format = d3.time.format("%d/%m/%Y");
//Date de début de la timeline
var startDate = format.parse("01/01/2015");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var endDate = format.parse(dd+"/"+mm+"/"+yyyy);
//Format des Dates dans le google sheet
var formatDate = d3.time.format("%m/%Y");

document.getElementById('titre').style.width = window.innerWidth+"px";


var width = (window.innerWidth) ,
    height = 100,
	margin = {top: 20, right: 95, bottom: 20, left: 30};

var x = d3.time.scale()
    .domain([startDate, endDate])
    .nice(d3.time.month)
    .range([0, width-margin.left-margin.right]);

var svg = d3.select(".contenant").append("svg")
	.attr("width", width )
	.attr("height", height )
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(d3.svg.axis().scale(x).orient("bottom").tickFormat(formatDate));
	
	
function drawChart(data) {
		
	var group = svg.append("g");
	
	group.append("line")
			.attr("class", "separation")
			.attr("x1", x(startDate))
			.attr("x2", x(endDate))
			.attr("y1", 40)
			.attr("y2", 40)
			.attr("opacity", .6)
			.attr("stroke", "black");
	
	group.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('id', function(d){ 
			return d.uid;
		})
		.attr("cy",40)
		.attr("cx",function(d) {

			var date = d.date_txt;
			var y = x(format.parse(date));
			if (d.uid==1) {
				return y-10;
				}
			if (d.uid==9) {
				return y-6;
				}				
			return y;
		})
		.attr("r",5)
		.style("stroke","#fff")
		.style("fill","#4c7d95")
		.on('mouseover', function(d) {
			var ville = d.ville;
			var etat = d.etat;
			var nom = d.nom;
			var date = d.Date;
			var age = d.age;
			var note = d.detail;
			document.getElementById("description").innerHTML = '<div class=texte><b>Le '+ date + ' </b><br/><span class="note">' + note + '</span>' ;
		});
		
		var d = data[data.length-1];
		var ville = d.ville;
		var etat = d.etat;
		var nom = d.nom;
		var date = d.Date;
		var age = d.age;
		var note = d.detail;
		document.getElementById("description").innerHTML = '<div class=texte><b>Le '+ date + ' </b><br/><br/><span class="note">' + note + '</span>' ;
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
//svg.call(tip);

