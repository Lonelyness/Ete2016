var width = document.documentElement.clientWidth*0.8,
    height = 1000;

//Récupération des candidats par année avec leur age sur un google sheet			
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/16hcaoiUAwm_ANY3G-mjkV2dherVcaqGcoDyhL0oeFtQ/pubhtml';

function drawChart(data) {
	d3.select("body").selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.attr('id',function(d) {
			return d.id;
		})
		.style('height', "80px")
		.html(function(d) {
			return '<p class="flotte"><img src="' + d.image + '" style="width:60px;" > </p><p> <br /> <b>' + d.Nom + '</b> <br /> <i>' + d.Fonction + '</i><br />'+ d.Explication +'</p>' ;
		})
};

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