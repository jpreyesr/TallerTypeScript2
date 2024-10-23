import { series } from './data.js';
var seriesContainer = document.getElementById('series');
var totalSeries = document.getElementById("total-series");
renderSeriesAsCards(series);
totalSeries.innerHTML = "".concat(promedioSeries(series));
function renderSeriesAsCards(series) {
    console.log('Rendering series as cards');
    series.forEach(function (serie) {
        // Create card element
        var cardElement = document.createElement('div');
        cardElement.classList.add('card', 'mb-3');
        cardElement.style.width = '18rem';
        // Card content
        cardElement.innerHTML = "\n      <img src=\"".concat(serie.image, "\" class=\"card-img-top\" alt=\"").concat(serie.name, "\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\">").concat(serie.name, "</h5>\n        <p class=\"card-text\">").concat(serie.description, "</p>\n        <a href=\"").concat(serie.url, "\" target=\"_blank\" class=\"card-link\">").concat(serie.url, "</a>\n      </div>\n    ");
        // Append the card to the container
        seriesContainer.appendChild(cardElement);
    });
}
function promedioSeries(series) {
    var totalSeasons = 0;
    series.forEach(function (serie) { return totalSeasons += serie.seasons; });
    return totalSeasons / series.length;
}
