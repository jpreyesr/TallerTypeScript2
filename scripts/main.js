import { series } from './data.js';
var seriesTbody = document.getElementById('series');
var totalSeries = document.getElementById("total-series");
renderCoursesInTable(series);
totalSeries.innerHTML = "".concat(promedioSeries(series));
function renderCoursesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td>").concat(serie.name, "</td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
}
function promedioSeries(series) {
    var promedio = 0;
    series.forEach(function (serie) { return promedio = promedio + serie.seasons; });
    return promedio;
}
