var largeurSVG = 800;
var hauteurSVG = 500;
var margin = 50;
var echelleLargeur = d3.scale.linear().domain([1968,2016]).range([margin,largeurSVG-margin]);
var echelleHauteur = d3.scale.linear().domain([80,0]).range([margin,hauteurSVG-margin]);
var election = [1968,1985,1988,1996,2001,2005,2007,2015,2016];
var moyenne = [{x:1968,y:46},{x:1985,y:46},{x:1985,y:43},{x:1988,y:43},{x:1988,y:58},{x:1996,y:58},{x:1996,y:58},{x:2001,y:58},{x:2001,y:56},{x:2005,y:56},{x:2005,y:54},{x:2007,y:54},{x:2007,y:59},{x:2015,y:59},{x:2015,y:46},{x:2016,y:46},{x:2016,y:43}]

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
		var text = "Candidat" + temp + d.Candidats + "</br>" + d.Age + " ans";
		return text + "</br>" + '<img src="../Photos/'+d.Candidats+'.jpg" style="width:100px;">';
		});


function drawChart(data) {
d3.select("svg").selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","circle")
	.attr("cx", function(d){return echelleLargeur(d.Annee);})
	.attr("cy", function(d){return echelleHauteur(d.Age);})
    .attr("fill", function(d){
		if (d.Elu==1)
			return "white";
		else return "black";})
    .attr("r", function(d){
		if (d.Elu==1)
			return "4";
		else return "3";})
	.attr("stroke", function(d){
		if (d.Elu==1)
			return "black";})	
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

var bars = d3.select("svg").selectAll("line")
				.data(election)
				.enter()
				.append("line")
				.attr("class", "separation")
				.attr("y1", hauteurSVG-margin)
				.attr("y2", margin)
				.attr("x1", function(d,i){
					return echelleLargeur(election[i]);
					})
				.attr("x2", function(d,i){
					return echelleLargeur(election[i]);
					})
				.attr("opacity", .7)
				.attr("stroke", "black");

/*var line = d3.svg.line()
    .x (function(d){return echelleLargeur(d.x);})
    .y (function(d){return echelleHauteur(d.y);})
	.interpolate("linear");				
				
svg.append("path")
	.attr("class","line")
    .attr("d",line(moyenne))
    .attr("fill", "none")
    .attr("stroke", "#3399FF")
    .attr("stroke-width","1");*/
			
				
var xAxis = d3.svg.axis()
				.scale(echelleLargeur)
				.ticks(0)
				.orient("bottom");
				
var yAxis = d3.svg.axis()
			.scale(echelleHauteur)
			.ticks(10, "s")
			.orient("left");

var etiquette = d3.select("svg").selectAll("text")
			   .data(election)
			   .enter()
			   .append("text")
			   .text(function(d) {
				   return d ;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d) {
				   if (d==2015)
					   return echelleLargeur(d)-7;
				   else if (d==2016)
					   return echelleLargeur(d)+7
					else return echelleLargeur(d);
			   })
			   .attr("y", function(d,i) {
				   return (hauteurSVG - margin + 15);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "black");



			
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (hauteurSVG - margin) + ")")
	.call(xAxis);
				
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + margin + ",0)")
	.call(yAxis);
	
	
svg.call(tip);	