'use strict';
const circle = 'circle';
const cross = 'cross';
let soucasnyTah = circle;
const elmPraveHraje = document.querySelector('.praveHraje');
const elmHerniPole = document.querySelector('.herniPole');

const zmenSoucasnyTah = () => {
  if (soucasnyTah === circle) {
    soucasnyTah = cross;
    elmPraveHraje.src = `img/${cross}.svg`;
  } else if (soucasnyTah === cross) {
    soucasnyTah = circle;
    elmPraveHraje.src = `img/${circle}.svg`;
  } else {
    console.log(
      'something went wrong: wrong parameter for soucasnyTah:',
      soucasnyTah,
    );
  }
};

const udelejTah = (element) => {
  element.innerHTML = `<img src="img/${soucasnyTah}.svg" alt="${soucasnyTah}" class="marks--inGame" />`;
  element.disabled = true;
  zmenSoucasnyTah();
};

elmHerniPole.addEventListener('click', (event) => {
  console.log('isDisabled:', event.target.disabled);

  if (event.target.disabled === false) {
    udelejTah(event.target);
  } else {
    console.log('illegal move, nothing should happen');
    console.dir(event);
  }
});
