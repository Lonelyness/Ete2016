var width = 620;
var height;
var margin = 0;
var decal = width*0.4;
var espace = 8;
var sort = false;
var bar;
var x;
var y;
var index;
var index2;
var index3;
var leg = 50;
var svg ;

//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1UFEeX9HgdAup965WHMdXssUkxA-BlIySv3git3iDwfs/pubhtml'	
function drawChart(data) {
	
var taille = 22;
var nb = data.length;
var height = nb * taille;	
	
var svg = d3.select("body").append("svg")
    .attr("viewBox", [
       0,
       0,
       width,
       height
     ].join(" ")); 

var partis = ["PQ","PLQ","CAQ","ADQ","UN","BP","PC","PNP"];

var indexpartis= function(t) {
	for (i=0;i<partis.length;i++) {
		if (t==partis[i]) {var indexi=i; break;}
	}
	return indexi;
}



index = d3.range(nb);
index2 = d3.range(nb);
index3 = d3.range(nb);	


var colorpartis = d3.scale.ordinal()
    .domain(partis)
    .range(["#0055a5","#d91f2d","#00b4f1","#01aef0","#0088c2","#87cefa","#9999ff","#923746"]);
		
x = d3.scale.linear()
	.domain([0,120])
	.range([2,width-2*margin-decal]);

y = d3.scale.ordinal()
    .domain(index)
    .rangeBands([leg, height], .1);

//Création du Tooltip			
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0])
		.html(function(d,i) {
			nom = d.députés;
			partis= d.partis_entier;
			duree = d.duree_mandat; 
			pourcent = d.pourcentage;
			legis = d.legislature; 
			if (legis==1) {legis += "ère";}
			else {legis += "e";}
			note = d.note;
		return "<span class='nom'>" + nom +"</span><br>"+partis+"<br>"+duree+" jours / "+pourcent+" du mandat<br>"+legis+" législature <br><i>"+ note +"</i>";
		});
	

bar = svg.selectAll(".bar")
    .data(data)
    .enter()
	.append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

bar.append("rect")
    .attr("height", taille - espace)
	.attr("x", margin+decal)
    .attr("width", function(d) { return x(parseFloat(d.pourcentage)); })
	.style("fill", function(d) { return colorpartis(d.partis);} )
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);
	

bar.append("text")
    .attr("text-anchor", "start")
	.attr("class","pourcent")
    .attr("x", function(d) { return x(parseFloat(d.pourcentage)) + margin + decal + 5; })
    .attr("y", (taille-espace) / 2)
    .attr("dy", ".35em")
    .text(function(d, i) { return parseInt(d.pourcentage) + "%"; });
	
bar.append("text")
	.attr("class","politicien")
    .attr("text-anchor", "end")
    .attr("x", margin + decal - 10)
    .attr("y", (taille-espace) / 2)
    .attr("dy", ".35em")
    .text(function(d, i) { return d.députés; });
	
 index.sort(function(a, b) { return - parseFloat(data[a].demission_num) + parseFloat(data[b].demission_num); });
 index2.sort(function(a, b) { return parseFloat(data[a].pourcentage) - parseFloat(data[b].pourcentage); });
 index3.sort(function(a, b) { 
		var partiA= indexpartis(data[a].partis);
		var partiB= indexpartis(data[b].partis);
				  if(partiA==partiB) {
						return (- parseFloat(data[a].demission_num) + parseFloat(data[b].demission_num));
					}
				  else {return partiA - partiB;}
		}
	);



 svg.call(tip);
 
 var legende = svg.append('g')
		.attr("transform", "translate(" + width*0.1 +"," + 10 + ")");
 
 var ta = width*0.8/partis.length;
 
 legende.selectAll("rect")
	.data(partis)
	.enter()
	.append("rect")
	.attr("x", function(d,i) { 
		return i*ta;
	})
    .attr("y", 0)
	.attr("width", ta)
	.attr("height",20)
	.style("fill", function(d) {return colorpartis(d);} )
	.style("stroke-width",0.3)
	.style("stroke","#fff");
 
 
  legende.selectAll("text")
	.data(partis)
	.enter()
	.append("text")
	.attr("class", "legende")
	.attr("x", function(d,i) { console.log(i);
		return i*ta + ta/2;
	})
    .attr("y", 15)
	.text(function(d) { return d;} )
	.style("fill","#fff")
	.attr("text-anchor", "middle");
}
		
var updateDataChrono = function() {
    y.domain(index);
  bar.transition()
      .duration(750)
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

}

var updateDataPourcent= function() {
	y.domain(index2);
  bar.transition()
      .duration(500)
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
}
var updateDataParti= function() {
	y.domain(index3);
  bar.transition()
      .duration(500)
      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
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
