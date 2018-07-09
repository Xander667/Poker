import * as React from 'react';
import { Board } from "../src/models/Board";
import { Card, Rank, Suit} from "../src/models/Card";
import './App.css';

import { logo } from './logo.svg';

import { Cards } from './constants/Cards';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';

interface IAppState {
  deck: Deck,
  hand1: Hand,
  hand2: Hand,
  board: Board
}

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    const deck: Deck = new Deck();
    this.state = { deck, hand1: deck.getHand(), hand2: deck.getHand(), board: deck.getBoard() };
  }

  public render() {
    const bigHand: Card[] = [];
    bigHand.push(this.state.hand1.card1);
    bigHand.push(this.state.hand1.card2);
    bigHand.push(this.state.board.cards[0]);
    bigHand.push(this.state.board.cards[1]);
    bigHand.push(this.state.board.cards[2]);
    bigHand.push(this.state.board.cards[3]);
    bigHand.push(this.state.board.cards[4]);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poker</h1>
        </header>
        { this.renderPokerTable() }
        { this.renderBoardOfCards() }
        { this.renderHands()}
        { this.renderDealCardsButton() }
        Score: { this.scoreHand(bigHand)}
      </div>
    );
  }

  public renderBoardOfCards(): JSX.Element {
    const style: React.CSSProperties = {
      marginLeft: "40%"
    };
    return(
      <div id="boardArea" style={style}>
        {this.renderCard(this.state.board.cards[0])}
        {this.renderCard(this.state.board.cards[1])}
        {this.renderCard(this.state.board.cards[2])}
        {this.renderCard(this.state.board.cards[3])}
        {this.renderCard(this.state.board.cards[4])}
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

  // Takes a hand and returns an int score
  public scoreHand(sevenCardHand: Card[]): number {
    // A hand has 7 possible cards and we need the 
    // combination of 5 that makes the strongest hand 
    // rank and then return that hand's score value
    let currentHand: Card[] = sevenCardHand;
    const extraCards: Card[] = [];
    let highestScore: number = 0;

    // Add first two cards to extra set and remove form current hand.
    extraCards.push(sevenCardHand[0]);
    extraCards.push(sevenCardHand[1]);
    currentHand.splice(0, 1);
    currentHand.splice(0, 1);
    highestScore = this.getHandValue(currentHand);

    for(let i=0; i<currentHand.length; i++) {
      for(let y=1; y<3; y++) {
          currentHand = sevenCardHand;
          currentHand.splice(i, 1);
          currentHand.splice(y, 1);
      }
    }

    return highestScore;
  }

  public getHandValue(fiveCardHand: Card[]): number {
    let rank: number = 0;
    let kickerVal: number = 0;

    fiveCardHand[0] = Cards.AceClubs;
    fiveCardHand[1] = Cards.AceDiamonds;
    fiveCardHand[2] = Cards.AceHearts;
    fiveCardHand[3] = Cards.AceSpades;

    // Four of a kind
    if(rank === 0) {
      if ((fiveCardHand.indexOf(Cards.AceClubs) > -1) && (fiveCardHand.indexOf(Cards.AceDiamonds) > -1) && (fiveCardHand.indexOf(Cards.AceHearts) > -1) && (fiveCardHand.indexOf(Cards.AceSpades) > -1)) {
          fiveCardHand = fiveCardHand.filter((card: Card) => { return card.rank !== Rank.Ace; });
          rank = 292;
        }

      if ((fiveCardHand.indexOf(Cards.AceClubs) > -1) && (fiveCardHand.indexOf(Cards.AceDiamonds) > -1) && (fiveCardHand.indexOf(Cards.AceHearts) > -1) && (fiveCardHand.indexOf(Cards.AceSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => { return card.rank !== Rank.Ace; });
        rank = 292;
      }



        // If we hit quads calc kicker value and return total.
        if (rank !== 0) {
          kickerVal = this.rankKicker(fiveCardHand);
          rank = 292; + kickerVal;
          return rank;
        }
      }


    return rank;
  }

  public rankKicker(card: Card[]): number {
    let i: number;
    let kickerRank: number;
    const myRanks: number[] = [];
    let rank: Rank;

    kickerRank = 0.0000;
    for (i = 0; i <  card.length; i += 1) {
        rank = card.slice(i, i+1)[0].rank;
        if (rank === Rank.Ace) {myRanks.push(0.2048); }
        if (rank === Rank.King) {myRanks.push(0.1024); }
        if (rank === Rank.Queen) {myRanks.push(0.0512); }
        if (rank === Rank.Jack) {myRanks.push(0.0256); }
        if (rank === Rank.Ten) {myRanks.push(0.0128); }
        if (rank === Rank.Nine) {myRanks.push(0.0064); }
        if (rank === Rank.Eight) {myRanks.push(0.0032); }
        if (rank === Rank.Seven) {myRanks.push(0.0016); }
        if (rank === Rank.Six) {myRanks.push(0.0008); }
        if (rank === Rank.Five) {myRanks.push(0.0004); }
        if (rank === Rank.Four) {myRanks.push(0.0002); }
        if (rank === Rank.Three) {myRanks.push(0.0001); }
        if (rank === Rank.Two) {myRanks.push(0.0000); }
    }

    myRanks.sort((a, b) => {
      return b - a;
    });

    for (i = 0; i < card.length; i += 1) {
        kickerRank += myRanks[i];
    }

    return kickerRank;
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