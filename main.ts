
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
                           <td>${serie.name}</td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });
}

function promedioSeries(series: Serie[]): number 
{
  let promedio: number = 0;
  series.forEach((serie) => promedio=promedio + serie.seasons);
  return promedio/series.length;
}
