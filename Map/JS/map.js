//Code brouillon
var poly=1;
var ligne=1;
var valeur=0;
var polygon = [];
var ligneTab = [];
var elements = [];
var markers = [];
var markersAffichables = [];
var encours=false;
var drag =false;
var coordonnees;
var actMap=0;
var size;
var tempsizeW;
var tempsizeH;

function actionMap(id) {
	var temp=id;
	
	if (temp=="navig") {actMap=0;}
	if (temp=="marker") {actMap=1;}
	if (temp=="aire") {actMap=2;}
	if (temp=="ligne") {actMap=3;}
}
 
//Pour garder ma clé mapbox 
//L.mapbox.accessToken = 'pk.eyJ1IjoiYXVkZWxhZGVzbWVyczY3IiwiYSI6ImNpb2FoMmV0NjAza3d2NGtxbjZ3MzQ3eXIifQ.hPhQrDZDF-SbfyMD9Wzy4w';
var w = window.innerWidth;
var h = window.innerHeight;
var m = Math.min(w, h-200)*0.95;
document.getElementById('map').style.width = m+"px";
document.getElementById('map').style.height = m+"px";
size = "width: "+m+"px"+";height: "+m+"px"+";"
document.getElementById('choix').style.width = m+"px";

L_PREFER_CANVAS = true;
//Création de la map Leaflet
var map = L.map('map')
    .setView([45.504629, -73.55686], 11);
//Indication de comment l'afficher
// API : Capitale : https://api.mapbox.com/styles/v1/fdaudens/cir51xxpx000ybxnjy79ggecw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmRhdWRlbnMiLCJhIjoicUtCOGRFSSJ9.JV9UlZPShWdgvloqqcVaqg 
// API : Proche : https://api.mapbox.com/styles/v1/fdaudens/cipsrn0zv0000brm7esi81vm6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmRhdWRlbnMiLCJhIjoicUtCOGRFSSJ9.JV9UlZPShWdgvloqqcVaqg

var CapitaleTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/fdaudens/cir51xxpx000ybxnjy79ggecw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmRhdWRlbnMiLCJhIjoicUtCOGRFSSJ9.JV9UlZPShWdgvloqqcVaqg', {
	attribution: 'Map by <a href="http://www.ledevoir.com">Le Devoir</a>',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

var ProcheTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/fdaudens/cipsrn0zv0000brm7esi81vm6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmRhdWRlbnMiLCJhIjoicUtCOGRFSSJ9.JV9UlZPShWdgvloqqcVaqg', {
	attribution: 'Map by <a href="http://www.ledevoir.com">Le Devoir</a>',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


var baseMaps = {
	"Capitale": CapitaleTileLayer,
	"Proche": ProcheTileLayer
};

map.addControl(new L.Control.Layers(baseMaps, {}));


//new OSMBuildings(map).load();

//Event au click sur la map
 map.on('click', function(e) {
if (!drag) {	 
	if (actMap==1)
    placeMarkerAndPanTo(e.latlng.lat,e.latlng.lng , map);
	if (actMap==2)
    placeAire(e.latlng, map);
	if (actMap==3)
    placeLigne(e.latlng, map);
}});
 
 //Fonction de clear 
 function clearMap() {
	polygon = [];
	ligneTab = [];
	markers = [];
	markersAffichables = [];
	poly=1;
	ligne=1;
	elements = [];
    $.each(map._layers, function (ml) {
        if (ml!=35) {
            map.removeLayer(map._layers[ml]);
        }
    })
}

 function finPolygon() {
	elements.push(poly);
	polygon = [];
	poly=1;
}
 function finLigne() {
	elements.push(ligne); 
	ligneTab = [];
	ligne=1;
}

 function dimMap(id){
	if (id=="carre") {
		document.getElementById('map').style.width = m+"px";
		document.getElementById('map').style.height = m+"px";
		size = "width: "+m+"px"+";height: "+m+"px"+";" 
		map.invalidateSize();
	}	
	if (id=="colonne") {
		document.getElementById('map').style.width = 300 +"px";
		document.getElementById('map').style.height = m+"px";
		size = "width: "+300+"px"+";height: "+m+"px"+";"
		map.invalidateSize();		
		
	}	
	if (id=="large") {
		document.getElementById('map').style.width = m+"px";
		document.getElementById('map').style.height = 300+"px";
		size = "width: "+m+"px"+";height: "+300+"px"+";"
		map.invalidateSize();
	}
	if (id=="reboot1") {
		tempsizeW = document.getElementById('map').style.width;
		tempsizeH = document.getElementById('map').style.height;
		console.log(tempsizeW);
		document.getElementById('map').style.width = 0+"px";
		document.getElementById('map').style.height = 0+"px";
		size = "width: "+0+"px"+";height: "+0+"px"+";"
		map.invalidateSize();
	}
	if (id=="reboot2") {
		document.getElementById('map').style.width = tempsizeW;
		document.getElementById('map').style.height = tempsizeH;
		size = "width: "+tempsizeW+"px"+";height: "+tempsizeH+"px"+";"
		map.invalidateSize();
	}
 };
 
var myIcon = L.icon({
    iconUrl: './Icones/map-marker.svg',
    iconSize: [25, 25]
    });
	
var myIconTemp = L.icon({
    iconUrl: './Icones/map-marker-sun.svg',
    iconSize: [7, 7]
    });
 
 
//Placer aire sur la map
function placeAire(latlng, map){
	if (ligne!= 1) 
		finLigne();
	if (poly != 1) {
		map.removeLayer(poly);
		marker.closePopup();
		marker.unbindPopup();
	}
	polygon.push(L.latLng(latlng.lat, latlng.lng));
	poly = L.polygon(polygon, {color: '#AEE7EF', fillColor: '#AEE7EF'}).addTo(map);
	poly.bindPopup("<input type='image' src='./Icones/Recommencer.png' width='15px' class='button delete-buttonPolygon'/>");
	poly.on("popupopen", onPopupOpen);
	marker = L.marker([latlng.lat, latlng.lng], {icon: myIconTemp, draggable:true}).addTo(map)
		.bindPopup(function() {
			var temp="<input type='image' src='./Icones/Recommencer.png' width='15px' class='button retirerAire'/>";
			if (poly != 1) 
				temp += "<br><input type='image' src='./Icones/Valider.png' width='15px' class='button finPolygon'/>";
		return temp; });
	marker.on("popupopen", onPopupOpen);
	marker.on("dragstart", onDragStart);
	marker.on("dragend", onDragEnd);
	marker.on("drag", onDrag);
	marker.openPopup();
	markers.push(marker);
};
//Placer ligne sur la map
function placeLigne(latlng, map){
	if (poly!=1) 
		finPolygon();
	if (ligne != 1) {
		map.removeLayer(ligne);
		marker.closePopup();
		marker.unbindPopup();
	}
	ligneTab.push(L.latLng(latlng.lat, latlng.lng));
	ligne = L.polyline(ligneTab, {color: '#AEE7EF'}).addTo(map);
	ligne.bindPopup("<input type='image' src='./Icones/Recommencer.png' width='15px' class='button delete-buttonLigne'/>");
	ligne.on("popupopen", onPopupOpen);
	marker = L.marker([latlng.lat, latlng.lng], {icon: myIconTemp, draggable:true}).addTo(map)
		.bindPopup(function() {
			var temp="<input type='image' src='./Icones/Recommencer.png' width='15px' class='button retirerLigne'/>";
			if (ligne != 1) 
				temp += "<br><input type='image' src='./Icones/Valider.png' width='15px' class='button finLigne'/>";
		return temp; });
	marker.on("popupopen", onPopupOpen);
	marker.on("dragstart", onDragStart);
	marker.on("dragend", onDragEnd);
	marker.on("drag", onDrag);
	marker.openPopup();
	markers.push(marker);
};

//Pour mémoriser la position intitiale du marqueur et démmarer le drag
function onDragStart() {
	drag = true;
	var tempMarker = this;
	coordonnees = tempMarker.getLatLng();
}
//Pour 
function onDragEnd() {
	var tempMarker = this;
	deplacement(tempMarker);
	setTimeout(function() {drag = false;}, 100);
}
// Si possible glisser la figure pendant le drag
function onDrag() {
	var tempMarker = this;
	deplacement(tempMarker);
	coordonnees = tempMarker.getLatLng();
}
//
function deplacement(tempMarker) {
	var element;
	var coor;
	var indexi=-1;
	var indexj=-1;
	var b = false;
	var ajout = false;
	var ajoutT= 0;
	if (poly!=1) {
		elements.push(poly);
		ajout = true;
		ajoutT=0;}
	if (ligne!=1) {
		elements.push(ligne);
		ajout = true;
		ajoutT=1;}
	// Chercher dans quelle figure est le marqueur en fonction de ces coordonnées initiales
	for (i=0 ; i < elements.length ; i++) {
		element = elements[i];
		coor = element.getLatLngs();
		if (coor.length<=1) {
			coor = coor[0];
		}
		for (j=0 ; j < coor.length ; j++) {
			if ((coor[j].lat==coordonnees.lat)&&(coor[j].lng==coordonnees.lng)) {
				indexi = i;
				indexj = j;
				b=true;
				break;
			}
			if (b) break;
		}
	}
	// Effacer la figure
	element = elements[indexi];
	coor = element.getLatLngs();
	if (coor.length<=1) {
		coor = coor[0];
		coor[indexj] = tempMarker.getLatLng();
		elements[indexi].setLatLngs(coor);
		elements[indexi].redraw();
	}
	else {
		coor[indexj] = tempMarker.getLatLng();
		elements[indexi].setLatLngs(coor);
		elements[indexi].redraw();
	}
	if (ajout) {
		elements.pop();
			if (ajoutT==0) {
				polygon[indexj] = tempMarker.getLatLng();
			}
			else {
				ligneTab[indexj] = tempMarker.getLatLng();
			}
	}
	
}
 //Placer marqueur sur la map
 function placeMarkerAndPanTo(lat , lng, map) {
	marker = L.marker([lat, lng],{draggable:true}).addTo(map);
	marker.nomen="";
	marker.nomenPlacement=0;
	marker.couleur=2;
	marker.bindPopup(function(d) { marker = d;
	var selected = d.nomenPlacement;
	var selected2 = d.couleur;	
	var temp = "Nomenclature : <input type = 'text' class='nomen' value='"+ d.nomen +"' id = 'nomen''/>";
	temp += "<FORM><SELECT id='placement' size='1'><OPTION "+ ((selected == 0) ? "SELECTED" : "") +">Haut<OPTION "+ ((selected == 1) ? "SELECTED" : "") +">Bas<OPTION "+ ((selected == 2) ? "SELECTED" : "") +">Gauche<OPTION "+ ((selected == 3) ? "SELECTED" : "") +">Droite</SELECT></FORM>";
	temp += "<form role='form'><div><input type='radio' name='cor' id='cor1' value='#f4aa59' "+ ((selected2 == 1) ? "checked='true'" : "") +"/><label for='cor1' class='cor1'></label><input type='radio' name='cor' id='cor2' value='#4c7d95' "+ ((selected2 == 2) ? "checked='true'" : "") +"/><label for='cor2' class='cor2'></label><input type='radio' name='cor' id='cor3' value='#00b2cd' "+ ((selected2 == 3) ? "checked='true'" : "") +"/><label for='cor3' class='cor3'></label><input type='radio' name='cor' id='cor4' value='#333' "+ ((selected2 == 4) ? "checked='true'" : "") +"/><label for='cor4' class='cor4'></label><input type='radio' name='cor' id='cor5' value='white' "+ ((selected2 == 5) ? "checked='true'" : "") +"/><label for='cor5' class='cor5'></label></div></form>";
	temp += "<input type='image' src='./Icones/Valider.png' width='20px' class='valNomen' onclick='enregistrement()'/>";
	temp += "<input type='image' src='./Icones/Recommencer.png' width='20px' class='button delete-button'/>";
	return temp;});  
	marker.on("popupopen", onPopupOpen);
	markers.push(marker);
	markersAffichables.push(marker);
	map.panTo(L.latLng(lat,lng));
};

function enregistrement() {
	var value = document.getElementById('nomen').value;
	var valueP = document.getElementById('placement').selectedIndex;
	var valueC = 0;//document.getElementById('couleur').selectedIndex;
	if (document.getElementById('cor1').checked==true) {
		valueC=1;
	}
	if (document.getElementById('cor2').checked==true) {
		valueC=2;
	}
	if (document.getElementById('cor3').checked==true) {
		valueC=3;
	}
	if (document.getElementById('cor4').checked==true) {
		valueC=4;
	}
	if (document.getElementById('cor5').checked==true) {
		valueC=5;
	}
	marker.nomen=value;
	marker.nomenPlacement=valueP;
	marker.couleur=valueC;
	marker.closePopup();
}

function onPopupOpen() {
    var temp = this;
    // To remove marker on click of delete button in the popup of marker
    $(".delete-button:visible").click(function () {
        map.removeLayer(temp);
		var index = markersAffichables.indexOf(temp);
		if (index > -1) {
			markersAffichables.splice(index, 1);
		}
    });
	$(".delete-buttonLigne:visible").click(function () {
		tab = temp.getLatLngs();
		for (i=0 ; i < tab.length ; i++) {
			element = tab[i];
			for (j=0 ; j < markers.length ; j++) {
				mark = markers[j].getLatLng();
				if ((mark.lat==element.lat)&&(mark.lng==element.lng)) {
					map.removeLayer(markers[j]);
				}	
			}
		}
		map.removeLayer(temp);
		var index = elements.indexOf(temp);
		if (index > -1) {
			elements.splice(index, 1);
		}
    });
	$(".delete-buttonPolygon:visible").click(function () {
		tab = temp.getLatLngs()[0];
		for (i=0 ; i < tab.length ; i++) {
			element = tab[i];
			for (j=0 ; j < markers.length ; j++) {
				mark = markers[j].getLatLng();
				if ((mark.lat==element.lat)&&(mark.lng==element.lng)) {
					map.removeLayer(markers[j]);
				}	
			}
		}	
        map.removeLayer(temp);
		var index = elements.indexOf(temp);
		if (index > -1) {
			elements.splice(index, 1);
		}
    });
	$(".retirerLigne:visible").click(function () {
		
		map.removeLayer(temp);
	});
	$(".retirerAire:visible").click(function () {
        
		map.removeLayer(temp);
    });
	
	$(".finPolygon:visible").click(function () {
        finPolygon();
		temp.closePopup();
		actMap=0;
    });
	$(".finLigne:visible").click(function () {
        finLigne();
		temp.closePopup();
		actMap=0;
    });
}
//Fonctions de recherche d'adresse
var markAdress = function(){ 
  var latlng = recherche();
  placeMarkerAndPanTo(latlng[0], latlng[1], map);
  var southWest = L.latLng(latlng[2], latlng[3]),
    northEast = L.latLng(latlng[4], latlng[5]),
  bounds = L.latLngBounds(southWest, northEast);
  map.fitBounds(bounds);
}
var searchAdress = function(){ 
  var latlng = recherche();
  var southWest = L.latLng(latlng[2], latlng[3]),
    northEast = L.latLng(latlng[4], latlng[5]),
  bounds = L.latLngBounds(southWest, northEast);
  map.fitBounds(bounds);
}


//Recherche de l'adresse et parseur
var recherche = function(){
	var adresse = document.getElementById('adresse').value;
	if (adresse=="")
		adresse="Montréal";
	var xml = httpGet('https://maps.googleapis.com/maps/api/geocode/json?address='+adresse+'&key=AIzaSyC95qiflxZ2XVSOypJpjAmZttSWZHEFx0A');
	//Récupération du centre pour le marqueur
	var endroit = xml.indexOf('"location"');
	var temp = xml.indexOf(':',endroit+13)+1;
	var temp2 = xml.indexOf(',',endroit);
	var lat = xml.substring(temp,temp2);
	var lng = xml.substring(xml.indexOf(':',temp2)+1,xml.indexOf('}',temp2+1));
	//Récupération des contours
	endroit = xml.indexOf('"northeast"');
	temp = xml.indexOf(':',endroit+13)+1;
	temp2 = xml.indexOf(',',endroit);
	lat1 = xml.substring(temp,temp2);
	lng1 = xml.substring(xml.indexOf(':',temp2)+1,xml.indexOf('}',temp2+1));
	endroit = xml.indexOf('"southwest"');
	temp = xml.indexOf(':',endroit+13)+1;
	temp2 = xml.indexOf(',',endroit);
	var lat2 = xml.substring(temp,temp2);
	var lng2 = xml.substring(xml.indexOf(':',temp2)+1,xml.indexOf('}',temp2+1));
	return [lat, lng , lat1, lng1, lat2, lng2];
}
//Fonction de récupération 
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function valider() {
	/*
	var container = document.getElementsByClassName('leaflet-tile-container');
	container = container[container.length-1];
        
	var images = container.getElementsByTagName('img');
	for (var i = 0; i < images.length; i++) {
		images[i].setAttribute('crossOrigin', 'anonymous');
		images[i].src = images[i].src;
	}
			
	var canvas  = document.getElementById('dumb');
	var context = canvas.getContext('2d');
	
	var container2 = document.getElementsByClassName('leaflet-map-pane');
	container2 = container2[0];
	var transp = container2.style.transform;
		console.log(trans);
		transp = transp.split("px");
	var xp = transp[0].split("(");
			xp = xp[xp.length-1];
	var yp = transp[1].slice(2,transp[1].length);
	console.log(xp);
	console.log(yp);
	
			
	canvas.width  = map.getSize().x;
	canvas.height = map.getSize().y;
			
	for (i = 0; i < images.length; i++) {
		if (typeof images[i] != 'undefined') {
			var trans = images[i].style.transform;
			console.log(trans);
			trans = trans.split("px");
			var x = trans[0].split("(");
			x = x[x.length-1];
			var y = trans[1].slice(2,trans[1].length);
			console.log(x);
			console.log(y);
			context.drawImage(images[i],
				xp+x, 
				yp+y,
				images[i].clientWidth,
				images[i].clientHeight
			);
		}
	}
	 
	//window.open(canvas.toDataURL());
	*/	
	
	
	
	document.getElementById('val').style.display="block";
	document.getElementById('map').style.display='none';
	
leafletImage(map, function(err, canvas) {
	
	
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x;
    img.height = dimensions.y;
    img.src = canvas.toDataURL();
	
	d3.select("#svg").remove();
	
	var svg = d3.select("#snapshot").append('svg').attr("id","svg");
	svg.attr("height",dimensions.y).attr("width",dimensions.x);
	
	var centre = map.getCenter();
	var bound = map.getBounds().getNorthWest();
	var alpha = (centre.lat - bound.lat)/(dimensions.y/2);
	var beta = (centre.lng - bound.lng)/(dimensions.x/2);
	
	
	svg.append("image")
		.attr("id","img2")
		.attr("type","image/svg+xml")
		.attr("xlink:href",img.src)
		.attr("height",dimensions.y)
		.attr("width",dimensions.x);
		
		
	// Pour les markers
	svg.selectAll('circle')
		.data(markersAffichables)
		.enter()
		.append("circle")
		.attr("cy", function(d) {
			return (dimensions.y/2) - (centre.lat-d.getLatLng().lat)/alpha;
		})
		.attr("cx", function(d) {
			return (dimensions.x/2) - (centre.lng-d.getLatLng().lng)/beta;
		})
		.attr("r",4)
		.style("fill",function(d) {
			if (d.couleur==1) {
				return "#f4aa59";
			}
			if (d.couleur==2) {
				return "#4c7d95";
			}
			if (d.couleur==3) {
				return "#00b2cd";
			}
			if (d.couleur==4) {
				return "#333";
			}
			if (d.couleur==5) {
				return "none";
			}			
			return "#4c7d95";
		})
			
		//Pour les Polygones
		var lineFunctionClosed = d3.svg.line()
			.y(function(d) { return (dimensions.y/2) - (centre.lat-d.lat)/alpha; })
			.x(function(d) { return (dimensions.x/2) - (centre.lng-d.lng)/beta; })
			.interpolate("linear-closed");
		var lineFunction = d3.svg.line()
			.y(function(d) { return (dimensions.y/2) - (centre.lat-d.lat)/alpha; })
			.x(function(d) { return (dimensions.x/2) - (centre.lng-d.lng)/beta; })
			.interpolate("linear");
	  
		svg.selectAll('path')
			.data(elements)
			.enter()
			.append("path")
			.attr("d", function(d) { if (d.getLatLngs().length==1 ) {return lineFunctionClosed(d.getLatLngs()[0]);}
			else return lineFunction(d.getLatLngs());
			})
			.attr("stroke", "#4c7d95")
			.attr("stroke-width", 2)
			.attr("fill", function(d) { if (d.getLatLngs().length==1 ) {return "#00b2cd";}
			else return "none";
			})
			.attr("opacity","0.3");
			
			
var hauteur = 20;
var decal = 15;			
		//Texte Markers
	var nodes = svg.selectAll('g')
		.data(markersAffichables)
		.enter()
		.append("g")
		.attr('class','text')
		.attr("transform", function(d) {
			var placement = d.nomenPlacement ;		
			var valeur = 0 ;
			if (placement==0) {
				valeur = -hauteur;
				}
			if (placement==1) {
				valeur = hauteur;
				}				
			var y = valeur + (dimensions.y/2) - (centre.lat-d.getLatLng().lat)/alpha;	
			var valeur = 0 ;
			if (placement==2) {
				valeur = -decal;
				}
			if (placement==3) {
				valeur = decal;
				}
			var x =  valeur + (dimensions.x/2) - (centre.lng-d.getLatLng().lng)/beta;
			
			return "translate("+ x +","+ y +")";
		});
	
	nodes.filter(function(d) {return (d.nomen!="")}).append("text") 
		.attr("text-anchor", "middle")
		.attr("dx", 0)
		.attr("dy", ".35em")
		.attr('text-anchor', function(d){
			var placement = d.nomenPlacement ;		
			var valeur = 'middle' ;
			if (placement==2) {
				valeur = 'end';
				}
			if (placement==3) {
				valeur = 'start';
				}
			return valeur ;
		})
		.text(function(d) {
			return d.nomen;
		})
		.style("fill", "white")
		.call(getTextBox);

var padding = 4;		
 
	nodes.filter(function(d) {return (d.nomen!="")}).insert("rect","text")
		.attr("x", function(d){return d.bbox.x - padding})
		.attr("y", function(d){return d.bbox.y - padding})
		.attr("width", function(d){return d.bbox.width + 2*padding})
		.attr("height", function(d){return d.bbox.height + 2*padding})
		.style("fill", "black")
		.style("opacity", 0.4);	

function getTextBox(selection) {
    selection.each(function(d) { d.bbox = this.getBBox(); })
}
	
	
	  
});

};

function validerPDF() {
	 //Get svg markup as string
	var svg = document.getElementById('snapshot').innerHTML;

	if (svg)
		svg = svg.replace(/\r?\n|\r/g, '').trim();

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');


	context.clearRect(0, 0, canvas.width, canvas.height);
	canvg(canvas, svg);


	var imgData = canvas.toDataURL('image/png');

	// Generate PDF
	var doc = new jsPDF('p', 'pt', 'a4');
	doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
	doc.save('carte.pdf');
}

function validerSVG() {
	    try {
        var isFileSaverSupported = !!new Blob();
    } catch (e) {
        alert("blob not supported");
    }

    var html = d3.select("#svg")
        .attr("title", "test2")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

    var blob = new Blob([html], {type: "image/svg+xml"});
    saveAs(blob, "carte.svg");
};
 

function fermer() {
	document.getElementById('val').style.display='none';
	document.getElementById('map').style.display='block';
	map.invalidateSize();
}


/* Fonction imcomplette de début d'exportation en Leaflet/HTML
function validerWeb() {	
//Variable de la carte
var centre = map.getCenter();
var zoom = map.getZoom();
var elementSring = "[";
markers.forEach( function(d) {
	var temp = "lat: "+ d.getLatLng().lat+",";
	temp += "lng: "+ d.getLatLng().lng +",";
	temp += "nomen: '"+ d.nomen +"'," ;
	temp += "nomenPlacement: "+ d.nomenPlacement +"," ;
	temp += "couleur: "+ d.couleur;
	elementSring =  elementSring + "{"+temp+ "}," ;
});
elementSring = elementSring.substring(0,elementSring.length-1);
elementSring = elementSring + "]";
	
var js = '<!DOCTYPE html><html><head><meta charset=utf-8 /><link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.css" /><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic" rel="stylesheet" type="text/css"><script src="https://api.tiles.mapbox.com/mapbox.js/v2.4.0/mapbox.js"></script><script src="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.js"></script><script type="text/javascript" src="https://d3js.org/d3.v3.js"></script><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js" charset="utf-8"></script><style>#map {'+size+'}</style></head>';

js = js + '<body><div id="map"> </div><script>var map = new L.Map("map", {center: ['+centre.lat+','+centre.lng+'], zoom: '+zoom+', dragging: false, zoomControl: false, scrollWheelZoom: false, doubleClickZoom : false,boxZoom: false, touchZoom: false}).addLayer(new L.TileLayer("https://api.mapbox.com/styles/v1/fdaudens/cipsrn0zv0000brm7esi81vm6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmRhdWRlbnMiLCJhIjoicUtCOGRFSSJ9.JV9UlZPShWdgvloqqcVaqg"));';//</script></body>';

js = js + 'var svg = d3.select(map.getPanes().overlayPane).append("svg"); var g = svg.append("g").attr("class", "leaflet-zoom-hide");function projectPoint(x, y) {var point = map.latLngToLayerPoint(new L.LatLng(y, x));this.stream.point(point.x, point.y);}';

js = js + 'var transform = d3.geo.transform({point: projectPoint}),path = d3.geo.path().projection(transform);var lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("linear");';
js = js + 'var projection = d3.geo.albers().center(['+centre.lat+','+centre.lng+']).scale('+zoom+');';

js = js + 'svg.selectAll("circle").data('+ elementSring +').enter().append("circle").attr("transform", function(d) {  var coord=L.Map.latLngToContainer(L.LatLng(d.lat,d.lng)); return "translate(" + coord[0] + "," + coord[1] + ")"; }).attr("r", 40).style("fill", "red");';

js = js + '</script></body>';
	


var file = new File([js], "resultat.html", {type: "text/plain;charset=utf-8"});
saveAs(file);
}*/