//Récupération des photos	- URL a changer		
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1tiCIvMgUxYddYsYNcXRMo2eW_orVxdoTcRrV7G7zSRg/pubhtml';



//Variables pour la taille est les espaces
var width = window.innerWidth;
var height = window.innerHeight;
var taillePhoto = 72;
var espacetext = 14;
if (width<=height) {
	taillePhoto=100;
	espacetext = 0;}

//Variable pour la navigation fleche	
var compteur = -1;
var heightMax=height*0.8;

var widthMaxImage = width*0.45;
	if (width<600) 
		widthMaxImage = width*0.3;
	if (width<500)
		widthMaxImage = width*0.2;
	if (width<400)
		widthMaxImage = width*0.2;
	
	
	

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

document.getElementById("caption-1").style.height=heightMax+'px';
document.getElementById("caption-1").style.width=(width-widthMaxImage)*0.8+'px';
document.getElementById("slide-1").style.height=heightMax+'px';
document.getElementById("slide-1").style.marginTop=height*0.12+'px';
document.getElementById("caption-1").style.marginTop=height*0.12+'px';


var titre = "100 ans de Fête nationale à travers les unes du Devoir"
var sous_titre = "De fête religieuse à fête politique, la « St-Jean » marque une date importante pour la province depuis le 19e siècle. Nous avons fouillé dans nos archives pour vous faire revivre la Fête nationale du Québec depuis plus d'un siècle."
var lien = "";
document.getElementById("lienfb").href='javascript:openfb( "https://www.facebook.com/dialog/feed?app_id=256172254741882&link='+ window.location.href+'&title='+titre+'&description='+sous_titre+'&redirect_uri=http://ledevoir.com&picture='+lien+'" )';
document.getElementById("lientw").href='javascript:openfb( "https://twitter.com/intent/tweet?url='+ window.location.href+'&text='+titre+' '+sous_titre+' @ledevoir&related=@ledevoir&counturl='+ window.location.href+'" )'


//Pour ouvrir la pop up de partage facebook ou twitter
function openfb(url) {
	window.open(url, 'sharer', 'top=0,left=0,toolbar=0,status=0,width=520,height=350');
}


function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
//Tableau des valeurs :
var data;
 
function load() {
    
    loadJSON("./Data/data.json", function(response) {
  
        var actual_JSON = JSON.parse(response);
		data = actual_JSON;
    });
}

load();

//Fonction reload
function reload() {
	$("#caption-1").animate({
						opacity: 0}, 200, function() {
				 document.getElementById('caption-1').innerHTML = "<span id='date'>Année "+data.UNES[compteur].year +"</span><br>"+data.UNES[compteur].text +"<br><br> Par "+data.UNES[compteur].author;
				 document.getElementById('caption-1').scrollTop=0;
				 $("#caption-1").animate({
						opacity: 1}, 500, function() {
				// Animation complete.
					});
					});
	  
	   
	$("#image").animate({
						opacity: 0}, 200, function() {
				var lien = "./Data/crop/"+data.UNES[compteur].year+"_crop.jpg"
				 document.getElementById('image').src=lien;
				 document.getElementById('href').href=lien;
				  adatationImage(lien);
				 $("#image").animate({
						opacity: 1}, 500, function() {
				// Animation complete.
					});
					});	
	
}

function adatationImage(url) {
	var img = new Image();
	img.onload = function() {
		var heightImage = this.height;
		var widthImage = this.width;
		var heightPrévu = ((heightImage*widthMaxImage)/widthImage);
		if (heightPrévu>(heightMax)) {
			document.getElementById('image').height = heightMax;
			document.getElementById('image').width = ((widthImage*heightMax)/heightImage);
		}
		else {
			document.getElementById('image').width = widthMaxImage;
			document.getElementById('image').height = ((heightImage*widthMaxImage)/widthImage);
		}
	}
	img.src = url;
}


function reloadPlus() {
	document.getElementById("flecheD").style.display="block";
	document.getElementById("slide-1").style.width=widthMaxImage+'px';
	document.getElementById("accueil").style.display="none";
	if (compteur < data.UNES.length-1) {
	   compteur +=1;
	   reload();
	}
	if (compteur==data.UNES.length-1) {
		document.getElementById("flecheD").style.display="none";
		document.getElementById("DL").style.display="block";
	}
	if (compteur==1) {
		document.getElementById("flecheG").style.display="block";
	}
}

function reloadMoins() {
	if (compteur >0) {
	   compteur -=1;
	   reload();   
	   }
	if (compteur==0) {
		document.getElementById("flecheG").style.display="none";
	}
	if (compteur==data.UNES.length-2) {
		document.getElementById("flecheD").style.display="block";
		document.getElementById("DL").style.display="none";
	}
}


//Fonction de navigation avec fleches
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
		reloadPlus();
	}   
   else if(key_code == "37")
   {	
		reloadMoins();
	}   
}
