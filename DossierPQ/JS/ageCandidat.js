// Variables Globales
var largeurSVG = document.documentElement.clientWidth*0.9; //Taille de la fenetre a rendre responsive
var tailleGraph = largeurSVG; // Taille de la zone de graphique
var hauteurSVG = 500; // Hauteur de la fenetre
var margin = 50; // Marge pour les axes
var marginL = 25;
var tailleTitre="18px"
//Taille pour les légendes
var tailleLeg = "11px";
var largeurLeg = 90;
if (largeurSVG<750*0.9) {
	tailleLeg = "8px"
	largeurLeg = 65;
	tailleTitre = "14px"}
						
//Dates des élections pour les séparations
var election = [1968,1985,1988,1996,2001,2005,2007,2015,2016];
//MOyenne d'age des candidats à chaque éléction
var moyenne = [];

// Fonction pour retrouver un élément dans un tableau
var compIndex = function(a, b) {
				var i = a.length;
				while (i--) {
					if (a[i] == b) return i;
				}
				return -1;
			};
// Fonction pour trouver le numéro de l'éléction en ayant l'année			
var valeur = function(n) {
	return compIndex(election,n);
}

// Echelles pour le graphe
var echelleLargeur = d3.scale.linear().domain([0,8]).range([marginL+20,tailleGraph-marginL]);
var echelleHauteur = d3.scale.linear().domain([70,30]).range([margin,hauteurSVG-margin]);

//Création de la SVG
var svg = d3.select("body")
			.append("svg");
svg.attr("width",largeurSVG) 
			.attr("height", hauteurSVG);

			
//Récupération des candidats par année avec leur age sur un google sheet			
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zVvQWAuYnZbLtGs-yxANFTPUBUAquJ4Dek8OggY4bP4/pubhtml';

//Création du Tooltip			
var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, 0])
		.html(function(d,i) {
		var temp = " : ";
		if (d.Elu==1)
			temp = " élu : "	
		var text = "Candidat" + temp + d.Candidats + "</br>" + d.Age + " ans";
		var photo = "</br>" + '<img src="'+ d.Photo + '" style="width:60px;">';
		if (d.Photo == "")
			photo = "";
		var note = "</br>" + d.Note;
		if (d.note == "")
			note = "";
		return text + photo + note ;
		});

//Fonctions pour utiliser et afficher les données du google sheets
function drawChart(data) {
var group = svg.append("g")	;	
group.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","circle")
	.attr("cx", function(d){return echelleLargeur(valeur(d.Annee));})
	.attr("cy", function(d){return echelleHauteur(d.Age);})
    .attr("fill", function(d){
		//Petit calcul pour récupérer la moyenne
		if (d.Moyenne !="")
			moyenne.push({x:d.Annee,y:d.Moyenne});
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
	
	// Affichage de la courbe de moyenne				
var line = d3.svg.line()
    .x (function(d){return echelleLargeur(valeur(d.x));})
    .y (function(d){return echelleHauteur(d.y);})
	.interpolate("basis");				
				
svg.append("path")
	.attr("class","line")
    .attr("d",line(moyenne))
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width","1")
	.attr("opacity",.5);
	
};
 
function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}

function draw(data, tabletop) {
  drawChart(data);
}

renderSpreadsheetData();



//Affichage des séparations pour les années d'éléction
var bars = d3.select("svg").selectAll("line")
				.data(election)
				.enter()
				.append("line")
				.attr("class", "separation")
				.attr("y1", hauteurSVG-margin)
				.attr("y2", margin)
				.attr("x1", function(d,i){
					return echelleLargeur(i);//election[i]);
					})
				.attr("x2", function(d,i){
					return echelleLargeur(i);//election[i]);
					})
				.attr("opacity", .1)
				.attr("stroke", "black");

//Axes								
var yAxis = d3.svg.axis()
			.scale(echelleHauteur)
			.ticks(5, "s")
			.orient("left");
			
// Etiquettes à la main pour l'axe du bas
var etiquette = d3.select("svg").selectAll("text")
			   .data(election)
			   .enter()
			   .append("text")
			   .text(function(d) {
				   return d ;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d) {
					return echelleLargeur(valeur(d));
			   })
			   .attr("y", function(d,i) {
				   return (hauteurSVG - margin + 15);
			   })
			   .attr("font-family", "Roboto")
			   .attr("font-size", "11px")
			   .attr("fill", "black");


//Légende
var legendeY = 50;
var legendeX = largeurSVG*0.8;
//Contour
svg.append("rect")
	.attr('x', legendeX -10 )
	.attr('y', legendeY - 10 )
	.attr('height', 60)
	.attr('width', largeurLeg)
	.attr('fill', "#c8c8ca")
	.attr('opacity', 0.8);

//Text
svg.append("circle")
			.attr("cx", legendeX)
			.attr("cy", legendeY)
			.attr("fill", "white")
			.attr("r", 4)
			.attr("stroke", "black");
svg.append("circle")
			.attr("cx", legendeX)
			.attr("cy", legendeY+20)
			.attr("fill", "black")
			.attr("r", 3);
			
svg.append("text")
	.text("Candidat élu")
	.attr("text-anchor", "start")
	.attr("x", legendeX + 8)
	.attr("y", legendeY+3)
	.attr("font-family", "Roboto")
	.attr("font-size", tailleLeg)
	.attr("fill", "black");
	
svg.append("text")
	.text("Candidat")
	.attr("text-anchor", "start")
	.attr("x", legendeX + 8)
	.attr("y", legendeY+23)
	.attr("font-family", "Roboto")
	.attr("font-size", tailleLeg)
	.attr("fill", "black");	

svg.append("line")
	.attr("x1", legendeX-4)
	.attr("x2", legendeX+4)
	.attr("y1", legendeY+40)
	.attr("y2", legendeY+40)
	.attr("opacity", .8)
	.attr("stroke-width","1")
	.attr("stroke", "grey");
	
svg.append("text")
	.text("Âge moyen")
	.attr("text-anchor", "start")
	.attr("x", legendeX + 8)
	.attr("y", legendeY+43)
	.attr("font-family", "Roboto")
	.attr("font-size", tailleLeg)
	.attr("fill", "black");

svg.append("text")
	.text("Âge")
	.attr("text-anchor", "middle")
	.attr("x", marginL-10)
	.attr("y", margin-20)
	.attr("font-family", "Roboto")
	.attr("font-size", "11px")
	.attr("fill", "black");
	
/*//Titre du graphique
svg.append("text")
	.attr("class","titre")
	.text("Quel est l’âge des candidats à la chefferie du Parti québécois ?")
	.attr("text-anchor", "middle")
	.attr("x", marginL + tailleGraph/2)
	.attr("y", margin-20)
	.attr("font-family", "Roboto")
	.attr("font-size", tailleTitre)
	.attr("fill", "black");	*/
				
//Mise en place des Axes et du tooltip			
				
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + marginL + ",0)")
	.call(yAxis);
		
svg.call(tip);	