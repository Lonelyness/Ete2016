//Code brouillon
var poly=1;
var ligne=1;
var valeur=0;
var polygon = [];
var ligneTab = [];
var elements = [];
var encours=false;
 
//Pour garder ma clé mapbox 
//L.mapbox.accessToken = 'pk.eyJ1IjoiYXVkZWxhZGVzbWVyczY3IiwiYSI6ImNpb2FoMmV0NjAza3d2NGtxbjZ3MzQ3eXIifQ.hPhQrDZDF-SbfyMD9Wzy4w';
var w = window.innerWidth;
var h = window.innerHeight;

var m = Math.min(w, h-110)*0.95;
document.getElementById('map').style.width = m+"px";
document.getElementById('map').style.height = m+"px";
document.getElementById('choix').style.width = m+"px";

//Création de la map Leaflet
var map = L.map('map')
    .setView([45.504629, -73.55686], 11);
//Indication de comment l'afficher	
L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, Icon by <a href="http://simpleicon.com/">Simple Icon</a> &mdash; <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

//Event au click sur la map
 map.on('click', function(e) {
	if (document.getElementById('marker').checked==true)
    placeMarkerAndPanTo(e.latlng.lat,e.latlng.lng , map);
	if (document.getElementById('aire').checked==true)
    placeAire(e.latlng, map);
	if (document.getElementById('ligne').checked==true)
    placeLigne(e.latlng, map);
  });
 
 //Fonction de clear 
 function clearMap() {
	polygon = [];
	ligneTab = [];
	poly=1;
	ligne=1;
    $.each(map._layers, function (ml) {
        if (ml!=35) {
            map.removeLayer(map._layers[ml]);
        }
    })
}

 function fin() {
	polygon = [];
	ligneTab = [];
	poly=1;
	ligne=1;
}

 function dimMap(){
	if (document.getElementById('carre').checked==true) {
		document.getElementById('map').style.width = m+"px";
		document.getElementById('map').style.height = m+"px";
		map.invalidateSize()
	}	
	if (document.getElementById('colonne').checked==true) {
		document.getElementById('map').style.width = 300 +"px";
		document.getElementById('map').style.height = m+"px";
		map.invalidateSize()		
		
	}	
	if (document.getElementById('long').checked==true) {
		document.getElementById('map').style.width = m+"px";
		document.getElementById('map').style.height = 300+"px";
		map.invalidateSize()
	}
 };
 
var myIcon = L.icon({
    iconUrl: '../map-marker.svg',
    iconSize: [40, 50]
    });
	
var myIconTemp = L.icon({
    iconUrl: '../map-marker-sun.svg',
    iconSize: [5, 5]
    });
 
 
//Placer aire sur la map
function placeAire(latlng, map){
	if ([latlng.lat, latlng.lng]==polygon[0])
		polygon = [];
	else {
	if (poly != 1) {
		map.removeLayer(poly);
		marker.closePopup();
	}
	polygon.push([latlng.lat, latlng.lng]);
	poly = L.polygon(polygon, {color: '#1C1E7C', fillColor: '#1C1E7C'}).addTo(map);
	poly.bindPopup("<input type='button' value='Supprimer' class='button delete-button'/>");
	poly.on("popupopen", onPopupOpen);
	marker = L.marker([latlng.lat, latlng.lng], {icon: myIconTemp, draggable:true}).addTo(map)
		.bindPopup(function() {
			var temp="<input type='button' value='Retirer' class='button retirerAire'/>";
			if (poly != 1) 
				temp += "<br><input type='button' value='Fin' class='button fin'/>";
		return temp; });
	marker.on("popupopen", onPopupOpen);
	//marker.on("dragstart", onDragStart);
	//marker.on("drag", onDrag);
	marker.openPopup();
 }
};
//Placer ligne sur la map
function placeLigne(latlng, map){
	if (ligne != 1) {
		map.removeLayer(ligne);
		marker.closePopup();
	}
	ligneTab.push([latlng.lat, latlng.lng]);
	ligne = L.polyline(ligneTab, {color: '#1C1E7C'}).addTo(map);
	ligne.bindPopup("<input type='button' value='Supprimer' class='button delete-button'/>");
	ligne.on("popupopen", onPopupOpen);
	marker = L.marker([latlng.lat, latlng.lng], {icon: myIconTemp, draggable:true}).addTo(map)
		.bindPopup(function() {
			var temp="<input type='button' value='Retirer' class='button retirerLigne'/>";
			if (ligne != 1) 
				temp += "<br><input type='button' value='Fin' class='button fin'/>";
		return temp; });
	marker.on("popupopen", onPopupOpen);
	//marker.on("dragstart", onDragStart);
	//marker.on("drag", onDrag);
	marker.openPopup();
};
 //Placer marqueur sur la map
 function placeMarkerAndPanTo(lat , lng, map) {
	marker = L.marker([lat, lng],{icon: myIcon, draggable:true}).addTo(map)
				.bindPopup("<input type='button' value='Supprimer' class='button delete-button'/>");
	marker.on("popupopen", onPopupOpen);
	map.panTo(L.latLng(lat,lng));
};

function onPopupOpen() {
    var tempMarker = this;
    // To remove marker on click of delete button in the popup of marker
    $(".delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
	$(".retirerLigne:visible").click(function () {
        map.removeLayer(tempMarker);
		
    });
	$(".retirerAire:visible").click(function () {
        map.removeLayer(tempMarker);
    });
	
	$(".fin:visible").click(function () {
        fin();
		tempMarker.closePopup();
		document.getElementById('navig').checked=true;
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
	console.log(xml);
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