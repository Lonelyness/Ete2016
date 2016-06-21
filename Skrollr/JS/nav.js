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
var compteur = 0;	


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
var titre = "Les UNES de la Saint Jean"
var sous_titre = "L`analyse des Unes marquantes de la Saint Jean depuis 1900"
var lien = "";
document.getElementById('lienfb').href="javascript:openfb( 'https://www.facebook.com/dialog/feed?app_id=256172254741882&link="+ window.location.href+"&title="+titre+"&description="+sous_titre+"&redirect_uri=http://ledevoir.com&picture="+lien+"' )";
document.getElementById('lientw').href="javascript:openfb( 'https://twitter.com/intent/tweet?url="+ window.location.href+"&text="+titre+" "+sous_titre+" @ledevoir&related=@ledevoir&counturl="+ window.location.href+"' )"


//Pour ouvrir la pop up de partage facebook ou twitter
function openfb(url) {
	window.open(url, 'sharer', 'top=0,left=0,toolbar=0,status=0,width=520,height=350');
}

//Tableau des valeurs :

var data = [{urlUne:"./Une.jpg",transcrip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut odio pretium, venenatis augue eu, iaculis nibh. Phasellus scelerisque diam leo, a sagittis erat volutpat ac. Integer dignissim nisl sodales nisl aliquet, id vulputate ligula condimentum. Quisque molestie mollis orci in dapibus. Aliquam vel convallis nisi. Quisque et ultrices est, vel pulvinar mi. Integer id eros et elit viverra vestibulum. Donec id quam eu turpis fermentum sodales. In scelerisque arcu ac neque blandit laoreet. Vivamus tincidunt neque et leo bibendum efficitur. Nulla lacinia pharetra imperdiet. Aenean aliquet, nibh eu varius maximus, quam elit euismod mauris, non dapibus odio massa at felis. Ut ut ultrices tortor. Morbi placerat lacus odio, ac elementum sapien lobortis eget. Aenean tincidunt sed ante nec pellentesque. Praesent et convallis risus. In porttitor ligula consequat dui facilisis, in consequat justo dignissim. Nullam congue, est vitae dapibus pretium, ligula tortor porta erat, at imperdiet dolor ante id lacus. Curabitur eu bibendum dolor, at maximus ex. Etiam dictum nunc nibh, eu ornare ligula maximus sed. Vestibulum non tellus in mauris rutrum aliquet et at risus. Praesent vestibulum quis turpis eget venenatis. Aliquam tincidunt accumsan sem, in tempor enim. Phasellus at metus ac metus pretium fringilla. Nunc justo arcu, interdum nec faucibus et, laoreet sed ligula. Praesent iaculis consectetur tempor. Donec sagittis massa sed placerat consectetur. Ut convallis sagittis leo sit amet volutpat. Aenean vitae pulvinar libero. Nulla pharetra tellus eros, faucibus placerat ligula tempus ac. Vivamus ornare justo orci, eget dignissim erat laoreet quis. Aliquam in leo lectus. Morbi luctus elementum pretium. Vestibulum eget risus magna. Vivamus varius accumsan enim quis luctus. Curabitur auctor a dui at mattis. Quisque in venenatis felis. Sed tortor neque, convallis in lobortis ut, laoreet eget velit. Nam urna arcu, hendrerit in risus eget, tincidunt consequat lacus. Etiam id convallis diam, a pharetra elit. Etiam nisi dolor, facilisis at vehicula sed, dictum ac metus. Suspendisse hendrerit magna pellentesque ipsum ultrices blandit. Aenean ex nisl, gravida sit amet tincidunt vehicula, pellentesque eu mauris. In eget leo sed ex lobortis consequat. Suspendisse at neque quis nunc consectetur convallis tempor tempus velit. Integer sit amet elit non ante posuere ultrices. Fusce imperdiet eu leo quis feugiat. In convallis magna velit, quis dignissim enim ultricies at. Mauris congue rhoncus nibh sed aliquam. Cras mollis venenatis imperdiet. Duis egestas eros placerat, sagittis lorem sit amet, egestas ligula. Sed semper augue molestie cursus aliquet. Nunc posuere ex ut convallis facilisis. Fusce sodales mattis ullamcorper. Vestibulum convallis, nibh at commodo fermentum, felis lacus pretium dolor, a auctor sem orci maximus magna. Nullam porta vulputate est non mattis. Maecenas accumsan felis turpis, quis tristique arcu posuere at. Pellentesque a maximus erat. Sed interdum interdum nisi, vitae convallis velit vulputate eget. Sed velit neque, volutpat a neque nec, semper hendrerit sem. Nunc ipsum ipsum, fringilla sit amet dignissim nec, sagittis sit amet libero. Cras ante odio, interdum non pretium nec, venenatis in eros. Aenean pellentesque metus a purus elementum, eget vestibulum dui vestibulum. Integer sed gravida augue. Morbi commodo congue feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque dignissim lorem enim, vel tempor libero efficitur suscipit."}];
data.push({urlUne:"http://www.spiritualite-orthodoxe.net/images/saint_jean.gif",transcrip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut odio pretium, venenatis augue eu, iaculis nibh. Phasellus scelerisque diam leo, a sagittis erat volutpat ac. Integer dignissim nisl sodales nisl aliquet, id vulputate ligula condimentum. Quisque molestie mollis orci in dapibus. Aliquam vel convallis nisi. Quisque et ultrices est, vel pulvinar mi. Integer id eros et elit viverra vestibulum. Donec id quam eu turpis fermentum sodales. In scelerisque arcu ac neque blandit laoreet. Vivamus tincidunt neque et leo bibendum efficitur. Nulla lacinia pharetra imperdiet. Aenean aliquet, nibh eu varius maximus, quam elit euismod mauris, non dapibus odio massa at felis. Ut ut ultrices tortor. Morbi placerat lacus odio, ac elementum sapien lobortis eget. Aenean tincidunt sed ante nec pellentesque."});
data.push({urlUne:"http://storage.canalblog.com/29/15/249840/33724883.jpg",transcrip:"Praesent et convallis risus. In porttitor ligula consequat dui facilisis, in consequat justo dignissim. Nullam congue, est vitae dapibus pretium, ligula tortor porta erat, at imperdiet dolor ante id lacus. Curabitur eu bibendum dolor, at maximus ex. Etiam dictum nunc nibh, eu ornare ligula maximus sed. Vestibulum non tellus in mauris rutrum aliquet et at risus. Praesent vestibulum quis turpis eget venenatis. Aliquam tincidunt accumsan sem, in tempor enim. Phasellus at metus ac metus pretium fringilla. Nunc justo arcu, interdum nec faucibus et, laoreet sed ligula. Praesent iaculis consectetur tempor. Donec sagittis massa sed placerat consectetur. Ut convallis sagittis leo sit amet volutpat. Aenean vitae pulvinar libero."});


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
		if (compteur <data.length-1) {
	   compteur +=1;
	   document.getElementById('caption-1').innerHTML = data[compteur].transcrip;
		document.getElementById('image').src=data[compteur].urlUne;
		}
	}   
   else if(key_code == "37")
   {
	   if (compteur >0) {
	   compteur -=1;
		document.getElementById('caption-1').innerHTML = data[compteur].transcrip;
		document.getElementById('image').src=data[compteur].urlUne;
	   }
	}   
}
