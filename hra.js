'use strict';

const velikostHracihoPole = 100;
const elmHerniPole = document.querySelector('.herniPole');
let htmlString = '';
let counter = 0;

while (counter < velikostHracihoPole) {
  htmlString += `<button class="policko"></button>`;
  counter++;
}

console.log(htmlString);
elmHerniPole.innerHTML = htmlString;
