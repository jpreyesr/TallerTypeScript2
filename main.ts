import { Serie } from './Serie.js';
import { series } from './data.js';

// Elementos HTML donde se desplegarán las series y el total de temporadas
let seriesTbody: HTMLElement = document.getElementById('series')!;
const totalSeries: HTMLElement = document.getElementById("total-series")!;

// Elementos HTML donde se mostrarán los detalles de la serie seleccionada
const serieTitle: HTMLElement = document.getElementById('serie-title')!;
const serieImage: HTMLImageElement = document.getElementById('serie-image') as HTMLImageElement;
const serieDescription: HTMLElement = document.getElementById('serie-description')!;
const serieChannel: HTMLElement = document.getElementById('serie-channel')!;

// Renderizamos las series en la tabla
renderCoursesInTable(series);

// Mostramos el promedio de temporadas
totalSeries.innerHTML = `${promedioSeries(series)}`;

// Declaramos que la función showDetail pertenece a window
declare global {
  interface Window {
    showDetail: (id: number) => void;
  }
}

// Función para renderizar las series en la tabla
function renderCoursesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    // Quitamos el onclick del HTML, solo ponemos un identificador en cada fila
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });

  // Ahora asignamos los eventos de clic a los enlaces después de que se han creado
  let links = document.querySelectorAll('.serie-link');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Para evitar el comportamiento predeterminado del enlace
      const target = event.target as HTMLElement;
      const serieId = target.getAttribute('data-id');
      if (serieId) {
        showDetail(parseInt(serieId));
      }
    });
  });
}

// Función para mostrar los detalles de la serie seleccionada
function showDetail(id: number): void {
  const selectedSerie = series.find(serie => serie.id === id);
  if (selectedSerie) {
    // Actualizamos los detalles de la serie
    serieTitle.innerText = selectedSerie.name;
    serieImage.src = selectedSerie.image;
    serieDescription.innerText = selectedSerie.description;
    serieChannel.innerHTML = `<a href="${selectedSerie.url}" target="_blank">${selectedSerie.channel}</a>`;
  }
}

// Función para calcular el promedio de temporadas
function promedioSeries(series: Serie[]): number {
  let totalSeasons: number = 0;
  series.forEach((serie) => totalSeasons += serie.seasons);
  return totalSeasons / series.length;
}

// Asignamos la función `showDetail` al objeto global `window` para que sea accesible si es necesario
window.showDetail = showDetail;
