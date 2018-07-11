import * as React from 'react';
import { Board } from "../src/models/Board";
import { Card, Rank, Suit} from "../src/models/Card";
import './App.css';

import { logo } from './logo.svg';

import Cards from './constants/Cards';
import { Deck } from './models/Deck';
import { FiveCardHand } from './models/FiveCardHand';
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

    // Player 1 seven cards
    const fullhand: Card[] = this.state.board.cards.slice();
    fullhand.push(this.state.hand1.card1);
    fullhand.push(this.state.hand1.card2);

    return(
      <div id="handArea" style={style}>
        <div>
          Player # {  playerNumber }
          Score: { this.scoreHand(fullhand) }
        </div>
        {this.renderCard(hand.card1)}
        {this.renderCard(hand.card2)}
      </div>
    );
  }

  // Takes a hand and returns an int score
  public scoreHand(sevenCardHand: Card[]): { score: number, handMessage: string} {
    // A hand has 7 possible cards and we need the 
    // combination of 5 that makes the strongest hand 
    // rank and then return that hand's score value
    const currentHand: Card[] = sevenCardHand;
    const extraCards: Card[] = [];
    let highestScore: { rank: number, message: string} = { 0, "Invalid"};

    // Add first two cards to extra set and remove form current hand.
    extraCards.push(sevenCardHand[0]);
    extraCards.push(sevenCardHand[1]);
    currentHand.splice(0, 1);
    currentHand.splice(0, 1);
    highestScore = this.getHandValue(currentHand);

    for(const hand of currentHand) {
      for(let y=0; y<3; y++) {
        // Remove first from our hand
        extraCards.push(hand);
        currentHand.splice(0, 1);

        currentHand.push(extraCards[0]);
        const result1 = this.getHandValue(currentHand);
        const result2 = this.getHandValue(currentHand);
        if (highestScore < result2.rank) {
          highestScore = result2.rank;
          }
        }
    }
    return { , };
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

  public getHandValue(cards: Card[]): { rank: number, handMessage: string } {
    let rank: number = 0;
    let kickerVal: number = 0;
    const fiveCardHand: FiveCardHand = new FiveCardHand(cards);
    let handMessage: string = "Invalid Hand";

    // Four of a kind
    if(rank === 0) {
      if ((cards.indexOf(Cards.AceClubs) > -1) && (cards.indexOf(Cards.AceDiamonds) > -1) && (cards.indexOf(Cards.AceHearts) > -1) && (cards.indexOf(Cards.AceSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 292;
        }

      if ((cards.indexOf(Cards.KingClubs) > -1) && (cards.indexOf(Cards.KingDiamonds) > -1) && (cards.indexOf(Cards.KingHearts) > -1) && (cards.indexOf(Cards.KingSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 291;
      }

      if ((cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.QueenSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 291;
      }

      if ((cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.JackSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 291;
      }

      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.TenSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 291;
      }

      if ((cards.indexOf(Cards.NineClubs) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1) && (cards.indexOf(Cards.NineHearts) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 291;
      }

      if ((cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.EightSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 291;
      }

      if ((cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.SevenSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 291;
      }

      if ((cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SixSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Six);
        rank = 291;
      }

      if ((cards.indexOf(Cards.FiveClubs) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1) && (cards.indexOf(Cards.FiveHearts) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Five);
        rank = 291;
      }

      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.FourSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Four);
        rank = 291;
      }

      if ((cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Three);
        rank = 291;
      }

      if ((cards.indexOf(Cards.TwoClubs) > -1) && (cards.indexOf(Cards.TwoDiamonds) > -1) && (cards.indexOf(Cards.TwoHearts) > -1) && (cards.indexOf(Cards.TwoSpades) > -1)) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Two);
        rank = 291;
      }

      // If we hit quads calc kicker value and return total.
      if (rank !== 0) {
        kickerVal = this.rankKickers(cards);
        rank += kickerVal;
        handMessage = "Four of a kind";
      }
    }

    // Full House
    if(rank === 0) {
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.King) === 2) { rank = 279; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2) { rank = 278; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2) { rank = 277; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2) { rank = 276; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2) { rank = 275; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2) { rank = 274; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2) { rank = 273; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2) { rank = 272; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2) { rank = 271; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2) { rank = 270; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2) { rank = 269; }    
      if(fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2) { rank = 268; }    
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 267; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 266; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 265; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 264; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 263; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 262; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 261; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 260; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 259; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 258; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 257; }
      if(fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 256; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 255; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 254; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 253; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 252; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 251; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 250; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 249; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 248; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 247; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 246; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 245; }
      if(fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 244; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 243; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 242; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 241; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 240; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 239; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 238; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 237; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 236; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 235; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 234; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 233; }
      if(fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 232; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 231; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 230; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 229; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 228; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 227; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 226; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 225; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 224; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Five) ===2 && rank === 0){rank = 223; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 222; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 221; }
      if(fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 220; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 219; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 218; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 217; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 216; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 215; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 214; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 213; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 212; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 211; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 210; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 209; }
      if(fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 208; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 207; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 206; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 205; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 204; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 203; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 202; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 201; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 200; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 199; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 198; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 197; }
      if(fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 196; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 195; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 194; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 193; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 192; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 191; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 190; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 189; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 188; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 187; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 186; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 185; }
      if(fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 184; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 183; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 182; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 181; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 180; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 179; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 178; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 177; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 176; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 175; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 174; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 173; }
      if(fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 172; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 171; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 170; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 169; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 168; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 167; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 166; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 165; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 164; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 163; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 162; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 161; }
      if(fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 160; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 159; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 158; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 157; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 156; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 155; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 154; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 153; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 152; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 151; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 150; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 149; }
      if(fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 148; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 147; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 146; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 145; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 144; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 143; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 142; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 141; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 140; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 139; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 138; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 137; }
      if(fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0){rank = 136; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0){rank = 135; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0){rank = 134; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0){rank = 133; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0){rank = 132; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0){rank = 131; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0){rank = 130; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0){rank = 129; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0){rank = 128; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0){rank = 127; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0){rank = 126; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0){rank = 125; }
      if(fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0){rank = 124; }
      if(rank !== 0){ handMessage =  'Full House'; }
    }

    // Flush & Straight Flush
    if(rank === 0) {
      if((this.countSuit(cards, Suit.Club) === 5) || (this.countSuit(cards, Suit.Diamond) === 5) || (this.countSuit(cards, Suit.Heart) === 5) || (this.countSuit(cards, Suit.Spade) === 5)) { rank = 123; }

      // Straight flush
      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.KingClubs) > -1) && (cards.indexOf(Cards.AceClubs) > -1)) { rank = 302; }
      if ((cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.KingDiamonds) > -1) && (cards.indexOf(Cards.AceDiamonds) > -1)) { rank = 302; }
      if ((cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.KingHearts) > -1) && (cards.indexOf(Cards.AceHearts) > -1)) { rank = 302; }
      if ((cards.indexOf(Cards.TenSpades) > -1) && (cards.indexOf(Cards.JackSpades) > -1) && (cards.indexOf(Cards.QueenSpades) > -1) && (cards.indexOf(Cards.KingSpades) > -1) && (cards.indexOf(Cards.AceSpades) > -1)) { rank = 302; }
      
      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.KingClubs) > -1) && (cards.indexOf(Cards.NineClubs) > -1)) { rank = 301; }
      if ((cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.KingDiamonds) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1)) { rank = 301; }
      if ((cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.KingHearts) > -1) && (cards.indexOf(Cards.NineHearts) > -1)) { rank = 301; }
      if ((cards.indexOf(Cards.TenSpades) > -1) && (cards.indexOf(Cards.JackSpades) > -1) && (cards.indexOf(Cards.QueenSpades) > -1) && (cards.indexOf(Cards.KingSpades) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { rank = 301; }
   
      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.NineClubs) > -1)) { rank = 300; }
      if ((cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1)) { rank = 300; }
      if ((cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.NineHearts) > -1)) { rank = 300; }
      if ((cards.indexOf(Cards.TenSpades) > -1) && (cards.indexOf(Cards.JackSpades) > -1) && (cards.indexOf(Cards.QueenSpades) > -1) && (cards.indexOf(Cards.EightSpades) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { rank = 300; }

      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.NineClubs) > -1)) { rank = 299; }
      if ((cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1)) { rank = 299; }
      if ((cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.NineHearts) > -1)) { rank = 299; }
      if ((cards.indexOf(Cards.TenSpades) > -1) && (cards.indexOf(Cards.JackSpades) > -1) && (cards.indexOf(Cards.SevenSpades) > -1) && (cards.indexOf(Cards.EightSpades) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { rank = 299; }

      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.NineClubs) > -1)) { rank = 298; }
      if ((cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1)) { rank = 298; }
      if ((cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.NineHearts) > -1)) { rank = 298; }
      if ((cards.indexOf(Cards.TenSpades) > -1) && (cards.indexOf(Cards.SixSpades) > -1) && (cards.indexOf(Cards.SevenSpades) > -1) && (cards.indexOf(Cards.EightSpades) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { rank = 298; }

      if ((cards.indexOf(Cards.NineClubs) > -1) && (cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.FiveClubs) > -1)) { rank = 297; }
      if ((cards.indexOf(Cards.NineDiamonds) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1)) { rank = 297; }
      if ((cards.indexOf(Cards.NineHearts) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.FiveHearts) > -1)) { rank = 297; }
      if ((cards.indexOf(Cards.NineSpades) > -1) && (cards.indexOf(Cards.SixSpades) > -1) && (cards.indexOf(Cards.SevenSpades) > -1) && (cards.indexOf(Cards.EightSpades) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { rank = 297; }

      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.FiveClubs) > -1)) { rank = 296; }
      if ((cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1)) { rank = 296; }
      if ((cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.FiveHearts) > -1)) { rank = 296; }
      if ((cards.indexOf(Cards.FourSpades) > -1) && (cards.indexOf(Cards.SixSpades) > -1) && (cards.indexOf(Cards.SevenSpades) > -1) && (cards.indexOf(Cards.EightSpades) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { rank = 296; }

      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.FiveClubs) > -1)) { rank = 295; }
      if ((cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1)) { rank = 295; }
      if ((cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.FiveHearts) > -1)) { rank = 295; }
      if ((cards.indexOf(Cards.FourSpades) > -1) && (cards.indexOf(Cards.SixSpades) > -1) && (cards.indexOf(Cards.SevenSpades) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { rank = 295; }

      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.TwoClubs) > -1) && (cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.FiveClubs) > -1)) { rank = 294; }
      if ((cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.TwoDiamonds) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1)) { rank = 294; }
      if ((cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.TwoHearts) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.FiveHearts) > -1)) { rank = 294; }
      if ((cards.indexOf(Cards.FourSpades) > -1) && (cards.indexOf(Cards.SixSpades) > -1) && (cards.indexOf(Cards.TwoSpades) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { rank = 294; }

      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.AceClubs) > -1) && (cards.indexOf(Cards.TwoClubs) > -1) && (cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.FiveClubs) > -1)) { rank = 293; }
      if ((cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.AceDiamonds) > -1) && (cards.indexOf(Cards.TwoDiamonds) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1)) { rank = 293; }
      if ((cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.AceHearts) > -1) && (cards.indexOf(Cards.TwoHearts) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.FiveHearts) > -1)) { rank = 293; }
      if ((cards.indexOf(Cards.FourSpades) > -1) && (cards.indexOf(Cards.AceSpades) > -1) && (cards.indexOf(Cards.TwoSpades) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { rank = 293; }

      if(rank === 123){
        rank = rank + this.rankKickers(cards);
        handMessage = "Flush";
      }
    }

    // Straight
    if(rank === 0){
      if((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.King)) && (this.doesIncludeRank(cards, Rank.Ace)))) { rank = 122; }
      if((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.King)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 121; }
      if((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 120; }
      if((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 119; }
      if((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 118; }
      if((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 117; }
      if((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 116; }
      if((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 115; }
      if((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Two)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 114; }
      if((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Ace)) && (this.doesIncludeRank(cards, Rank.Two)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 113; }
      if(rank !== 0){ handMessage = 'Straight'; }
    }

    // Three of a kind
    if(rank === 0){
      if(fiveCardHand.countOfRank(Rank.Ace) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 112 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.King) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 111 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Queen) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 110 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Jack) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 109 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Ten) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 108 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Nine) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 107 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Eight) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 106 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Seven) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 105 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Six) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Six);
        rank = 104 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Five) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Five);
        rank = 103 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Four) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Four);
        rank = 102 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Three) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Three);
        rank = 101 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Two) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Two);
        rank = 100 + this.rankKickers(cards); 
      }

      if(rank !== 0){ handMessage = 'Three of a Kind'; }
    }
    
    // Two pair
    if(rank === 0){
      // If pair of Aces and another Pair
      if(fiveCardHand.countOfRank(Rank.Ace) === 2) {
        if (fiveCardHand.countOfRank(Rank.King) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          rank = 99 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Queen) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          rank = 98 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Jack) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 97 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 96 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 95 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 94 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 93 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 92 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 91 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 90 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 89 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 88 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.King) === 2) {
        if (fiveCardHand.countOfRank(Rank.Queen) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          rank = 87 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Jack) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 86 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 85 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 84 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 83 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 82 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 81 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 80 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 79 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 78 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.King);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 77 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Queen) === 2) {
        if (fiveCardHand.countOfRank(Rank.Jack) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          rank = 76 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 75 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 74 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 73 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 72 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 71 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 70 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 69 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 68 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 67 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Jack) === 2) {
        if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          rank = 66 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 65 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 64 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 63 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 62 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 61 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 60 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 59 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 58 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Ten) === 2) {
        if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          rank = 57 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 56 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 55 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 54 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 53 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 52 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 51 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 50 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Nine) === 2) {
        if(fiveCardHand.countOfRank(Rank.Eight) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          rank = 49 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 48 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 47 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 46 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 45 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 44 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 43 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Eight) === 2) {
        if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          rank = 42 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 41 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 40 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 39 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 38 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 37 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Seven) === 2) {
        if (fiveCardHand.countOfRank(Rank.Six) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          rank = 36 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 35 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 34 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 33 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 32 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Six) === 2) {
        if (fiveCardHand.countOfRank(Rank.Five) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          rank = 31 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 30 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 29 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Six);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 28 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Five) === 2) {
        if (fiveCardHand.countOfRank(Rank.Four) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          rank = 27 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 26 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Five);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 25 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Four) === 2) {
        if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 24 + this.rankKickers(cards); 
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 23 + this.rankKickers(cards); 
        }
      } else if(fiveCardHand.countOfRank(Rank.Three) === 2) {
        if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 22 + this.rankKickers(cards); 
        }
      }
      
      if(rank !== 0){handMessage = 'Two Pair'; }
    }
    
    // One Pair
    if(rank === 0){
      if(fiveCardHand.countOfRank(Rank.Ace) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 21 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.King) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 20 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Queen) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 19 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Jack) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 18 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Ten) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 17 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Nine) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 16 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Eight) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 15 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Seven) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 14 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Six) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Six);
        rank = 13 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Five) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Five);
        rank = 12 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Four) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Four);
        rank = 11 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Three) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Three);
        rank = 10 + this.rankKickers(cards); 
      } else if(fiveCardHand.countOfRank(Rank.Two) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Two);
        rank = 9 + this.rankKickers(cards); 
      }
      if(rank !== 0){console.log('Pair'); }
    }

    // High Card
    if(rank === 0){
      if(fiveCardHand.countOfRank(Rank.Ace) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 8 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.King) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 7 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Queen) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 6 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Jack) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 5 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Ten) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 4 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Nine) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 3 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Eight) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 2 + this.rankKickers(cards);
      } else if(fiveCardHand.countOfRank(Rank.Seven) > 0) { 
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 1 + this.rankKickers(cards);
      }
      if(rank !== 0){ handMessage = 'High Card'; }
    } 

    return { rank, handMessage };
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
  public countSuit(cardHand: Card[], suit: Suit): number { 
    let numCounted: number = 0;
    if(suit === Suit.Club) {
      const copyHand: Card[] = cardHand.slice();
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Club) numCounted++;
      }
    }

    if(suit === Suit.Diamond) {
      const copyHand: Card[] = cardHand.slice();
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Diamond) numCounted++;
      }
    }

    if(suit === Suit.Heart) {
      const copyHand: Card[] = cardHand.slice();
      while(copyHand.length > 0) {
        if (copyHand.splice(0,1)[0].suit === Suit.Heart) numCounted++;
      }
    }

    if(suit === Suit.Spade) {
      const copyHand: Card[] = cardHand.slice();
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
    const newBoard = this.state.deck.getBoard();
    this.setState({hand1: newHand, hand2: newHand2, board: newBoard });
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