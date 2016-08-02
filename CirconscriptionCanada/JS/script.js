var public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1s1PdQuDz-hlJBzIz5DKegN51vw-IolOEGr1aU9xD1zc/pubhtml?gid=96113923&single=true";

var series;
function drawChart(data) {

series = data;

    // Datamaps expect data in format:
    var dataset = {};
    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max series-value)
    var onlyValues = series.map(function(obj){ return obj.Total; });
    var minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);
    // create color palette function
    // color can be whatever you wish
	var couleur = ['#ece7f2','#023858'];
    var paletteScale = d3.scale.linear()
            .domain([0,100])
            .range(couleur); // COLOR degradé
    // fill dataset in appropriate format
    series.forEach(function(item){ //
        // item example value ["USA", 70]
		if (item.Partit == "NPD-Nouveau Parti démocratique") {
        var iso = item.Circonscription,
                value = item.VotesPourcent,
				nom = item.Name,
				valeurXO = "Vote NPD : " + value +"%";
        dataset[iso] = { numberOfThings: valeurXO, fillColor: paletteScale(value), nomFR: nom };
		}
    });
	
    // render map
     var map = new Datamap({
        element: document.getElementById('container'),
		responsive : true,
        geographyConfig: {
            dataUrl: './JS/afghan.json'
        },
        scope: 'afghan',
        setProjection: function(element, options) {
			var projection = d3.geo.mercator()
				.center([66.166667, 34.4444])
				.scale(2200)
				.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			   var path = d3.geo.path().projection(projection);
			   return {path: path, projection: projection};
        }
    });
	
	
};





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