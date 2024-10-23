import { Serie } from './Serie.js';
import { series } from './data.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const totalSeries: HTMLElement = document.getElementById("total-series")!;

const serieTitle: HTMLElement = document.getElementById('serie-title')!;
const serieImage: HTMLImageElement = document.getElementById('serie-image') as HTMLImageElement;
const serieDescription: HTMLElement = document.getElementById('serie-description')!;
const serieChannel: HTMLElement = document.getElementById('serie-channel')!;

renderCoursesInTable(series);

totalSeries.innerHTML = `${promedioSeries(series)}`;

declare global {
  interface Window {
    showDetail: (id: number) => void;
    closeModal: () => void;
  }
}

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

  let links = document.querySelectorAll('.serie-link');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const target = event.target as HTMLElement;
      const serieId = target.getAttribute('data-id');
      if (serieId) {
        showDetail(parseInt(serieId));
      }
    });
  });
}

function showDetail(id: number): void {
  const selectedSerie = series.find(serie => serie.id === id);
  if (selectedSerie) {
    // Mostrar título, imagen y descripción
    serieTitle.innerText = selectedSerie.name;
    serieImage.src = selectedSerie.image;
    serieDescription.innerText = selectedSerie.description;
    
    // Mostrar el canal como enlace si la URL está disponible
    if (selectedSerie.url) {
      serieChannel.innerHTML = `<a href="${selectedSerie.url}" target="_blank">${selectedSerie.channel}</a>`;
    } else {
      serieChannel.innerText = selectedSerie.channel;
    }

    // Mostrar el modal
    const modal = document.getElementById('serie-detail')!;
    modal.style.display = 'block';
  }
}

function closeModal(): void {
  const modal = document.getElementById('serie-detail')!;
  modal.style.display = 'none';
}

function promedioSeries(series: Serie[]): number {
  let totalSeasons: number = 0;
  series.forEach((serie) => totalSeasons += serie.seasons);
  return totalSeasons / series.length;
}

window.showDetail = showDetail;
window.closeModal = closeModal;
