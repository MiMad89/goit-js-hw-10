const API_URL = 'https://restcountries.com/v3.1';
import Notiflix from "notiflix";

function fetchCountries(name) {
  return fetch(
    `${API_URL}/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

export { fetchCountries };
