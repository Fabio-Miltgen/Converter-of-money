// ici nous avons un stateless component / dumb component / composant de présentation
// cad un traducteur de données brutes vers une représentation/ une portion d'ui 

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

// on a entrée un objet de props et en sortie du JSX
const Amount = ({ convertedAmount, currency }) => (
  <section className="amount">
    <p className="amount-value">{convertedAmount}</p>
    <p className="amount-currency">{currency}</p>
  </section>
);

// les prop-types nous permettent de dire explicitement le type de données attendues
// si on essaye d'utiliser le composant de manière incorrect on aura des messages d'erreurs explicites
Amount.propTypes = {
  convertedAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Amount;
