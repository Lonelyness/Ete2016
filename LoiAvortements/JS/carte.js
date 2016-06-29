//variables pour la taille d'origine du svg (qui s'adaptera avec la viewbox)
var width = 620,
    height = 349;

var r = (width/(14*Math.sqrt(3)));
	
// Echelle X : le range a été mis "a la main" pour que les états soient assez espacé
var xRange = function(x) {
	return (x+1)*(width/14);
}
// Echelle Y :  le range a été mis "a la main" pour que les états soient assez espacé
var yRange = function(y) {
	return (y+1)*(3/2)*r;
}
//Echelle des couleurs
var color = function(x) {
console.log(x);
	if (x==3)
		return '#A2A090';
	else if (x==2)
		return '#4c7d95';
	else if (x==1)
		return '#f7c38a';
	else
		return '#c3c3c3';		
}


//Ouverture du csv des données dans une fonction
d3.csv("EtatsUSA.csv", function(csv) {
//on appelle les données data
var data=csv;


//fonction pour chercher la valeur dans data en fonction du nom
var getData = function(name) {
var index=-1;
	for (i = 0; i < data.length; i++) { 
		if (data[i].Etat==name) 
			index = data[i].Valeur;
}
return index;
} 
 
// fonction de dessin d'une ligne	
var lineFunction = d3.svg.line()
                      .x(function(d) { return d.x; })
                      .y(function(d) { return d.y; })
                      .interpolate("linear");

//fonction pour indiquer les points pour faire l'héxagone en fonction du centre et du rayon.					  
function hexagon(a,b,r) { 
		return [{x:a,y:b-r},{x: a+(Math.sqrt(3)/2)*r,y: b-(1/2)*r},{x: a+(Math.sqrt(3)/2)*r,y: b+(1/2)*r},{x: a,y: b+r},{x: a-(Math.sqrt(3)/2)*r,y: b+(1/2)*r},{x: a-(Math.sqrt(3)/2)*r,y: b-(1/2)*r},{x:a,y:b-r}];
	};
	
//Création d'une view box pour que les espaces entre les éléments du svg restent constant.
var svg = d3.select('#carte')
	.attr("viewBox", [
       0,
       0,
       width,
       height
     ].join(" "));
	 
	 
//Tiptool si besoin
/*var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-5, -(1/2)*r])
		.html(function(d) {
			return d.name;
		});	*/
		
var g = svg.append("g");
		
//Dessin des hexagones en parcourant la carte des USA 
g.selectAll("path")
		.data(gridmapLayoutUsa)
		.enter()
		.append("path")
		.attr("class","hexagon")
		.attr("d", function(d) {
		if (d.y%2==1){
			return lineFunction(hexagon(xRange(d.x),yRange(d.y),r));}
			else {
			return lineFunction(hexagon(xRange(d.x)+(Math.sqrt(3)/2)*r,yRange(d.y),r));}
			})
		.attr("fill", function(d) {
			return color(getData(d.key));
		})
		.attr("stroke", "white")
		.attr("stroke-width","1")
		.attr("opacity",0.8);
		
// Dessin du nom des Etats	
g.selectAll("text")
		.data(gridmapLayoutUsa)
		.enter()
		.append("text")
		.attr("text-anchor","middle")
		.attr("class","nomEtat")
		.attr("x",function(d) {
			if (d.y%2==1){
				return xRange(d.x);}
			else {
				return (xRange(d.x)+(Math.sqrt(3)/2)*r);}
			})
		.attr("y", function(d) {
			return yRange(d.y)+5;
		})
		.text(function(d) {return d.key;})
		.style("fill","white");
		
// Si on veut un tooltip sur les hexagones		
/*var group = svg.append("g");		
group.selectAll("path")
		.data(gridmapLayoutUsa)
		.enter()
		.append("path")
		.attr("class","hexagon")
		.attr("d", function(d) {
		if (d.y%2==1){
			return lineFunction(hexagon(xRange(d.x),yRange(d.y),r));}
			else {
			return lineFunction(hexagon(xRange(d.x)+(Math.sqrt(3)/2)*r,yRange(d.y),r));}
			})
		.attr("fill", function(d) {
			return color(getData(d.key));
		})
		.attr("stroke", "white")
		.attr("stroke-width","1")
		.attr("opacity",0.1)
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);	
		
svg.call(tip); */	

// Légende avec D3-legend

// var ordinal = d3.scale.ordinal()
//   .domain(["Sur la salle d'opérations","Sur les droits d'admission dans un hôpital","Les deux","Aucune"])
//   .range([ "#4c7d95","#f7c38a","#f4aa59","#c3c3c3"]);

// var svg = d3.select("svg");

// svg.append("g")
//   .attr("class", "legendOrdinal")
//   .attr("transform", "translate(20,20)");

// var legendOrdinal = d3.legend.color()
//   //d3 symbol creates a path-string, for example
//   //"M0,-8.059274488676564L9.306048591020996,
//   //8.059274488676564 -9.306048591020996,8.059274488676564Z"
//   .shape("circle")
//   .shapeWidth(2)
//   .shapePadding(10)

//   // .opacity("0.5")
//   .scale(ordinal);

// svg.select(".legendOrdinal")
//   .call(legendOrdinal);


    

});	