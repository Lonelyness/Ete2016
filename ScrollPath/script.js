//A completer a la main
//Utilisation : Si on indique des pourcentages, il faut bien avoir donné un id unique a chaque p de l'html et la taille de l'array pourcent doit etre le nombre de paragraphe p.

// Description pour Facebook (les og:type)
	var sous_titre = "Au pays de la 389 - Péninsule du Labrador : la grande boucle";
	var descrip =  "Sur la Basse-Côte-Nord, on peut rejoindre Blanc-Sablon en faisant un énorme arc de cercle par le Nord québécois et le Labrador terre-neuvien. Le Devoir a fait le long périple et bouclé la boucle de Baie-Comeau à Baie-Comeau, une distance de près de 3000 km.";
	var lien= "";
	
	//Proportion du tracé pour chaque paragraphe.
	var pourcent = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,13,7,8,10,0,0,0,0]; //exemple : [10,20,10,15,15,10,20,0];

	
	
	
	
//Calcul somme pourcent
var pourcentSomme = [];
for(var i=0; i<pourcent.length; i++){
		if (i==0) {pourcentSomme.push(pourcent[0]);}
		else {pourcentSomme.push(pourcentSomme[i-1]+pourcent[i]);}
	}


var width = window.innerWidth;
var height = window.innerHeight;

// Pour adapter la navbar a l'ecran
var divs = document.getElementsByTagName('img');

for(var i=0; i<divs.length; i++){
    if(divs[i].className == "imageD"){	
    divs[i].style.height = height*0.04+'px';
	divs[i].style.paddingTop = height*0.01 +'px';
	divs[i].style.paddingBottom = height*0.01+'px';
	}
	if(divs[i].className == "imageT"){
	divs[i].style.height= height*0.025+'px';}
	if(divs[i].className == "imageF"){
	divs[i].style.height= height*0.025+'px';}
}
document.getElementById('text').style.marginTop = $("#nav").height()+'px';
document.getElementById('svg').style.marginTop = $("#nav").height()+'px';

if ((0.3*width*580/250)>0.9*height) {
	console.log('correction');
	document.getElementById('svg').style.height = 0.9*height+'px';
}
else document.getElementById('svg').style.width = 0.3*width+'px';


//Pour ouvrir la pop up de partage facebook ou twitter
function openfb(url) {
	window.open(url, 'sharer', 'top=0,left=0,toolbar=0,status=0,width=520,height=350');};

	var descripP = descrip.replace(/<br>/g,"  ");
	descripP = descripP.replace(/&nbsp;/g," ");
	document.getElementById("lienfb").href='javascript:openfb( "https://www.facebook.com/dialog/feed?app_id=256172254741882&link='+ window.location.href+'&title='+sous_titre+'&description='+descripP+'&redirect_uri=http://ledevoir.com&picture='+lien+'" )';
	document.getElementById("lientw").href='javascript:openfb( "https://twitter.com/intent/tweet?url='+ window.location.href+'&text='+sous_titre+' @ledevoir&related=@ledevoir&counturl='+ window.location.href+'" )'

//Fonction pour trouver a quel paragraphe nous sommes	
function index(tab,val) {
	var ind = -1;
	
	for(var i=0; i<tab.length; i++){
		if (tab[i]<val) {
			ind = i;
			}
	}
	return ind;
};
	
// Fonction d'initialisation du scroll
$(document).ready(function() {
	
	//Récupération du path pour décalé le pointillé	
	var path = d3.selectAll(".path");
	var totalLength = path.node().getTotalLength();
	path.attr("stroke-dasharray", totalLength)
		.attr("stroke-dashoffset", totalLength);
	
	
	//Fonction au scroll
	$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	
	//Si pas de pourcent, affiche linéaire
	if (pourcent.length==0) {
		path.attr("stroke-dashoffset", totalLength + ((scroll*totalLength)/($("html").height()-height)));
	}
	//Si pourcent : calcul de l'affichage en fonction du paragraphe
	else {
			//Taille paragraphe
		var p = $( "p" );
		var stop = [];
		for(var i=0; i<p.length; i++){
			var temp = p[i].getAttribute('id');
			stop.push($('#'+temp).height());
		}
		//Calcul somme stop
		var stopSomme = [];
		for(var i=0; i<stop.length; i++){
				if (i==0) {stopSomme.push(stop[0]);}
				else {stopSomme.push(stopSomme[i-1]+stop[i]);}
			}
			
		
		scroll += (scroll/$("html").height())*height;
		var ind = index(stopSomme,scroll);
		var resultat = totalLength;
		if (ind==-1) {
			resultat+= (((scroll)*totalLength*(pourcent[ind+1]/100))/(stop[ind+1]));
			}
		else if (ind==p.length-1){
			resultat+= (pourcentSomme[ind]/100)*totalLength;
			}
		else {
		resultat+= (pourcentSomme[ind]/100)*totalLength;
		resultat+= (((scroll-stopSomme[ind])*totalLength*(pourcent[ind+1]/100))/(stop[ind+1]));
		}
		console.log(resultat);
		path.attr("stroke-dashoffset", resultat);
	}
	});
});

