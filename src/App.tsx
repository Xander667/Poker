import * as React from 'react';
import { Card, Suit} from "../src/models/Card";
import './App.css';

import logo from './logo.svg';

interface IAppState {
  currentCard: Card
}

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    const card: Card = new Card();
    this.state = { currentCard: card };
  }
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="pokerTable"/>
        { this.renderCard( )}
      </div>
    );
  }

  public renderCard(): JSX.Element {
    const card: JSX.Element = (
      <div id="card">
      { this.state.currentCard.rank }
      { this.renderSuit(this.state.currentCard.suit) }
      </div>
    );
    return card;
  }

  // Returns a JSX with the correct suit
  public renderSuit(suit: Suit): JSX.Element {
    let style: React.CSSProperties = {};
    
    if(suit === Suit.club || suit === Suit.spade) {
      style = {
        backgroundColor: "white"
      }; 
    } else if (suit === Suit.diamond || suit === Suit.heart) {
      style = {
        backgroundColor: "red"
      }; 
    }

    if(suit === Suit.club) {
      return (
        <div style={style}>
          &clubs;
        </div> 
      );
    } else if(suit === Suit.diamond) {
      return (
        <div style={style}>
          &diams;
        </div> 
      );
    } else if(suit === Suit.heart) {
      return (
        <div style={style}>
          &hearts;
        </div> 
      );
    } else if(suit === Suit.spade) {
      return (
        <div style={style}>
          &spades;
        </div> 
      );
    }
    return (
      <div/>
    );
  }
}
export default App;