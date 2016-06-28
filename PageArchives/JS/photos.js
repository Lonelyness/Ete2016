//Récupération des photos	- URL a changer		
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1BCohk_eGKeR7uHHAh-fwss2XuuWjR-2cJuOG5Nict8M/pubhtml';



//Variables pour la taille est les espaces
var width = window.innerWidth;
var height = window.innerHeight;
var taille = 75;
var taillePhoto = 40;
var espacetext = 14;
if (width<=height) {
	taillePhoto=100;
	taille = 100;
	espacetext = 0;}



// POur adapter la navbar a l'ecran
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

//Pour ouvrir la pop up de partage facebook ou twitter
function openfb(url) {
	window.open(url, 'sharer', 'top=0,left=0,toolbar=0,status=0,width=520,height=350');
}

//Création de la page en fonction des infos du spreadsheet
function drawChart(data) {
	
	// Infos générales
	var infos = data[0];
	var titre = infos.titre;
	var sous_titre = infos.sous_titre;
	var presentation_page = infos.presentation_page;
	var descrip = infos.description;
	var descripP = descrip.replace(/<br>/g,"  ");
	descripP = descripP.replace(/&nbsp;/g," ");
	var auteur = infos.auteur;
	var date = infos.date;
	var nb = data.length;
	//On crée les metas données et les liens de partage
	$('head').append( '<meta property="og:url" content="'+ window.location.href+'">' );
	$('head').append( '<meta property="og:title" content="'+titre+'" />' );
	$('head').append( '<meta property="og:description"   content="'+descrip+'" />');
	$('head').append( '<meta property="og:image"   content="'+infos.lien+'" />');
	window.parent.document.title = titre;
	document.getElementById("lienfb").href='javascript:openfb( "https://www.facebook.com/dialog/feed?app_id=256172254741882&link='+ window.location.href+'&title='+sous_titre+'&description='+descripP+'&redirect_uri=http://ledevoir.com&picture='+infos.lien+'" )';
	document.getElementById("lientw").href='javascript:openfb( "https://twitter.com/intent/tweet?url='+ window.location.href+'&text='+sous_titre+' @ledevoir&related=@ledevoir&counturl='+ window.location.href+'" )'

	
	//Création de la description en haut de page
	d3.select("body").append('div')
		.attr("class","haut")
		.html("<div class='entete1'><span class='titre'>" + titre + "</span><br><span class=soustitre>"+sous_titre+"</span><br><span class=description>"+descrip+"</span></div>")
		.style("padding-top", height*0.05+'px')
		.style("margin","0 "+ espacetext*2 +"% 0 " + espacetext+"%");
	//Création du hr
	d3.select("body").append('div')
		.attr("class","sep")
		.html("<hr>")
		.style("margin","0 "+ espacetext +"% 0 " + espacetext+"%");
	
	//Création des divs avec photo et description 
	var group = d3.select("body").append("g");
	group.selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.attr("class","contenantGros")
		.attr('id',function(d) {
			return d.id;
		})
		.html(function(d) { if (width<=height) {
		return '<div class="divPhoto" style="width:'+ taillePhoto +'%;"><a href="'+ d.lien_page +'"><img src="' + d.lien + '" style="width:100%;" /></a></div> <div class="sousPhoto" style="width:'+ (taillePhoto) +'%;"> <a href="'+ d.lien_page +'"><span class=titreLien>' + d.titre_page + '</span></a><br><span class=date> '+ d.date +'</span><br><br>' + d.presentation_page + '</div>';}
		else return '<table><tr><td class="divPhoto" style="width:'+ taillePhoto +'%;"><a href="'+ d.lien_page +'"><img src="' + d.lien + '" style="width:100%;" /></a></td> <td class="sousPhoto" style="width:'+ (100-taillePhoto) +'%; padding-left:2.5%; padding-right:2.5%"> <a href="'+ d.lien_page +'"><span class=titreLien>' + d.titre_page + '</span></a><br><span class=date>'+ d.date +'</span><br><br>' + d.presentation_page + '</td></tr></table>';
		})
		.style("padding-top", height*0.03+'px' )
		.style("padding-bottom", height*0.02+'px' )
		.style("width", taille+"%")
		.style("margin-left", espacetext +"%")
		.style("margin-right", espacetext +"%");
		
		
	d3.select("body").append("div")
		.attr("class","retour")
		.html('<a href="#top"> Haut de page </a>');
	
}
//Fonction pour aller chercher les données du spreadsheet
function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}
//Fonction pour appeler la création
function draw(data, tabletop) {
  // draw chart
  drawChart(data);
}
// Appel du rendu
renderSpreadsheetData()


