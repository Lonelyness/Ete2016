var width = Math.min(600,window.innerWidth-50);
var height;
var margin = 0;
var decal = width*0.45;
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

var rac = false;
if (width < 550) {
		rac = true ;
	}
	
function racc(str) {	
	var res = str.split(" ");
	var ini = res[0].split("-");
	var init = ini[0][0]+'.'
	if (ini.length>=2) {
		init = init +'-'+ini[1][0]+'.';
		}
	if (res.length>=3) {
		init = init +' '+res[1][0]+'.';
		}
	return  init+' '+ res[res.length-1];
}

//lien de la google sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1UFEeX9HgdAup965WHMdXssUkxA-BlIySv3git3iDwfs/pubhtml'	
function drawChart(data) {
	
var taille = 22;
var nb = data.length;
var height = nb * taille;	
	
var svg = d3.select("body").append("svg")
    .attr("width",width)
	.attr("height",height);

var partis = ["PQ","PLQ","CAQ","ADQ","UN","BP","PC","PNP"];

var partisComplets = ["Parti québécois","Parti libéral du Québec","Coalition Avenir Québec","Action Démocratique du Québec","Union Nationale","Bloc populaire","Parti conservateur","Parti national populaire"];

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
	.domain([0,125])
	.range([2,width-2*margin-decal]);

y = d3.scale.ordinal()
    .domain(index)
    .rangeBands([0, height], .1);

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
    .text(function(d, i) { 
			if (rac) {
				return racc(d.députés);
				}
			return d.députés; });
	
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
 
 var svg = d3.select(".legend").append("svg")
    .attr("width",230)
	.attr("height",190);
 var legende = svg.append('g')
		.attr("transform", "translate(" + 10 +"," + 10 + ")");
 
 var ta = width*0.05;
 
 legende.selectAll("rect")
	.data(partis)
	.enter()
	.append("rect")
	.attr("y", function(d,i) { 
		return i*taille;
	})
    .attr("x", 0)
	.attr("width", 20)
	.attr("height",taille-espace)
	.style("fill", function(d) {return colorpartis(d);} )
	.style("stroke-width",0.3)
	.style("stroke","#fff");
 
 
  legende.selectAll("text")
	.data(partisComplets)
	.enter()
	.append("text")
	.attr("class", "legende")
	.attr("y", function(d,i) { 
		return i*taille+taille/2;
	})
    .attr("x", 25)
	.text(function(d) { return d;} )
	.style("fill","#000")
	.attr("text-anchor", "start");
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
