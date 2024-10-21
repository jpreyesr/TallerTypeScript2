import { Serie } from './Serie.js';
import { series } from './data.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const totalSeries: HTMLElement = document.getElementById("total-series")!;

renderCoursesInTable(series);

totalSeries.innerHTML = `${promedioSeries(series)}`;

function renderCoursesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });

  // Agregar event listeners a los links de las series
  document.querySelectorAll('.serie-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const serieId = (event.target as HTMLElement).getAttribute('data-id');
      const selectedSerie = series.find(s => s.id == Number(serieId));
      if (selectedSerie) {
        showSerieDetail(selectedSerie);
      }
    });
  });
}

function promedioSeries(series: Serie[]): number {
  let promedio: number = 0;
  series.forEach((serie) => promedio += serie.seasons);
  return promedio / series.length;
}

function showSerieDetail(serie: Serie): void {
  const serieDetail = document.getElementById("serie-detail")!;
  
  serieDetail.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.url}" class="btn btn-primary" target="_blank">More info</a>
      </div>
    </div>
  `;
}
