var width = window.innerWidth;
var height = window.innerHeight;
var taillePhoto = 72;
var espacetext = 14;
if (width<=height) {
	taillePhoto=100;
	espacetext = 0;}
	
var compteur = 0;	

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
	divs[i].style.height= height*0.021+'px';}
}

//Récupération des photos			
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1tiCIvMgUxYddYsYNcXRMo2eW_orVxdoTcRrV7G7zSRg/pubhtml';

function openfb(url) {
	window.open(url, 'sharer', 'top=0,left=0,toolbar=0,status=0,width=520,height=350');
}


function drawChart(data) {
	
	var infos = data[0];
	var titre = infos.titre;
	var sous_titre = infos.sous_titre;
	var descrip = infos.description_page;
	descrip = descrip.replace(/'/g,"&#39");
	descrip = descrip.replace(/<br>/g, " ");
	var auteur = infos.auteur;
	var date = infos.date_publication;
	var nb = data.length;
	
	$('head').append( '<meta property="og:url" content="'+ window.location.href+'">' );
	$('head').append( '<meta property="og:title" content="'+titre+'" />' );
	$('head').append( '<meta property="og:description"   content="'+descrip+'" />');
	$('head').append( '<meta property="og:image"   content="'+infos.lien+'" />');
	
	
	window.parent.document.title = titre;
	document.getElementById('lienfb').href="javascript:openfb( 'https://www.facebook.com/dialog/feed?app_id=256172254741882&link="+ window.location.href+"&title="+titre+"&description="+descrip+"&redirect_uri=http://ledevoir.com&picture="+infos.lien+"' )";
	document.getElementById('lientw').href="javascript:openfb( 'https://twitter.com/intent/tweet?url="+ window.location.href+"&text=@ledevoir "+titre+" "+sous_titre+"&related=@ledevoir&counturl="+ window.location.href+"' )"

	
	
	d3.select("body").append('div')
		.attr("class","haut")
		.html("<div class='entete1'><span class='titre'>" + titre + "</span><br><span class=soustitre>"+sous_titre+"</span></div><div class='entete2'><span class=description>" + descrip + "</span></div><div class='entete3'><span class=nbPhotos>" + nb +" Photos </span> // <span class=auteur> Par " + auteur + " - <span class=date>" + date +"</span></div>")
		.style("padding-top", height*0.05+'px')
		.style("margin","0 "+ espacetext*2 +"% 0 " + espacetext+"%");
	
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
		.style("padding-top", height*0.02+'px' )
		.style("padding-bottom", "15px" );;
		
	d3.select("body").append("div")
		.attr("class","retour")
		.html('<a href="#top"> Haut de page </a>');
	
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

   if(key_code == "39")
   {
	   compteur +=1;
	   window.location.href="#" + compteur;
	}   
   else if(key_code == "37")
   {
	   if (compteur !=0) {
	   compteur -=1;
	   window.location.href="#" + compteur;
	   }
	}   
}




