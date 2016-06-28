var width = 620,
    height = 349;

var r = (width/(14*Math.sqrt(3)));
	
var xRange = function(x) {
	return (x+1)*(width/14);
}
var yRange = function(y) {
	return (y+1)*(3/2)*r;
}
var color = function(x) {
console.log(x);
	if (x==3)
		return '#A2A090';
	else if (x==2)
		return '#4c7d95';
	else if (x==1)
		return '#f7c38a';
	else
		return '#d7d7d7';		
}


d3.csv("EtatsUSA.csv", function(csv) {
var data=csv;


var getData = function(name) {
var index=-1;
	for (i = 0; i < data.length; i++) { 
		if (data[i].Etat==name) 
			index = data[i].Valeur;
}
return index;
} 
 
var lineFunction = d3.svg.line()
                      .x(function(d) { return d.x; })
                      .y(function(d) { return d.y; })
                      .interpolate("linear");

function hexagon(a,b,r) { 
		return [{x:a,y:b-r},{x: a+(Math.sqrt(3)/2)*r,y: b-(1/2)*r},{x: a+(Math.sqrt(3)/2)*r,y: b+(1/2)*r},{x: a,y: b+r},{x: a-(Math.sqrt(3)/2)*r,y: b+(1/2)*r},{x: a-(Math.sqrt(3)/2)*r,y: b-(1/2)*r},{x:a,y:b-r}];
	};
	
var svg = d3.select('#carte')
	.attr("viewBox", [
       0,
       0,
       width,
       height
     ].join(" "));
		
var g = svg.append("g");
		
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
		.attr("opacity",0.6);
		
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
			return yRange(d.y);
		})
		.text(function(d) {return d.key;})
		.style("fill","white");
    

});	