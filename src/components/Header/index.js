import React from 'react';
import PropTypes from 'prop-types';
import BaseAmount from './BaseAmount';

import './style.scss';

const Header = ({
  baseAmount,
  // toggle,
  setBaseAmount,
  // open,
}) => (
  <header className="header">
    <h1 className="header-title">Convertisseur</h1>
    <div className="header-amount">
      <BaseAmount baseAmount={baseAmount} setBaseAmount={setBaseAmount} />
    </div>
    {/* <button
      // je place mon écouteur directement sur l'élement JSX
      // on met onNomDeLEvent en camelCase
      // on va retrouver onClick, onSubmit, onChange, ...
      onClick={toggle}
      type="button"
    >
      {/* condition ternaire :
        test ? valeurSiVrai : valeurSiFaux
      */}
      {/*{open ? 'Masquer' : 'Afficher' }
    </button> */}

  </header>
);

Header.propTypes = {
  setBaseAmount: PropTypes.func.isRequired,
  baseAmount: PropTypes.number.isRequired,
  // toggle: PropTypes.func.isRequired,
  // open: PropTypes.bool.isRequired,
};

export default Header;
