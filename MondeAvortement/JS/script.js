var public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1wZA5HIxCj2jSzjjuKl-hs6gy04UFZY-SQyiofgiAGvc/pubhtml";

function drawChart(data) {

var series = data;

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
    var paletteScale = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,7])
            .range(['#fcfbfd','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d']); // COLOR degradé
    // fill dataset in appropriate format
    series.forEach(function(item){ //
        // item example value ["USA", 70]
        var iso = item.Abréviation,
                value = item.Total,
				nomfrancais = item.nomFR
				valeurXO = item.FemmeVie +" | "+ item.FemmePhy +" | "+ item.FemmeMen +" | "+ item.Viol +" | "+ item.Malformation +" | "+ item.Economique +" | "+ item.Demande;
        dataset[iso] = { numberOfThings: valeurXO, fillColor: paletteScale(value), nomFR: nomfrancais };
    });
    // render map
    new Datamap({
        element: document.getElementById('container'),
		responsive : true,
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: { defaultFill: '#FFFFFF' },
        data: dataset,
        geographyConfig: {
            borderColor: '#DEDEDE',
            highlightBorderWidth: 1,
            // don't change color on mouse hover
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#FFFFFF';
            },
            // only change border
            highlightBorderColor: function(geo) {
                return '#B7B7B7';
            },
            // show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) { return ; }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', data.nomFR, '</strong>',
					"<br> Aspect de la loi sur l'avortement :",
                    '<br><strong>', data.numberOfThings, '</strong>',
                    '</div>'].join('');
            }
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