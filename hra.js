'use strict';
const circle = 'circle';
const cross = 'cross';
let soucasnyTah = circle;
const elmPraveHraje = document.querySelector('.praveHraje');
const elmHerniPole = document.querySelector('.herniPole');
const vsechnaPolicka = document.querySelectorAll('.policko');
const velikostHernihoPole = 10;
const obtiznost = 5;

const getPolicko = (row, column) =>
  vsechnaPolicka[row * velikostHernihoPole + column];

const getIndex = (pole) => {
  let index = 0;
  while (index < vsechnaPolicka.length) {
    if (pole === vsechnaPolicka[index]) {
      break;
    }
    index++;
  }

  return {
    row: Math.floor(index / velikostHernihoPole),
    column: index % velikostHernihoPole,
  };
};

const getSymbol = (policko) => {
  if (policko.classList.contains('policko--cross')) {
    return 'cross';
  } else if (policko.classList.contains('policko--circle')) {
    return 'circle';
  }
};

const zkontrolujVyhru = (element) => {
  const zacatek = getIndex(element);
  const znak = getSymbol(element);
  let i;

  // radky
  let pocetVRadku = 1;
  i = zacatek.column;
  while (i > 0 && znak === getSymbol(getPolicko(zacatek.row, i - 1))) {
    pocetVRadku++;
    i--;
  }

  i = zacatek.column;
  while (
    i < velikostHernihoPole - 1 &&
    znak === getSymbol(getPolicko(zacatek.row, i + 1))
  ) {
    pocetVRadku++;
    i++;
  }

  if (pocetVRadku >= obtiznost) {
    return true;
  }

  //sloupce
  let pocetVSloupci = 1;
  i = zacatek.row;
  while (i > 0 && znak === getSymbol(getPolicko(i - 1, zacatek.column))) {
    pocetVSloupci++;
    i--;
  }

  i = zacatek.row;
  while (
    i < velikostHernihoPole - 1 &&
    znak === getSymbol(getPolicko(i + 1, zacatek.column))
  ) {
    pocetVSloupci++;
    i++;
  }

  if (pocetVSloupci >= obtiznost) {
    return true;
  }

  return false;
};

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

const vypisVyhru = () => {
  let vyhra = confirm(`Výhercem je: ${soucasnyTah}!!! Spustit hru znovu?`);
  if (vyhra === true) {
    location.reload();
  }
};

const udelejTah = (element) => {
  element.classList.add(`policko--vybrane`, `policko--${soucasnyTah}`);
  element.disabled = true;
  if (zkontrolujVyhru(element)) {
    vypisVyhru();
  }
  zmenSoucasnyTah();
};

elmHerniPole.addEventListener('click', (event) => {
  // if (event.target.disabled === false) {
  if (event.target.tagName === 'BUTTON') {
    udelejTah(event.target);
  } else {
    console.log('illegal move, nothing should happen');
    console.dir(event);
  }
});
