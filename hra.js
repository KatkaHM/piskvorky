'use strict';

let soucasnyTah = 'circle';
const elmPraveHraje = document.querySelector('.praveHraje');
const elmHerniPole = document.querySelector('.herniPole');

elmHerniPole.addEventListener('click', (event) => {
  console.log('isDisabled:', event.target.disabled);

  if (event.target.disabled === false) {
    if (soucasnyTah === 'circle') {
      console.dir(event);
      event.target.innerHTML = `<img src="img/circle.svg" alt="circle" class="marks--inGame" />`;
      event.target.disabled = true;
      soucasnyTah = 'cross';
      elmPraveHraje.src = 'img/cross.svg';
    } else {
      event.target.innerHTML = `<img src="img/cross.svg" alt="circle" class="marks--inGame" />`;
      event.target.disabled = true;
      soucasnyTah = 'circle';
      elmPraveHraje.src = 'img/circle.svg';
    }
  } else {
    console.log('illegal move, nothing should happen');
    console.dir(event);
    return;
  }
});
