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

const pocetVRadku = (zacatek) => {
  let pocetZaSebou = 1;
  let i = zacatek.column;
  while (i > 0 && soucasnyTah === getSymbol(getPolicko(zacatek.row, i - 1))) {
    pocetZaSebou++;
    i--;
  }

  i = zacatek.column;
  while (
    i < velikostHernihoPole - 1 &&
    soucasnyTah === getSymbol(getPolicko(zacatek.row, i + 1))
  ) {
    pocetZaSebou++;
    i++;
  }

  return pocetZaSebou;
};

const pocetVSloupci = (zacatek) => {
  let pocetZaSebou = 1;
  let i = zacatek.row;
  while (
    i > 0 &&
    soucasnyTah === getSymbol(getPolicko(i - 1, zacatek.column))
  ) {
    pocetZaSebou++;
    i--;
  }

  i = zacatek.row;
  while (
    i < velikostHernihoPole - 1 &&
    soucasnyTah === getSymbol(getPolicko(i + 1, zacatek.column))
  ) {
    pocetZaSebou++;
    i++;
  }

  return pocetZaSebou;
};

const pocetVDiagonLP = (zacatek) => {
  //diagonala vlevo-hore vpravo-dole
  let pocetZaSebou = 1;
  let iRadky = zacatek.row;
  let iSloupce = zacatek.column;

  while (
    iRadky > 0 &&
    iSloupce > 0 &&
    soucasnyTah === getSymbol(getPolicko(iRadky - 1, iSloupce - 1))
  ) {
    pocetZaSebou++;
    iRadky--;
    iSloupce--;
  }

  iRadky = zacatek.row;
  iSloupce = zacatek.column;
  while (
    iRadky < velikostHernihoPole - 1 &&
    iSloupce < velikostHernihoPole - 1 &&
    soucasnyTah === getSymbol(getPolicko(iRadky + 1, iSloupce + 1))
  ) {
    pocetZaSebou++;
    iRadky++;
    iSloupce++;
  }

  return pocetZaSebou;
};

const pocetVDiagonPL = (zacatek) => {
  //diagonala vpravo-hore vlevo-dole
  let pocetZaSebou = 1;
  let iRadky = zacatek.row;
  let iSloupce = zacatek.column;

  while (
    iRadky > 0 &&
    iSloupce > 0 &&
    soucasnyTah === getSymbol(getPolicko(iRadky - 1, iSloupce + 1))
  ) {
    pocetZaSebou++;
    iRadky--;
    iSloupce++;
  }

  iRadky = zacatek.row;
  iSloupce = zacatek.column;
  while (
    iRadky < velikostHernihoPole - 1 &&
    iSloupce < velikostHernihoPole - 1 &&
    soucasnyTah === getSymbol(getPolicko(iRadky + 1, iSloupce - 1))
  ) {
    pocetZaSebou++;
    iRadky++;
    iSloupce--;
  }

  return pocetZaSebou;
};

const zkontrolujVyhru = (element) => {
  const zacatek = getIndex(element);

  if (pocetVRadku(zacatek) >= obtiznost) {
    return true;
  }

  if (pocetVSloupci(zacatek) >= obtiznost) {
    return true;
  }

  if (pocetVDiagonLP(zacatek) >= obtiznost) {
    return true;
  }

  if (pocetVDiagonPL(zacatek) >= obtiznost) {
    return true;
  }

  return false;
};

const showWin = () => {
  let vyhra = confirm(`Výhercem je: ${soucasnyTah}!!! Spustit hru znovu?`);
  if (vyhra === true) {
    location.reload();
  }
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

const udelejTah = (element) => {
  element.classList.add(`policko--vybrane`, `policko--${soucasnyTah}`);
  element.disabled = true;
  if (zkontrolujVyhru(element)) {
    showWin();
  }
  zmenSoucasnyTah();
};

elmHerniPole.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    udelejTah(event.target);
  } else {
    console.log('illegal move, nothing should happen');
    console.dir(event);
  }
});
