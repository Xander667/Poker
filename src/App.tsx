import * as React from 'react';
import { Card, Suit} from "../src/models/Card";
import './App.css';

import logo from './logo.svg';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';

interface IAppState {
  deck: Deck
  hand1: Hand,
  hand2: Hand
}

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    const deck: Deck = new Deck();
    const hand: Hand = deck.getHand();
    const hand2: Hand = deck.getHand();
    this.state = { deck, hand1: hand, hand2 };
  }
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poker</h1>
        </header>
        { this.renderPokerTable() }
        { this.renderHands()}
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
    const newHand2 = this.state.deck.getHand();
    this.setState({hand1: newHand, hand2: newHand2 });
  }

  public renderHands(): JSX.Element[] {
    const allHands: JSX.Element[] = [];
    allHands.push(this.renderCards(1));
    allHands.push(this.renderCards(2));
    return allHands;
  }

  public renderCards(playerNumber: number): JSX.Element {
    let style: React.CSSProperties = {
      marginLeft: "50%"
    };
    let hand: Hand = this.state.hand1;
    if(playerNumber === 1) {
      style = {
        marginLeft: "30%"
      }; 
      hand = this.state.hand2;
    }

    return(
      <div id="handArea" style={style}>
        Player # {  playerNumber }
        {this.renderCard(hand.card1)}
        {this.renderCard(hand.card2)}
      </div>
    );
  }

  public renderCard(card: Card): JSX.Element {
    return (
      <div id="card">
      { card.getRankName()}
      <br/>
      { card.getSuitName()}
      { this.renderSuit(card.suit) }
      </div>
    );
  }

  // Returns a JSX with the correct suit
  public renderSuit(suit: Suit): JSX.Element {
    let style: React.CSSProperties = {};
    
    if(suit === Suit.Club || suit === Suit.Spade) {
      style = {
        backgroundColor: "white"
      }; 
    } else if (suit === Suit.Diamond || suit === Suit.Heart) {
      style = {
        backgroundColor: "red"
      }; 
    }

    if(suit === Suit.Club) {
      return (
        <div style={style}>
          &clubs;
        </div> 
      );
    } else if(suit === Suit.Diamond) {
      return (
        <div style={style}>
          &diams;
        </div> 
      );
    } else if(suit === Suit.Heart) {
      return (
        <div style={style}>
          &hearts;
        </div> 
      );
    } else if(suit === Suit.Spade) {
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