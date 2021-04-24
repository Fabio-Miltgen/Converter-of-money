import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const BaseAmount = ({ setBaseAmount, baseAmount }) => (
  <form className="form">
    <input
      onChange={setBaseAmount}
      className="form-input"
      type="number"
      min="1"
      value={baseAmount}
      placeholder="Valeur"
    />
    euro
  </form>
);

BaseAmount.propTypes = {
  setBaseAmount: PropTypes.func.isRequired,
  baseAmount: PropTypes.number.isRequired,
};

export default BaseAmount;
