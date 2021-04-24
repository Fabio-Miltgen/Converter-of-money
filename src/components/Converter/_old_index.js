import React from 'react';

import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';

import './style.scss';

import currencies from 'src/data/currencies';

// eslint-disable-next-line react/prefer-stateless-function
class Converter extends React.Component {
  // la méthode constructor est appelé à l'instanciation
  // on y définit les propriétés de la classe
  constructor(props) {
    // j'appelle la méthode constructor de la classe parent
    // en js via super
    super(props);
    // en php : parent::__construct(props)
    // je vais assigner une propriété sur l'objet courant
    // la propriété state est particulière, React va surveiller son evolution pour savoir si l'interface doit changer
    // state va représenter ma source de vérité, la donnée brut qui représente l'état de l'application, cette donnée pourra évoluer dans le temps en fonction des intéreactions de l'utilisateur
    // On donne une valeur initiale à l'état de notre application
    this.state = {
      open: true,
    };

    // Problème : notre méthode toggleOpen perd la référence au this quand on la transporte de composant en composant pour l'executer au click
    // Solution : on peut forcer la valeur de this à l'aide de la méthode bind
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  // Converter est un stateful component, c'est lui le cerveau, c'est lui qui gère les évolution et la lecture du state
  toggleOpen() {
    console.log('ici je vais modifier le state');

    // j'utilise la destructuration pour lire la valeur actuelle de open dans mon state
    const { open } = this.state;

    // /!\ ATTENTION !!!!
    // A NE JAMAIS FAIRE !
    // this.state.open = false;
    // on ne modifiera JAMAIS directement le state, sinon on ne déclenche pas de nouveau rendu et React ne pourra pas suivre les évolutions du state
    // this.state.open = false;

    // via setState on dit 2 chose :
    // - on modifie le state, la source de vérité
    // - on déclenche un nouveau rendu de l'interface
    // on lui passe un objet de modifications
    this.setState({
      open: !open, // je dis que open sera l'inverse de sa valeur actuelle
    });
  }

  // la méthode render retourne le JSX
  render() {

    // je veux lire la propriété state de l'objet courant contenant ma donnée open
    // on peut éventuellement déstructuer l'objet state
    // lecture du state
    const { open } = this.state;
    // const open = this.state.open

    // console.log(this.toggleOpen);

    return (
      <div className="converter">
        <Header
          baseAmount={1}
          // on peut acheminer toutes sortes d'infos via les props
          // y compris des fonctions
          // ici je transmet la définition de la méthode toggleOpen attachée à l'instance
          // on transmet une fonction capable d'écrire dans notre state
          toggle={this.toggleOpen}
          // on transmet une donnée lue dans notre state
          open={open}
        />
        <main>
          {open && <Currencies currencies={currencies} />}
          <Amount convertedAmount={1.09} currency="United States Dollar" />
        </main>
      </div>
    );
  }
}

export default Converter;

/*

const open = false;
const Converter = () => (
  <div className="converter">
    <Header baseAmount={1} />
    <main>
      {
        // mince comment faire une condition dans du JSX ?
        // je veux ça : mais je peux pas faire de if dans mes expressions
        // if (open) {
        //   <Currencies />
        // }
        // else {

        // }

        // on peut utiliser les opérateurs logiques pour conditionner du JSX 
        // en effet quand on écrit qqch && qcch
        // javascript regarde ce qu'il y a gauche, si c'est vrai il prend ce qu'il y a à droite
        // si c'est faux il prend faux
        // donc
        // true && true -> true
        // true && false -> false
        // true && 123 -> 123
        // true && 'nimportequoi' -> 'nimportequoi'
        // true && <Component /> -> <Component />
        // false && true -> false
        // false && false ->  false
        // false && 123 - > false
        // false && <Component /> -> false

        // on peut aussi faire l'inverse avec ||
        // true || 123 -> true
        // false || 123 -> 123
      }
      {open && <Currencies currencies={currencies} />}
      <Amount convertedAmount={1.09} currency="United States Dollar" />
    </main>
  </div>
);

export default Converter;
*/

/*
  // Un composant simple sous forme de fonction :
  const HelloMessage = ({ name }) => (
    <div>
      Salut {name}
    </div>
  );

  // le même composant en classe :
  // pour écire un composant sous forme de classe
  // on écrit class NomDuComposant extends React.Component
  class HelloMessage extends React.Component {
    // la méthode render sera utilisé par React au moment du rendu pour trouver le JSX retourné par le composant
    render() {
      // quand on se situe dans une classe this fait référence à l'objet courant, l'instance en court
      // sur une instance de composant on trouvera une propriété props
      // les props sont donc accessible via this.props
      return (
        <div>
          Salut {this.props.name}
        </div>
      );
    }
  }

  // à l'instanciation rien ne change
  <HelloMessage name="Toto" />
*/
