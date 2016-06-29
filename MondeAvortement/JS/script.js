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
	var couleur = ['#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'];
    var paletteScale = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,7])
            .range(couleur); // COLOR degradé
    // fill dataset in appropriate format
    series.forEach(function(item){ //
        // item example value ["USA", 70]
        var iso = item.Abréviation,
                value = item.Total,
				nomfrancais = item.nomFR,
				valeurXO = "Avortement autorisé :<br>";
		if (item.FemmeVie=="X") {
			valeurXO += "&nbsp;&nbsp;&#149; Pour sauver la vie de la femme <br>";
		}
		if (item.FemmePhy=="X") {
			valeurXO += "&nbsp;&nbsp&#149; Pour préserver la santé physique de la femme <br>";
		}
		if (item.FemmeMen=="X") {
			valeurXO += "&nbsp;&nbsp&#149; Pour préserver la santé mentale de la femme <br>";
		}
		if (item.Viol=="X") {
			valeurXO += "&nbsp;&nbsp&#149; En cas de viol ou d'inceste <br>";
		}
		if (item.Malformation=="X") {
			valeurXO += "&nbsp;&nbsp&#149; En cas de malformation foetale <br>";
		}
		if (item.Economique=="X") {
			valeurXO += "&nbsp;&nbsp&#149; Pour des raisons économiques ou sociales <br>";
		}
		if (item.Demande=="X") {
			valeurXO += "&nbsp;&nbsp&#149; Sur demande <br>";
		}
		if (valeurXO=="Avortement autorisé :<br>") {
			valeurXO="Avortement interdit"
		}
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
					"<br>",
                    '<br>', data.numberOfThings,
                    '</div>'].join('');
            }
        }
    });
	var width = 800;
	var height = 70;
	var svg = d3.select("#container2").append("svg")
				.attr("viewBox", [
					0,
					0,
					width,
					height
				].join(" ")); 

var group = svg.append("g")
				.attr("transform", "translate("+width/2+",0)");
				
var gradient = svg.append("defs")
  .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("spreadMethod", "pad");

gradient.selectAll("stop")
	.data(couleur)
	.enter()
	.append("stop")
    .attr("offset", function(d,i) {return i*(100/couleur.length)+"%";})
    .attr("stop-color", function(d) {return d;})
    .attr("stop-opacity", 1);
	

group.append("rect")
    .attr("width", 20*couleur.length)
    .attr("height", 20)
	.attr("x",20)
	.attr("y",30)
    .style("fill", "url(#gradient)");	
				
/*var legend = group.selectAll('rect')
				.data(couleur)
				.enter()
				.append('rect')
				.attr("x",function(d,i) {
					return 20+i*20;
				})
				.attr("y", 30)
				.attr("width",20)
				.attr("height",20)
				.style("stroke","#8f8f8f")
				.style("fill",function(d,i) {
					return d;
				});*/
				
				
				
group.append("text")
	.attr("x",-70)
	.attr("y",15)
	.text("Nombre d'aspects de l'avortement autorisés par pays")
	.style("fill","#8f8f8f");
	
group.append("text")
	.attr("x",15)
	.attr("y",45)
	.attr("text-anchor","end")
	.text("0")
	.style("fill","#8f8f8f");
	
group.append("text")
	.attr("x",25+20*couleur.length)
	.attr("y",45)
	.text("7")
	.style("fill","#8f8f8f");
	
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