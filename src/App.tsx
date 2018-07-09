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

  public doesIncludeRank(cards: Card[], rank: Rank): boolean {
    // code to remove "o"
    if(rank === Rank.Ace) {
      if ((cards.indexOf(Cards.AceClubs) > -1) && (cards.indexOf(Cards.AceDiamonds) > -1) && (cards.indexOf(Cards.AceHearts) > -1) && (cards.indexOf(Cards.AceSpades) > -1)) { return true; }
    } else if(rank === Rank.King) {
      if ((cards.indexOf(Cards.KingClubs) > -1) && (cards.indexOf(Cards.KingDiamonds) > -1) && (cards.indexOf(Cards.KingHearts) > -1) && (cards.indexOf(Cards.KingSpades) > -1)) { return true; }
    } else if(rank === Rank.Queen) {
      if ((cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.QueenSpades) > -1)) { return true; }
    } else if(rank === Rank.Jack) {
      if ((cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.JackSpades) > -1)) { return true; }
    } else if(rank === Rank.Ten) {
      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.TenSpades) > -1)) { return true; }
    } else if(rank === Rank.Nine) {
      if ((cards.indexOf(Cards.NineClubs) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1) && (cards.indexOf(Cards.NineHearts) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { return true; }
    } else if(rank === Rank.Eight) {
      if ((cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.EightSpades) > -1)) { return true; }
    } else if(rank === Rank.Seven) {
      if ((cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.SevenSpades) > -1)) { return true; }
    } else if(rank === Rank.Six) {
      if ((cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SixSpades) > -1)) { return true; }
    } else if(rank === Rank.Five) {
      if ((cards.indexOf(Cards.FiveClubs) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1) && (cards.indexOf(Cards.FiveHearts) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { return true; }
    }  else if(rank === Rank.Four) {
      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.FourSpades) > -1)) { return true; }
    }  else if(rank === Rank.Three) {
      if ((cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1)) { return true; }
    }  else if(rank === Rank.Two) {
      if ((cards.indexOf(Cards.TwoClubs) > -1) && (cards.indexOf(Cards.TwoDiamonds) > -1) && (cards.indexOf(Cards.TwoHearts) > -1) && (cards.indexOf(Cards.TwoSpades) > -1)) { return true; }
    } 
      
      return false;
    }

  public getHandValue(fiveCardHand: Card[]): number {
    let rank: number = 0;
    let kickerVal: number = 0;

    // Four of a kind
    if(rank === 0) {
      if ((fiveCardHand.indexOf(Cards.AceClubs) > -1) && (fiveCardHand.indexOf(Cards.AceDiamonds) > -1) && (fiveCardHand.indexOf(Cards.AceHearts) > -1) && (fiveCardHand.indexOf(Cards.AceSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 292;
        }

      if ((fiveCardHand.indexOf(Cards.KingClubs) > -1) && (fiveCardHand.indexOf(Cards.KingDiamonds) > -1) && (fiveCardHand.indexOf(Cards.KingHearts) > -1) && (fiveCardHand.indexOf(Cards.KingSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.QueenClubs) > -1) && (fiveCardHand.indexOf(Cards.QueenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.QueenHearts) > -1) && (fiveCardHand.indexOf(Cards.QueenSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.JackClubs) > -1) && (fiveCardHand.indexOf(Cards.JackDiamonds) > -1) && (fiveCardHand.indexOf(Cards.JackHearts) > -1) && (fiveCardHand.indexOf(Cards.JackSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.TenSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.NineClubs) > -1) && (fiveCardHand.indexOf(Cards.NineDiamonds) > -1) && (fiveCardHand.indexOf(Cards.NineHearts) > -1) && (fiveCardHand.indexOf(Cards.NineSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.FiveClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.FourClubs) > -1) && (fiveCardHand.indexOf(Cards.FourDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FourHearts) > -1) && (fiveCardHand.indexOf(Cards.FourSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.ThreeClubs) > -1) && (fiveCardHand.indexOf(Cards.ThreeDiamonds) > -1) && (fiveCardHand.indexOf(Cards.ThreeHearts) > -1) && (fiveCardHand.indexOf(Cards.ThreeSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
        rank = 291;
      }

      if ((fiveCardHand.indexOf(Cards.TwoClubs) > -1) && (fiveCardHand.indexOf(Cards.TwoDiamonds) > -1) && (fiveCardHand.indexOf(Cards.TwoHearts) > -1) && (fiveCardHand.indexOf(Cards.TwoSpades) > -1)) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
        rank = 291;
      }

      // If we hit quads calc kicker value and return total.
      if (rank !== 0) {
        kickerVal = this.rankKickers(fiveCardHand);
        rank += kickerVal;
      }
    }

    // Full House
    if(rank === 0) {
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.King) === 2) { rank = 279; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2) { rank = 278; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2) { rank = 277; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2) { rank = 276; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2) { rank = 275; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2) { rank = 274; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2) { rank = 273; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2) { rank = 272; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2) { rank = 271; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2) { rank = 270; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2) { rank = 269; }    
      if(this.countRank(fiveCardHand, Rank.Ace) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2) { rank = 268; }    
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 267; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 266; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 265; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 264; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 263; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 262; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 261; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 260; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 259; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 258; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 257; }
      if(this.countRank(fiveCardHand, Rank.King) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 256; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 255; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 254; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 253; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 252; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 251; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 250; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 249; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 248; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 247; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 246; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 245; }
      if(this.countRank(fiveCardHand, Rank.Queen) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 244; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 243; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 242; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 241; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 240; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 239; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 238; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 237; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 236; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 235; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 234; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 233; }
      if(this.countRank(fiveCardHand, Rank.Jack) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 232; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 231; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 230; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 229; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 228; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 227; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 226; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 225; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 224; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Five) ===2 && rank === 0){rank = 223; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 222; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 221; }
      if(this.countRank(fiveCardHand, Rank.Ten) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 220; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 219; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 218; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 217; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 216; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 215; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 214; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 213; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 212; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 211; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 210; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 209; }
      if(this.countRank(fiveCardHand, Rank.Nine) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 208; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 207; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 206; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 205; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 204; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 203; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 202; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 201; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 200; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 199; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 198; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 197; }
      if(this.countRank(fiveCardHand, Rank.Eight) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 196; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 195; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 194; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 193; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 192; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 191; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 190; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 189; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 188; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 187; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 186; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 185; }
      if(this.countRank(fiveCardHand, Rank.Seven) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 184; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 183; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 182; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 181; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 180; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 179; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 178; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 177; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 176; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 175; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 174; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 173; }
      if(this.countRank(fiveCardHand, Rank.Six) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 172; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 171; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 170; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 169; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 168; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 167; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 166; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 165; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 164; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 163; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 162; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 161; }
      if(this.countRank(fiveCardHand, Rank.Five) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 160; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 159; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 158; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 157; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 156; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 155; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 154; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 153; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 152; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 151; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 150; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 149; }
      if(this.countRank(fiveCardHand, Rank.Four) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 148; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 147; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 146; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 145; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 144; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 143; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 142; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 141; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 140; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 139; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 138; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 137; }
      if(this.countRank(fiveCardHand, Rank.Three) === 3 && this.countRank(fiveCardHand, Rank.Two) === 2 && rank === 0){rank = 136; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Ace) === 2 && rank === 0){rank = 135; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.King) === 2 && rank === 0){rank = 134; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Queen) === 2 && rank === 0){rank = 133; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Jack) === 2 && rank === 0){rank = 132; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Ten) === 2 && rank === 0){rank = 131; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Nine) === 2 && rank === 0){rank = 130; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Eight) === 2 && rank === 0){rank = 129; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Seven) === 2 && rank === 0){rank = 128; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Six) === 2 && rank === 0){rank = 127; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Five) === 2 && rank === 0){rank = 126; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Four) === 2 && rank === 0){rank = 125; }
      if(this.countRank(fiveCardHand, Rank.Two) === 3 && this.countRank(fiveCardHand, Rank.Three) === 2 && rank === 0){rank = 124; }
      if(rank !== 0){ console.log('Full House'); }
    }

    // Flush & Straight Flush
    if(rank === 0) {
      if((this.countSuit(fiveCardHand, Suit.Club) === 5) || (this.countSuit(fiveCardHand, Suit.Diamond) === 5) || (this.countSuit(fiveCardHand, Suit.Heart) === 5) || (this.countSuit(fiveCardHand, Suit.Spade) === 5)) { rank = 123; }

      // Straight flush
      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.JackClubs) > -1) && (fiveCardHand.indexOf(Cards.QueenClubs) > -1) && (fiveCardHand.indexOf(Cards.KingClubs) > -1) && (fiveCardHand.indexOf(Cards.AceClubs) > -1)) { rank = 302; }
      if ((fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.JackDiamonds) > -1) && (fiveCardHand.indexOf(Cards.QueenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.KingDiamonds) > -1) && (fiveCardHand.indexOf(Cards.AceDiamonds) > -1)) { rank = 302; }
      if ((fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.JackHearts) > -1) && (fiveCardHand.indexOf(Cards.QueenHearts) > -1) && (fiveCardHand.indexOf(Cards.KingHearts) > -1) && (fiveCardHand.indexOf(Cards.AceHearts) > -1)) { rank = 302; }
      if ((fiveCardHand.indexOf(Cards.TenSpades) > -1) && (fiveCardHand.indexOf(Cards.JackSpades) > -1) && (fiveCardHand.indexOf(Cards.QueenSpades) > -1) && (fiveCardHand.indexOf(Cards.KingSpades) > -1) && (fiveCardHand.indexOf(Cards.AceSpades) > -1)) { rank = 302; }
      
      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.JackClubs) > -1) && (fiveCardHand.indexOf(Cards.QueenClubs) > -1) && (fiveCardHand.indexOf(Cards.KingClubs) > -1) && (fiveCardHand.indexOf(Cards.NineClubs) > -1)) { rank = 301; }
      if ((fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.JackDiamonds) > -1) && (fiveCardHand.indexOf(Cards.QueenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.KingDiamonds) > -1) && (fiveCardHand.indexOf(Cards.NineDiamonds) > -1)) { rank = 301; }
      if ((fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.JackHearts) > -1) && (fiveCardHand.indexOf(Cards.QueenHearts) > -1) && (fiveCardHand.indexOf(Cards.KingHearts) > -1) && (fiveCardHand.indexOf(Cards.NineHearts) > -1)) { rank = 301; }
      if ((fiveCardHand.indexOf(Cards.TenSpades) > -1) && (fiveCardHand.indexOf(Cards.JackSpades) > -1) && (fiveCardHand.indexOf(Cards.QueenSpades) > -1) && (fiveCardHand.indexOf(Cards.KingSpades) > -1) && (fiveCardHand.indexOf(Cards.NineSpades) > -1)) { rank = 301; }
   
      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.JackClubs) > -1) && (fiveCardHand.indexOf(Cards.QueenClubs) > -1) && (fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.NineClubs) > -1)) { rank = 300; }
      if ((fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.JackDiamonds) > -1) && (fiveCardHand.indexOf(Cards.QueenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.NineDiamonds) > -1)) { rank = 300; }
      if ((fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.JackHearts) > -1) && (fiveCardHand.indexOf(Cards.QueenHearts) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.NineHearts) > -1)) { rank = 300; }
      if ((fiveCardHand.indexOf(Cards.TenSpades) > -1) && (fiveCardHand.indexOf(Cards.JackSpades) > -1) && (fiveCardHand.indexOf(Cards.QueenSpades) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1) && (fiveCardHand.indexOf(Cards.NineSpades) > -1)) { rank = 300; }

      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.JackClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.NineClubs) > -1)) { rank = 299; }
      if ((fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.JackDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.NineDiamonds) > -1)) { rank = 299; }
      if ((fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.JackHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.NineHearts) > -1)) { rank = 299; }
      if ((fiveCardHand.indexOf(Cards.TenSpades) > -1) && (fiveCardHand.indexOf(Cards.JackSpades) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1) && (fiveCardHand.indexOf(Cards.NineSpades) > -1)) { rank = 299; }

      if ((fiveCardHand.indexOf(Cards.TenClubs) > -1) && (fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.NineClubs) > -1)) { rank = 298; }
      if ((fiveCardHand.indexOf(Cards.TenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.NineDiamonds) > -1)) { rank = 298; }
      if ((fiveCardHand.indexOf(Cards.TenHearts) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.NineHearts) > -1)) { rank = 298; }
      if ((fiveCardHand.indexOf(Cards.TenSpades) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1) && (fiveCardHand.indexOf(Cards.NineSpades) > -1)) { rank = 298; }

      if ((fiveCardHand.indexOf(Cards.NineClubs) > -1) && (fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveClubs) > -1)) { rank = 297; }
      if ((fiveCardHand.indexOf(Cards.NineDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1)) { rank = 297; }
      if ((fiveCardHand.indexOf(Cards.NineHearts) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1)) { rank = 297; }
      if ((fiveCardHand.indexOf(Cards.NineSpades) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) { rank = 297; }

      if ((fiveCardHand.indexOf(Cards.FourClubs) > -1) && (fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.EightClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveClubs) > -1)) { rank = 296; }
      if ((fiveCardHand.indexOf(Cards.FourDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.EightDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1)) { rank = 296; }
      if ((fiveCardHand.indexOf(Cards.FourHearts) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.EightHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1)) { rank = 296; }
      if ((fiveCardHand.indexOf(Cards.FourSpades) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1) && (fiveCardHand.indexOf(Cards.EightSpades) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) { rank = 296; }

      if ((fiveCardHand.indexOf(Cards.FourClubs) > -1) && (fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.SevenClubs) > -1) && (fiveCardHand.indexOf(Cards.ThreeClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveClubs) > -1)) { rank = 295; }
      if ((fiveCardHand.indexOf(Cards.FourDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SevenDiamonds) > -1) && (fiveCardHand.indexOf(Cards.ThreeDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1)) { rank = 295; }
      if ((fiveCardHand.indexOf(Cards.FourHearts) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.SevenHearts) > -1) && (fiveCardHand.indexOf(Cards.ThreeHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1)) { rank = 295; }
      if ((fiveCardHand.indexOf(Cards.FourSpades) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1) && (fiveCardHand.indexOf(Cards.SevenSpades) > -1) && (fiveCardHand.indexOf(Cards.ThreeSpades) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) { rank = 295; }

      if ((fiveCardHand.indexOf(Cards.FourClubs) > -1) && (fiveCardHand.indexOf(Cards.SixClubs) > -1) && (fiveCardHand.indexOf(Cards.TwoClubs) > -1) && (fiveCardHand.indexOf(Cards.ThreeClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveClubs) > -1)) { rank = 294; }
      if ((fiveCardHand.indexOf(Cards.FourDiamonds) > -1) && (fiveCardHand.indexOf(Cards.SixDiamonds) > -1) && (fiveCardHand.indexOf(Cards.TwoDiamonds) > -1) && (fiveCardHand.indexOf(Cards.ThreeDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1)) { rank = 294; }
      if ((fiveCardHand.indexOf(Cards.FourHearts) > -1) && (fiveCardHand.indexOf(Cards.SixHearts) > -1) && (fiveCardHand.indexOf(Cards.TwoHearts) > -1) && (fiveCardHand.indexOf(Cards.ThreeHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1)) { rank = 294; }
      if ((fiveCardHand.indexOf(Cards.FourSpades) > -1) && (fiveCardHand.indexOf(Cards.SixSpades) > -1) && (fiveCardHand.indexOf(Cards.TwoSpades) > -1) && (fiveCardHand.indexOf(Cards.ThreeSpades) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) { rank = 294; }

      if ((fiveCardHand.indexOf(Cards.FourClubs) > -1) && (fiveCardHand.indexOf(Cards.AceClubs) > -1) && (fiveCardHand.indexOf(Cards.TwoClubs) > -1) && (fiveCardHand.indexOf(Cards.ThreeClubs) > -1) && (fiveCardHand.indexOf(Cards.FiveClubs) > -1)) { rank = 293; }
      if ((fiveCardHand.indexOf(Cards.FourDiamonds) > -1) && (fiveCardHand.indexOf(Cards.AceDiamonds) > -1) && (fiveCardHand.indexOf(Cards.TwoDiamonds) > -1) && (fiveCardHand.indexOf(Cards.ThreeDiamonds) > -1) && (fiveCardHand.indexOf(Cards.FiveDiamonds) > -1)) { rank = 293; }
      if ((fiveCardHand.indexOf(Cards.FourHearts) > -1) && (fiveCardHand.indexOf(Cards.AceHearts) > -1) && (fiveCardHand.indexOf(Cards.TwoHearts) > -1) && (fiveCardHand.indexOf(Cards.ThreeHearts) > -1) && (fiveCardHand.indexOf(Cards.FiveHearts) > -1)) { rank = 293; }
      if ((fiveCardHand.indexOf(Cards.FourSpades) > -1) && (fiveCardHand.indexOf(Cards.AceSpades) > -1) && (fiveCardHand.indexOf(Cards.TwoSpades) > -1) && (fiveCardHand.indexOf(Cards.ThreeSpades) > -1) && (fiveCardHand.indexOf(Cards.FiveSpades) > -1)) { rank = 293; }

      if(rank === 123){rank = rank + this.rankKickers(fiveCardHand);}
    }

    // Straight
    if(rank === 0){
      if((this.doesIncludeRank(fiveCardHand, Rank.Ten) && (this.doesIncludeRank(fiveCardHand, Rank.Jack)) && (this.doesIncludeRank(fiveCardHand, Rank.Queen)) && (this.doesIncludeRank(fiveCardHand, Rank.King)) && (this.doesIncludeRank(fiveCardHand, Rank.Ace)))) { rank = 122; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Ten) && (this.doesIncludeRank(fiveCardHand, Rank.Jack)) && (this.doesIncludeRank(fiveCardHand, Rank.Queen)) && (this.doesIncludeRank(fiveCardHand, Rank.King)) && (this.doesIncludeRank(fiveCardHand, Rank.Nine)))) { rank = 121; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Ten) && (this.doesIncludeRank(fiveCardHand, Rank.Jack)) && (this.doesIncludeRank(fiveCardHand, Rank.Queen)) && (this.doesIncludeRank(fiveCardHand, Rank.Eight)) && (this.doesIncludeRank(fiveCardHand, Rank.Nine)))) { rank = 120; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Ten) && (this.doesIncludeRank(fiveCardHand, Rank.Jack)) && (this.doesIncludeRank(fiveCardHand, Rank.Seven)) && (this.doesIncludeRank(fiveCardHand, Rank.Eight)) && (this.doesIncludeRank(fiveCardHand, Rank.Nine)))) { rank = 119; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Ten) && (this.doesIncludeRank(fiveCardHand, Rank.Six)) && (this.doesIncludeRank(fiveCardHand, Rank.Seven)) && (this.doesIncludeRank(fiveCardHand, Rank.Eight)) && (this.doesIncludeRank(fiveCardHand, Rank.Nine)))) { rank = 118; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Five) && (this.doesIncludeRank(fiveCardHand, Rank.Six)) && (this.doesIncludeRank(fiveCardHand, Rank.Seven)) && (this.doesIncludeRank(fiveCardHand, Rank.Eight)) && (this.doesIncludeRank(fiveCardHand, Rank.Nine)))) { rank = 117; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Five) && (this.doesIncludeRank(fiveCardHand, Rank.Six)) && (this.doesIncludeRank(fiveCardHand, Rank.Seven)) && (this.doesIncludeRank(fiveCardHand, Rank.Eight)) && (this.doesIncludeRank(fiveCardHand, Rank.Four)))) { rank = 116; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Five) && (this.doesIncludeRank(fiveCardHand, Rank.Six)) && (this.doesIncludeRank(fiveCardHand, Rank.Seven)) && (this.doesIncludeRank(fiveCardHand, Rank.Three)) && (this.doesIncludeRank(fiveCardHand, Rank.Four)))) { rank = 115; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Five) && (this.doesIncludeRank(fiveCardHand, Rank.Six)) && (this.doesIncludeRank(fiveCardHand, Rank.Two)) && (this.doesIncludeRank(fiveCardHand, Rank.Three)) && (this.doesIncludeRank(fiveCardHand, Rank.Four)))) { rank = 114; }
      if((this.doesIncludeRank(fiveCardHand, Rank.Five) && (this.doesIncludeRank(fiveCardHand, Rank.Ace)) && (this.doesIncludeRank(fiveCardHand, Rank.Two)) && (this.doesIncludeRank(fiveCardHand, Rank.Three)) && (this.doesIncludeRank(fiveCardHand, Rank.Four)))) { rank = 113; }
      if(rank !== 0){ console.log('Straight'); }
    }

    // Three of a kind
    if(rank === 0){
      if(this.countRank(fiveCardHand, Rank.Ace) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 112 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.King) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
        rank = 111 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Queen) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 110 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Jack) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 109 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Ten) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 108 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Nine) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 107 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Eight) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 106 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Seven) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 105 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Six) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
        rank = 104 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Five) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
        rank = 103 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Four) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
        rank = 102 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Three) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
        rank = 101 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Two) === 3) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
        rank = 100 + this.rankKickers(fiveCardHand); 
      }

      if(rank !== 0){ console.log('Three of a Kind'); }
    }
    
    //Two pair
    if(rank === 0){
      // If pair of Aces and another Pair
      if(this.countRank(fiveCardHand, Rank.Ace) === 2) {
        if (this.countRank(fiveCardHand, Rank.King) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          rank = 99 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Queen) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          rank = 98 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Jack) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 97 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Ten) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 96 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Nine) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 95 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 94 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 93 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 92 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 91 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 90 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 89 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 88 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.King) === 2) {
        if (this.countRank(fiveCardHand, Rank.Queen) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          rank = 87 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Jack) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 86 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Ten) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 85 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Nine) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 84 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 83 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 82 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 81 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 80 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 79 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 78 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 77 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Queen) === 2) {
        if (this.countRank(fiveCardHand, Rank.Jack) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 76 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Ten) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 75 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Nine) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 74 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 73 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 72 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 71 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 70 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 69 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 68 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 67 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Jack) === 2) {
        if (this.countRank(fiveCardHand, Rank.Ten) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 66 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Nine) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 65 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 64 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 63 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 62 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 61 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 60 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 59 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 58 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Ten) === 2) {
        if (this.countRank(fiveCardHand, Rank.Nine) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 57 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 56 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 55 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 54 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 53 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 52 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 51 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 50 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Nine) === 2) {
        if(this.countRank(fiveCardHand, Rank.Eight) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 49 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 48 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 47 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 46 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 45 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 44 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 43 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Eight) === 2) {
        if (this.countRank(fiveCardHand, Rank.Seven) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 42 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 41 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 40 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 39 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 38 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 37 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Seven) === 2) {
        if (this.countRank(fiveCardHand, Rank.Six) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          rank = 36 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 35 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 34 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 33 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 32 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Six) === 2) {
        if (this.countRank(fiveCardHand, Rank.Five) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          rank = 31 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 30 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 29 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 28 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Five) === 2) {
        if (this.countRank(fiveCardHand, Rank.Four) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          rank = 27 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 26 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 25 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Four) === 2) {
        if (this.countRank(fiveCardHand, Rank.Three) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          rank = 24 + this.rankKickers(fiveCardHand); 
        } else if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 23 + this.rankKickers(fiveCardHand); 
        }
      } else if(this.countRank(fiveCardHand, Rank.Three) === 2) {
        if (this.countRank(fiveCardHand, Rank.Two) === 2) {
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
          fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
          rank = 22 + this.rankKickers(fiveCardHand); 
        }
      }
      
      if(rank !== 0){console.log('Two Pair'); }
    }
    
    // One Pair
    if(rank === 0){
      if(this.countRank(fiveCardHand, Rank.Ace) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 21 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.King) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
        rank = 20 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Queen) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 19 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Jack) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 18 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Ten) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 17 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Nine) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 16 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Eight) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 15 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Seven) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 14 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Six) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Six);
        rank = 13 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Five) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Five);
        rank = 12 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Four) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Four);
        rank = 11 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Three) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Three);
        rank = 10 + this.rankKickers(fiveCardHand); 
      } else if(this.countRank(fiveCardHand, Rank.Two) === 2) {
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Two);
        rank = 9 + this.rankKickers(fiveCardHand); 
      }
      if(rank !== 0){console.log('Pair'); }
    }

    // High Card
    if(rank === 0){
      if(this.countRank(fiveCardHand, Rank.Ace) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 8 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.King) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.King);
        rank = 7 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Queen) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 6 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Jack) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 5 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Ten) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 4 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Nine) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 3 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Eight) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 2 + this.rankKickers(fiveCardHand);
      } else if(this.countRank(fiveCardHand, Rank.Seven) > 0) { 
        fiveCardHand = fiveCardHand.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 1 + this.rankKickers(fiveCardHand);
      }
      if(rank !== 0){ console.log('High Card'); }
  }

    return rank;
  }

  public rankKickers(card: Card[]): number {
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

  // Counts each unique deck card once and returns number.
  public countRank(cardHand: Card[], rank: Rank): number { 
    let numCounted: number = 0;
    if(rank === Rank.Ace) {
      if ((cardHand.indexOf(Cards.AceClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.AceDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.AceHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.AceSpades) > -1)) numCounted++;
    }

    if(rank === Rank.King) {
      if ((cardHand.indexOf(Cards.KingClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.KingDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.KingHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.KingSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Queen) {
      if ((cardHand.indexOf(Cards.QueenClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.QueenDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.QueenHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.QueenSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Jack) {
      if ((cardHand.indexOf(Cards.JackClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.JackDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.JackHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.JackSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Ten) {
      if ((cardHand.indexOf(Cards.TenClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TenDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TenHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TenSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Nine) {
      if ((cardHand.indexOf(Cards.NineClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.NineDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.NineHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.NineSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Eight) {
      if ((cardHand.indexOf(Cards.EightClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.EightDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.EightHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.EightSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Seven) {
      if ((cardHand.indexOf(Cards.SevenClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SevenDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SevenHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SevenSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Six) {
      if ((cardHand.indexOf(Cards.SixClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SixDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SixHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.SixSpades) > -1)) numCounted++;
    }

    if(rank === Rank.Five) {
      if ((cardHand.indexOf(Cards.FiveClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FiveDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FiveHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FiveSpades) > -1)) numCounted++;
    }    

    if(rank === Rank.Four) {
      if ((cardHand.indexOf(Cards.FourClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FourDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FourHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.FourSpades) > -1)) numCounted++;
    }
        
    if(rank === Rank.Three) {
      if ((cardHand.indexOf(Cards.ThreeClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.ThreeDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.ThreeHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.ThreeSpades) > -1)) numCounted++;
    }
    
    if(rank === Rank.Two) {
      if ((cardHand.indexOf(Cards.TwoClubs) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TwoDiamonds) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TwoHearts) > -1)) numCounted++;
      if ((cardHand.indexOf(Cards.TwoSpades) > -1)) numCounted++;
    }

    return numCounted;
  }
  // Counts each unique deck card once and returns number.
  public countSuit(cardHand: Card[], suit: Suit): number { 
    let numCounted: number = 0;
    if(suit === Suit.Club) {
      const copyHand = cardHand;
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Club) numCounted++;
      }
    }

    if(suit === Suit.Diamond) {
      const copyHand = cardHand;
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Diamond) numCounted++;
      }
    }

    if(suit === Suit.Heart) {
      const copyHand = cardHand;
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Heart) numCounted++;
      }
    }

    if(suit === Suit.Spade) {
      const copyHand = cardHand;
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Spade) numCounted++;
      }
    }

    return numCounted;
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