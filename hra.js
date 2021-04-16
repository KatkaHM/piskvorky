'use strict';

let soucasnyTah = 'circle';
const elmPraveHraje = document.querySelector('.praveHraje');
const elmHerniPole = document.querySelector('.herniPole');

elmHerniPole.addEventListener('click', (event) => {
  if (soucasnyTah === 'circle') {
    console.dir(event);
    event.target.innerHTML = `<img src="img/circle.svg" alt="circle" class="marks--inGame" />`;
    soucasnyTah = 'cross';
    elmPraveHraje.src = 'img/cross.svg';
  } else {
    event.target.innerHTML = `<img src="img/cross.svg" alt="circle" class="marks--inGame" />`;
    soucasnyTah = 'circle';
    elmPraveHraje.src = 'img/circle.svg';
  }
});
