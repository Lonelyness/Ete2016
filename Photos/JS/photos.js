var width = window.innerWidth;

var taillePhoto = 72;
if (width<=800) {
	taillePhoto=100;}

	
document.getElementById('lienfb').href="https://www.facebook.com/sharer/sharer.php?u=" + window.location.href ;

function popupfb() { window.open('https://www.facebook.com/sharer/sharer.php?u="+ window.location.href+"','Partage Facebook','width=600,height=400');}

//Récupération des candidats par année avec leur age sur un google sheet			
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1tiCIvMgUxYddYsYNcXRMo2eW_orVxdoTcRrV7G7zSRg/pubhtml';

function drawChart(data) {
	
	var group = d3.select("body").append("g");
	
	group.selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.attr('id',function(d) {
			return d.id;
		})
		.html(function(d) {
			return '<div class="divPhoto"><img src="' + d.lien + '" style="width:'+ taillePhoto + '%; " > <p>' + d.description + '<i> ' + d.artiste + '</i>' ;
		})
		.style("margin-top", "28px" );
		
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
	console.log(key_code);
   if(key_code == "37")
   {
	   window.location.href="#2";
	}   
   else if(key_code == "39")
   {
	   window.location.href="#4";
	}   
}




