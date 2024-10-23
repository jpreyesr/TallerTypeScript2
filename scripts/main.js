import { series } from './data.js';
var seriesTbody = document.getElementById('series');
var totalSeries = document.getElementById("total-series");
var serieTitle = document.getElementById('serie-title');
var serieImage = document.getElementById('serie-image');
var serieDescription = document.getElementById('serie-description');
var serieChannel = document.getElementById('serie-channel');
renderCoursesInTable(series);
totalSeries.innerHTML = "".concat(promedioSeries(series));
function renderCoursesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td><a href=\"#\" class=\"serie-link\" data-id=\"").concat(serie.id, "\">").concat(serie.name, "</a></td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
    var links = document.querySelectorAll('.serie-link');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var target = event.target;
            var serieId = target.getAttribute('data-id');
            if (serieId) {
                showDetail(parseInt(serieId));
            }
        });
    });
}
function showDetail(id) {
    var selectedSerie = series.find(function (serie) { return serie.id === id; });
    if (selectedSerie) {
        serieTitle.innerText = selectedSerie.name;
        serieImage.src = selectedSerie.image;
        serieDescription.innerText = selectedSerie.description;
        serieChannel.innerText = selectedSerie.url; // Now it just shows the URL as plain text
        var modal = document.getElementById('serie-detail');
        modal.style.display = 'block';
    }
}
function closeModal() {
    var modal = document.getElementById('serie-detail');
    modal.style.display = 'none';
}
function promedioSeries(series) {
    var totalSeasons = 0;
    series.forEach(function (serie) { return totalSeasons += serie.seasons; });
    return totalSeasons / series.length;
}
window.showDetail = showDetail;
window.closeModal = closeModal;
