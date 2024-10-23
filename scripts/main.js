import { series } from './data.js';
// Elementos HTML donde se desplegarán las series y el total de temporadas
var seriesTbody = document.getElementById('series');
var totalSeries = document.getElementById("total-series");
// Elementos HTML donde se mostrarán los detalles de la serie seleccionada
var serieTitle = document.getElementById('serie-title');
var serieImage = document.getElementById('serie-image');
var serieDescription = document.getElementById('serie-description');
var serieChannel = document.getElementById('serie-channel');
// Renderizamos las series en la tabla
renderCoursesInTable(series);
// Mostramos el promedio de temporadas
totalSeries.innerHTML = "".concat(promedioSeries(series));
// Función para renderizar las series en la tabla
function renderCoursesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        // Quitamos el onclick del HTML, solo ponemos un identificador en cada fila
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td><a href=\"#\" class=\"serie-link\" data-id=\"").concat(serie.id, "\">").concat(serie.name, "</a></td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
    // Ahora asignamos los eventos de clic a los enlaces después de que se han creado
    var links = document.querySelectorAll('.serie-link');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Para evitar el comportamiento predeterminado del enlace
            var target = event.target;
            var serieId = target.getAttribute('data-id');
            if (serieId) {
                showDetail(parseInt(serieId));
            }
        });
    });
}
// Función para mostrar los detalles de la serie seleccionada
function showDetail(id) {
    var selectedSerie = series.find(function (serie) { return serie.id === id; });
    if (selectedSerie) {
        // Actualizamos los detalles de la serie
        serieTitle.innerText = selectedSerie.name;
        serieImage.src = selectedSerie.image;
        serieDescription.innerText = selectedSerie.description;
        serieChannel.innerHTML = "<a href=\"".concat(selectedSerie.url, "\" target=\"_blank\">").concat(selectedSerie.channel, "</a>");
    }
}
// Función para calcular el promedio de temporadas
function promedioSeries(series) {
    var totalSeasons = 0;
    series.forEach(function (serie) { return totalSeasons += serie.seasons; });
    return totalSeasons / series.length;
}
// Asignamos la función `showDetail` al objeto global `window` para que sea accesible si es necesario
window.showDetail = showDetail;
