import * as React from 'react';
import { Card, Suit} from "../src/models/Card";
import './App.css';

import logo from './logo.svg';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';

interface IAppState {
  deck: Deck
  currentHand: Hand
}

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    const deck: Deck = new Deck();
    const hand: Hand = deck.getHand();
    this.state = { deck, currentHand: hand };
  }
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poker</h1>
        </header>
        { this.renderPokerTable() }
        { this.renderCards()}
        { this.renderDealCardsButton() }
      </div>
    );
  }

  public renderDealCardsButton(): JSX.Element {
    return(
      <div>
        <button id="dealCardsButton" onClick={this.dealCards}>
          Deal
        </button>
      </div>
    );
  }

  public renderPokerTable(): JSX.Element {
    return (
      <div id="pokerTable">
        Daves
      </div>
    )
  }

  public dealCards = (): void => {
    const newHand = this.state.deck.getHand();
    this.setState({currentHand: newHand });
  }

  public renderCards(): JSX.Element {
    return(
      <div id="handArea">
        {this.renderCard(this.state.currentHand.card1)}
        {this.renderCard(this.state.currentHand.card2)}
      </div>
    );
  }

  public renderCard(card: Card): JSX.Element {
    return (
      <div id="card">
      { card.rank }
      { this.renderSuit(card.suit) }
      </div>
    );
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