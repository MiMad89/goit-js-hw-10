import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

var _ = require('lodash');

let clearCountries = () => {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};

let searchCountry = () => {
  let input = inputEl.value.trim();
  clearCountries();
  if (input === '') {
    return;
  } else {
    fetchCountries(input).then(data => {
      console.log(data);
      filteredArray(data);
    });
  }
};

filteredArray = data => {
  if (data.length > 10) {
    clearCountries();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1) {
    clearCountries();
    countryList.insertAdjacentHTML(
      'beforeend',
      data
        .map(
          el =>
            `<ul><li class="list-item"><img src="${el.flags.svg}"/>
            </li><li class="list-item">${el.name.official}</li></ul>`
        )
        .join('')
    );
  } else if (data.length === 1) {
    clearCountries();
    countryInfo.insertAdjacentHTML(
      'beforeend',
      `<ul><li class="list-item country-style">${
        data[0].name.official
      }</li><li class="list-item"><img src="${
        data[0].flags.svg
      }" alt="Flag"/></li><li class="list-item">Capital: ${
        data[0].capital
      }</li><li class="list-item">Population: ${
        data[0].population
      }</li><li class="list-item">Languages: ${Object.values(
        data[0].languages
      ).join(', ')}</li></ul>`
    );
  } else if (data.status === 404) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
};

inputEl.addEventListener('input', _.debounce(searchCountry, DEBOUNCE_DELAY));
