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
		.html(function(d) {
			return '<TABLE><TR><TD><p class="flotte"><img src="' + d.image + '" style="width:80px;" > </p></TD><TD><p> <b>' + d.Nom + '</b> <br /> <i>' + d.Fonction + '</i><br />'+ d.Explication +'</p></TD></TR></TABLE> ' ;
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