import React from 'react';

import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';

import './style.scss';

import currencies from 'src/data/currencies';

class Converter extends React.Component {
  // grâce à @babel/plugin-proposal-class-properties
  // je peux définir mes propriétés directement dans la classe

  // state initial

  state = {
    open: true,
    baseAmount: 1,
    // rate: 1.09,
    currency: 'United States Dollar',
    search: '',
  };

  componentDidMount() {
    console.log('Converter - componentDiMount');
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        this.setState({
          open: true,
          baseAmount: 1,
          // rate: 1.09,
          currency: 'United States Dollar',
          search: '',
        });
      }
    });
  }

  componentDidUpdate() {
    console.log('Converter - componentDiUpdate');
  }

  setBaseAmount = (event) => {
    // event.preventDefault();
    let valueSubmit = Number(event.target.value);
    if (valueSubmit < 0) valueSubmit = 0;
    this.setState({
      baseAmount: valueSubmit,
    });
  }

  setCurrency = (event) => {
    console.log(event.target.textContent);
    this.setState({
      currency: event.target.textContent,
    });
  }

  // grâce à @babel/plugin-proposal-class-properties
  // je peux stocker mes méthodes sous forme de fonctions fléchées
  // Or les fonctions fléchées ne définissent pas this
  // donc ici this fera rérérence à "là où a fonction est écrite" c'est à dire à l'instance de ma classe

  toggleOpen = () => {
    const { open } = this.state;

    // écriture
    this.setState({
      open: !open,
    });
  }

  filterCurrencies = () => {
    const { search: searchValue } = this.state;
    const filteredCurrencies = currencies.filter((currency) => (
      currency.name.toLowerCase().includes(searchValue.toLowerCase())
    ));
    return filteredCurrencies;
  }

  makeConversion = () => {
    const { currency, baseAmount } = this.state;
    // pour calculer convertedAmount j'ai tous les ingrédients :
    // le montant en euro
    // la devise ciblée
    // je peux trouver le taux de change de cette devise
    const currentCurrencyObject = currencies.find((currentCurrency) => (
      currentCurrency.name === currency));
    const convertedAmount = baseAmount * currentCurrencyObject.rate;
    // avec .toFixed(2) c'est pas mal mais c'est une troncature et pas un arrondi
    // avec Math.round c'est un arrondi, mais à l'entier
    // l'astuce est de multiplié par 100 puis d'arrondir et de rediviser pour avoir un arrondi au centième
    return Math.round(convertedAmount * 100) / 100;
  }

  setSearch = (searchValue) => {
    this.setState({
      search: searchValue,
    });
  }

  render() {
    // lecture
    const {
      open,
      currency,
      baseAmount,
      search,
    } = this.state;
    const convertedAmount = this.makeConversion();
    const filteredCurrencies = this.filterCurrencies();
    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          toggle={this.toggleOpen}
          setBaseAmount={this.setBaseAmount}
          open={open}
        />
        <main>
          {open && (
            <Currencies
              changeCurrency={this.setCurrency}
              currencies={filteredCurrencies}
              setSearch={this.setSearch}
              currentSearch={search}
            />
          )}
          <Amount convertedAmount={convertedAmount} currency={currency} />
        </main>
      </div>
    );
  }
}

export default Converter;
