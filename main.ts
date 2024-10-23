import { Serie } from './Serie.js';
import { series } from './data.js';

let seriesContainer: HTMLElement = document.getElementById('series')!;
const totalSeries: HTMLElement = document.getElementById("total-series")!;

renderSeriesAsCards(series);
totalSeries.innerHTML = `${promedioSeries(series)}`;

function renderSeriesAsCards(series: Serie[]): void {
  console.log('Rendering series as cards');
  series.forEach(serie => {
    // Create card element
    let cardElement = document.createElement('div');
    cardElement.classList.add('card', 'mb-3');
    cardElement.style.width = '18rem';
    
    // Card content
    cardElement.innerHTML = `
      <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.url}" target="_blank" class="card-link">${serie.url}</a>
      </div>
    `;
    
    // Append the card to the container
    seriesContainer.appendChild(cardElement);
  });
}

function promedioSeries(series: Serie[]): number {
  let totalSeasons: number = 0;
  series.forEach((serie) => totalSeasons += serie.seasons);
  return totalSeasons / series.length;
}
