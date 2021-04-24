import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Currencies = ({
  currencies,
  changeCurrency,
  setSearch,
  currentSearch,
}) => (
  <section className="currencies">
    <input
      className="currencies-search"
      type="search"
      placeholder="Search"
      value={currentSearch}
      onChange={(event) => {
        console.log(event.target.value);
        console.log(currentSearch);
        setSearch(event.target.value);
      }}
    />
    <ul className="currencies-list">
      {
        // ici on se place dans une expression
        // le javascript y est interprété, ici on appelle map pour récupérer un tableau
        // c'est ce tableau qui sera affiché dans mon JSX
        currencies.map(({ name }) => (
          <li
            className="currencies-list-item"
            key={name}
            onClick={changeCurrency}
          >
            {name}
          </li>
        ))
      }
    </ul>
  </section>
);

// pour bien faire on doit valider tout ce qu'on manipule dans notre composant
// la on a besoin d'un tableau d'objet ayant une propriété name qui soit une chaine de caractère
Currencies.propTypes = {
  changeCurrency: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  currentSearch: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Currencies;
