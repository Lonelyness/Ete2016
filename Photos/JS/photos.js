var width = window.innerWidth;

var taillePhoto = 72;
var espacetext = 14;
if (width<=800) {
	taillePhoto=100;
	espacetext = 0;}

	
document.getElementById('lienfb').href="https://www.facebook.com/sharer/sharer.php?u=" + window.location.href ;
$('head').append( '<meta property="og:url" content="'+ window.location.href+'">' );

//function popupfb() { window.open('https://www.facebook.com/sharer/sharer.php?u="+ window.location.href+"','Partage Facebook','width=600,height=400');}
//Récupération des candidats par année avec leur age sur un google sheet			
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1tiCIvMgUxYddYsYNcXRMo2eW_orVxdoTcRrV7G7zSRg/pubhtml';




function drawChart(data) {
	
	var infos = data[0];
	var titre = infos.titre;
	var sous_titre = infos.sous_titre;
	var descrip = infos.description_page;
	var auteur = infos.auteur;
	var date = infos.date_publication;
	var nb = data.length;
	
	$('head').append( '<meta property="og:title" content="'+titre+'" />' );
	$('head').append( '<meta property="og:description"   content="'+descrip+'" />');
	$('head').append( '<meta property="og:image"   content="'+infos.lien+'" />');
	
	
	d3.select("body").append('div')
		.attr("class","haut")
		.html("<div class='entete1'><span class='titre'>" + titre + "</span><br><span class=soustitre>"+sous_titre+"</span></div><div class='entete2'><span class=description>" + descrip + "</span></div><div class='entete3'><span class=nbPhotos>" + nb +" Photos </span> // <span class=auteur> Par " + auteur + " - <span class=date>" + date +"</span></div>");
	
	
	var group = d3.select("body").append("g");
	
	group.selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.attr('id',function(d) {
			return d.id;
		})
		.html(function(d) {
			return '<div class="divPhoto"><img src="' + d.lien + '" style="width:'+ taillePhoto + '%;" > <div class="sousPhoto" style="margin: 0 '+ espacetext +'% 0 '+ espacetext +'%;"> <span class="idPhoto"> #' + d.id +'</span> - ' + d.description + ' // <span class="artiste">' + d.artiste + ' (' + d.agence +') </span> </div>';
		})
		.style("padding-top", "28px" )
		.style("padding-bottom", "15px" );;
		
	d3.select("body").append("div")
		.attr("class","retour")
		.html('<a href="#top"> Retourner en haut de la page </a>');
	
}

function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}

function draw(data, tabletop) {
  // draw chart
  drawChart(data);
}

renderSpreadsheetData()

function detectTouche(e){
   var key_code = "";
 
   if(parseInt(navigator.appVersion,10) >=4){
        if(navigator.appName == 'Netscape'){ // Pour Netscape, firefox, ...
            key_code = e.which;
        }
        else{ // pour Internet Explorer
            key_code = e.keyCode;
        }
   }

   if(key_code == "37")
   {
	   window.location.href="#2";
	}   
   else if(key_code == "39")
   {
	   window.location.href="#4";
	}   
}




