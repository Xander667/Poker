import * as React from 'react';
import { Card, Suit} from "../src/models/Card";
import './App.css';

// import Cards from './constants/Cards';

import { logo } from './logo.svg';

import { Deck } from './models/Deck';
import { Hand } from './models/Hand';
import { HandResult } from './models/HandResult';

interface ICardState {
}

interface ICardProps {
    card: Card;
}

class App extends React.Component<ICardProps, ICardState> {

  constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poker</h1>
        </header>
        { this.renderHands()}
      </div>
    );
  }

  public renderHands(): JSX.Element[] {
    const allHands: JSX.Element[] = [];
    allHands.push(this.renderCards(1));
    allHands.push(this.renderCards(2));
    return allHands;
  }

  public renderCards(playerNumber: number): JSX.Element {
    let style: React.CSSProperties = {
      marginLeft: "45%"
    };
    let hand: Hand = this.state.hand1;
    if(playerNumber === 1) {
      style = {
        marginLeft: "25%"
      }; 
      hand = this.state.hand2;
    }

    // Player 1 seven cards
    const fullhand: Card[] = this.state.board.cards.slice();
    fullhand.push(hand.card1);
    fullhand.push(hand.card2);
    const divId: string = "handResults" + playerNumber.toString();
    const result: HandResult = this.state.deck.scoreHand(fullhand);
    return(
      <div id="handArea" style={style}>
        <div id={divId}>
          Player # {  playerNumber } <br/>
          Hand: { result.handName } <br/>
          Score: { result.score } <br/>
          Best Hand: { this.renderStrongHand(result.hand)}
        </div>
        {this.renderCard(hand.card1)}
        {this.renderCard(hand.card2)}
      </div>
    );
  }

  public renderStrongHand(hand :Card[]): JSX.Element[] {
    const resultingJSX: JSX.Element[] = [];
    for(let i=0; i<hand.length; i++) {
      const ch: Card = hand[i];
      resultingJSX.push(
        <div>
          { ch.rank.toString() + ch.suit.toString() }
        </div>
      );
    }
    return resultingJSX;
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