
import { Board } from "./Board";
import { Card, Rank, Suit } from "./Card";
import { FiveCardHand } from "./FiveCardHand";
import { Hand } from "./Hand";
import { HandResult } from "./HandResult";

import Cards from "../constants/Cards";

export class Deck {
  public availableCards: Card[];
  public discardedCards: Card[];

  constructor() {
    this.availableCards = [];
    this.fillDeck();
    this.discardedCards = [];
  }
  
  // Returns all possible combinations size K within set
  public k_combinations(set: Card[], k: number): Card[][] {
    let cardIterator: number;
    let j: number;
    let combs: Card[][];
    let head: Card[];
    let tailcombs: Card[][];
    
    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
      return [];
    }
    
    // K-sized set has only one K-sized subset.
    if (k === set.length) {
      return [set];
    }
    
    // There is N 1-sized subsets in a N-sized set.
    if (k === 1) {
      combs = [];
      for (cardIterator = 0; cardIterator < set.length; cardIterator++) {
        combs.push([set[cardIterator]]);
      }
      return combs;
    }
    
    // Algorithm description:
    // To get k-combinations of a set, we want to join each element with all (k-1)-combinations of the other elements. The set of
    // these k-sized sets would be the desired result. However, as we represent sets with lists, we need to take duplicates into
    // account. To avoid producing duplicates and also unnecessary computing, we use the following approach: each element i
    // divides the list into three: the preceding elements, the current element i, and the subsequent elements. For the first
    // element, the list of preceding elements is empty. For element i, we compute the (k-1)-computations of the subsequent elements,
    // join each with the element i, and store the joined to the set of computed k-combinations. We do not need to take the preceding
    // elements into account, because they have already been the i:th element so they are already computed and stored. When the length
    // of the subsequent list drops below (k-1), we cannot find any (k-1)-combs, hence the upper limit for the iteration:
    combs = [];
    for (cardIterator = 0; cardIterator < set.length - k + 1; cardIterator++) {
      // head is a list that includes only our current element.
      head = set.slice(cardIterator, cardIterator + 1);  
      // We take smaller combinations from the subsequent elements
      tailcombs = this.k_combinations(set.slice(cardIterator + 1), k - 1);
      // For each (k-1)-combination we join it with the current
      // and store it to the set of k-combinations.
      for (j = 0; j < tailcombs.length; j++) {
        combs.push(head.concat(tailcombs[j]));
      }
    }
    return combs;
  }

  public getHand(): Hand {
    // Card 1
    let randomCard: number = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card1 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card1);

    // Card 2
    randomCard = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card2 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card2);

    return new Hand(card1, card2);
  }

  public getBoard(): Board {
    // Card 1
    let randomCard: number = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card1 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card1);

    // Card 2
    randomCard = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card2 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card2);

    // Card 3
    randomCard = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card3 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card3);

    // Card 4
    randomCard = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card4 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card4);

    // Card 5
    randomCard = Math.floor(Math.random() * Math.floor(this.availableCards.length));
    const card5 = this.availableCards[randomCard];

    this.availableCards.splice(randomCard, 1);
    this.discardedCards.push(card5);

    return new Board(card1, card2, card3, card4, card5);
  }

  public getHandValue(cards: Card[]): HandResult {
    let rank: number = 0;
    let kickerVal: number = 0;
    const fiveCardHand: FiveCardHand = new FiveCardHand(cards);
    let handMessage: string = "Invalid Hand";

    if (cards.length !== 5) { throw Error("Cards length = " + cards.length + ", instead of 5"); }

    // Four of a kind
    if (rank === 0) {
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
    if (rank === 0) {
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.King) === 2) { rank = 279; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2) { rank = 278; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2) { rank = 277; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2) { rank = 276; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2) { rank = 275; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2) { rank = 274; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2) { rank = 273; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2) { rank = 272; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2) { rank = 271; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2) { rank = 270; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2) { rank = 269; }
      if (fiveCardHand.countOfRank(Rank.Ace) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2) { rank = 268; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 267; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 266; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 265; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 264; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 263; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 262; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 261; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 260; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 259; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 258; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 257; }
      if (fiveCardHand.countOfRank(Rank.King) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 256; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 255; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 254; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 253; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 252; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 251; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 250; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 249; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 248; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 247; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 246; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 245; }
      if (fiveCardHand.countOfRank(Rank.Queen) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 244; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 243; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 242; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 241; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 240; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 239; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 238; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 237; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 236; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 235; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 234; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 233; }
      if (fiveCardHand.countOfRank(Rank.Jack) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 232; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 231; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 230; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 229; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 228; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 227; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 226; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 225; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 224; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 223; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 222; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 221; }
      if (fiveCardHand.countOfRank(Rank.Ten) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 220; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 219; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 218; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 217; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 216; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 215; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 214; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 213; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 212; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 211; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 210; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 209; }
      if (fiveCardHand.countOfRank(Rank.Nine) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 208; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 207; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 206; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 205; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 204; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 203; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 202; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 201; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 200; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 199; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 198; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 197; }
      if (fiveCardHand.countOfRank(Rank.Eight) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 196; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 195; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 194; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 193; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 192; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 191; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 190; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 189; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 188; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 187; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 186; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 185; }
      if (fiveCardHand.countOfRank(Rank.Seven) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 184; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 183; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 182; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 181; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 180; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 179; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 178; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 177; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 176; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 175; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 174; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 173; }
      if (fiveCardHand.countOfRank(Rank.Six) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 172; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 171; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 170; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 169; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 168; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 167; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 166; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 165; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 164; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 163; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 162; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 161; }
      if (fiveCardHand.countOfRank(Rank.Five) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 160; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 159; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 158; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 157; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 156; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 155; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 154; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 153; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 152; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 151; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 150; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 149; }
      if (fiveCardHand.countOfRank(Rank.Four) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 148; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 147; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 146; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 145; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 144; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 143; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 142; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 141; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 140; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 139; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 138; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 137; }
      if (fiveCardHand.countOfRank(Rank.Three) === 3 && fiveCardHand.countOfRank(Rank.Two) === 2 && rank === 0) { rank = 136; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Ace) === 2 && rank === 0) { rank = 135; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.King) === 2 && rank === 0) { rank = 134; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Queen) === 2 && rank === 0) { rank = 133; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Jack) === 2 && rank === 0) { rank = 132; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Ten) === 2 && rank === 0) { rank = 131; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Nine) === 2 && rank === 0) { rank = 130; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Eight) === 2 && rank === 0) { rank = 129; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Seven) === 2 && rank === 0) { rank = 128; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Six) === 2 && rank === 0) { rank = 127; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Five) === 2 && rank === 0) { rank = 126; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Four) === 2 && rank === 0) { rank = 125; }
      if (fiveCardHand.countOfRank(Rank.Two) === 3 && fiveCardHand.countOfRank(Rank.Three) === 2 && rank === 0) { rank = 124; }
      if (rank !== 0) { handMessage = 'Full House'; }
    }

    // Flush & Straight Flush
    if (rank === 0) {
      if ((this.countSuit(cards, Suit.Club) === 5) || (this.countSuit(cards, Suit.Diamond) === 5) || (this.countSuit(cards, Suit.Heart) === 5) || (this.countSuit(cards, Suit.Spade) === 5)) { rank = 123; }

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

      if (rank === 123) {
        rank = rank + this.rankKickers(cards);
        handMessage = "Flush";
      }
    }

    // Straight
    if (rank === 0) {
      if ((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.King)) && (this.doesIncludeRank(cards, Rank.Ace)))) { rank = 122; }
      if ((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.King)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 121; }
      if ((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Queen)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 120; }
      if ((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Jack)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 119; }
      if ((this.doesIncludeRank(cards, Rank.Ten) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 118; }
      if ((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Nine)))) { rank = 117; }
      if ((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Eight)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 116; }
      if ((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Seven)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 115; }
      if ((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Six)) && (this.doesIncludeRank(cards, Rank.Two)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 114; }
      if ((this.doesIncludeRank(cards, Rank.Five) && (this.doesIncludeRank(cards, Rank.Ace)) && (this.doesIncludeRank(cards, Rank.Two)) && (this.doesIncludeRank(cards, Rank.Three)) && (this.doesIncludeRank(cards, Rank.Four)))) { rank = 113; }
      if (rank !== 0) { handMessage = 'Straight'; }
    }

    // Three of a kind
    if (rank === 0) {
      if (fiveCardHand.countOfRank(Rank.Ace) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 112 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.King) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 111 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Queen) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 110 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Jack) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 109 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Ten) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 108 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Nine) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 107 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Eight) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 106 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Seven) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 105 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Six) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Six);
        rank = 104 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Five) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Five);
        rank = 103 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Four) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Four);
        rank = 102 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Three) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Three);
        rank = 101 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Two) === 3) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Two);
        rank = 100 + this.rankKickers(cards);
      }

      if (rank !== 0) { handMessage = 'Three of a Kind'; }
    }

    // Two pair
    if (rank === 0) {
      // If pair of Aces and another Pair
      if (fiveCardHand.countOfRank(Rank.Ace) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.King) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Queen) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Jack) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
        if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
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
      } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
        if (fiveCardHand.countOfRank(Rank.Three) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          rank = 24 + this.rankKickers(cards);
        } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Four);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 23 + this.rankKickers(cards);
        }
      } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
        if (fiveCardHand.countOfRank(Rank.Two) === 2) {
          cards = cards.filter((card: Card) => card.rank !== Rank.Three);
          cards = cards.filter((card: Card) => card.rank !== Rank.Two);
          rank = 22 + this.rankKickers(cards);
        }
      }

      if (rank !== 0) { handMessage = 'Two Pair'; }
    }

    // One Pair
    if (rank === 0) {
      if (fiveCardHand.countOfRank(Rank.Ace) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 21 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.King) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 20 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Queen) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 19 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Jack) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 18 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Ten) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 17 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Nine) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 16 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Eight) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 15 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Seven) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 14 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Six) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Six);
        rank = 13 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Five) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Five);
        rank = 12 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Four) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Four);
        rank = 11 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Three) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Three);
        rank = 10 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Two) === 2) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Two);
        rank = 9 + this.rankKickers(cards);
      }
      if (rank !== 0) { handMessage = "One Pair" }
    }

    // High Card
    if (rank === 0) {
      if (fiveCardHand.countOfRank(Rank.Ace) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ace);
        rank = 8 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.King) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.King);
        rank = 7 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Queen) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Queen);
        rank = 6 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Jack) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Jack);
        rank = 5 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Ten) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Ten);
        rank = 4 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Nine) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Nine);
        rank = 3 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Eight) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Eight);
        rank = 2 + this.rankKickers(cards);
      } else if (fiveCardHand.countOfRank(Rank.Seven) > 0) {
        cards = cards.filter((card: Card) => card.rank !== Rank.Seven);
        rank = 1 + this.rankKickers(cards);
      }
      if (rank !== 0) { handMessage = 'High Card'; }
    }


    const returnHandResult: HandResult = new HandResult(rank, handMessage);
    return returnHandResult;
  }

  // Takes a hand and returns an int score
  public scoreHand(sevenCardHand: Card[]): HandResult {
    const combinations: Card[][] = this.k_combinations(sevenCardHand, 5);
    let highestScore: HandResult = new HandResult(0, "No Hand");
    let result2: HandResult;
    for(let i=0; i<combinations.length; i++) {
      result2 = this.getHandValue(combinations[i]);
      if (highestScore.score < result2.score) {
        highestScore = result2;
        highestScore.hand = combinations[i];
      }
    }
    return highestScore;
  }

  public doesIncludeRank(cards: Card[], rank: Rank): boolean {
    // code to remove "o"
    if (rank === Rank.Ace) {
      if ((cards.indexOf(Cards.AceClubs) > -1) && (cards.indexOf(Cards.AceDiamonds) > -1) && (cards.indexOf(Cards.AceHearts) > -1) && (cards.indexOf(Cards.AceSpades) > -1)) { return true; }
    } else if (rank === Rank.King) {
      if ((cards.indexOf(Cards.KingClubs) > -1) && (cards.indexOf(Cards.KingDiamonds) > -1) && (cards.indexOf(Cards.KingHearts) > -1) && (cards.indexOf(Cards.KingSpades) > -1)) { return true; }
    } else if (rank === Rank.Queen) {
      if ((cards.indexOf(Cards.QueenClubs) > -1) && (cards.indexOf(Cards.QueenDiamonds) > -1) && (cards.indexOf(Cards.QueenHearts) > -1) && (cards.indexOf(Cards.QueenSpades) > -1)) { return true; }
    } else if (rank === Rank.Jack) {
      if ((cards.indexOf(Cards.JackClubs) > -1) && (cards.indexOf(Cards.JackDiamonds) > -1) && (cards.indexOf(Cards.JackHearts) > -1) && (cards.indexOf(Cards.JackSpades) > -1)) { return true; }
    } else if (rank === Rank.Ten) {
      if ((cards.indexOf(Cards.TenClubs) > -1) && (cards.indexOf(Cards.TenDiamonds) > -1) && (cards.indexOf(Cards.TenHearts) > -1) && (cards.indexOf(Cards.TenSpades) > -1)) { return true; }
    } else if (rank === Rank.Nine) {
      if ((cards.indexOf(Cards.NineClubs) > -1) && (cards.indexOf(Cards.NineDiamonds) > -1) && (cards.indexOf(Cards.NineHearts) > -1) && (cards.indexOf(Cards.NineSpades) > -1)) { return true; }
    } else if (rank === Rank.Eight) {
      if ((cards.indexOf(Cards.EightClubs) > -1) && (cards.indexOf(Cards.EightDiamonds) > -1) && (cards.indexOf(Cards.EightHearts) > -1) && (cards.indexOf(Cards.EightSpades) > -1)) { return true; }
    } else if (rank === Rank.Seven) {
      if ((cards.indexOf(Cards.SevenClubs) > -1) && (cards.indexOf(Cards.SevenDiamonds) > -1) && (cards.indexOf(Cards.SevenHearts) > -1) && (cards.indexOf(Cards.SevenSpades) > -1)) { return true; }
    } else if (rank === Rank.Six) {
      if ((cards.indexOf(Cards.SixClubs) > -1) && (cards.indexOf(Cards.SixDiamonds) > -1) && (cards.indexOf(Cards.SixHearts) > -1) && (cards.indexOf(Cards.SixSpades) > -1)) { return true; }
    } else if (rank === Rank.Five) {
      if ((cards.indexOf(Cards.FiveClubs) > -1) && (cards.indexOf(Cards.FiveDiamonds) > -1) && (cards.indexOf(Cards.FiveHearts) > -1) && (cards.indexOf(Cards.FiveSpades) > -1)) { return true; }
    } else if (rank === Rank.Four) {
      if ((cards.indexOf(Cards.FourClubs) > -1) && (cards.indexOf(Cards.FourDiamonds) > -1) && (cards.indexOf(Cards.FourHearts) > -1) && (cards.indexOf(Cards.FourSpades) > -1)) { return true; }
    } else if (rank === Rank.Three) {
      if ((cards.indexOf(Cards.ThreeClubs) > -1) && (cards.indexOf(Cards.ThreeDiamonds) > -1) && (cards.indexOf(Cards.ThreeHearts) > -1) && (cards.indexOf(Cards.ThreeSpades) > -1)) { return true; }
    } else if (rank === Rank.Two) {
      if ((cards.indexOf(Cards.TwoClubs) > -1) && (cards.indexOf(Cards.TwoDiamonds) > -1) && (cards.indexOf(Cards.TwoHearts) > -1) && (cards.indexOf(Cards.TwoSpades) > -1)) { return true; }
    }

    return false;
  }

  public rankKickers(card: Card[]): number {
    let i: number;
    let kickerRank: number;
    const myRanks: number[] = [];
    let rank: Rank;

    kickerRank = 0.0000;
    for (i = 0; i < card.length; i += 1) {
      rank = card.slice(i, i + 1)[0].rank;
      if (rank === Rank.Ace) { myRanks.push(0.2048); }
      if (rank === Rank.King) { myRanks.push(0.1024); }
      if (rank === Rank.Queen) { myRanks.push(0.0512); }
      if (rank === Rank.Jack) { myRanks.push(0.0256); }
      if (rank === Rank.Ten) { myRanks.push(0.0128); }
      if (rank === Rank.Nine) { myRanks.push(0.0064); }
      if (rank === Rank.Eight) { myRanks.push(0.0032); }
      if (rank === Rank.Seven) { myRanks.push(0.0016); }
      if (rank === Rank.Six) { myRanks.push(0.0008); }
      if (rank === Rank.Five) { myRanks.push(0.0004); }
      if (rank === Rank.Four) { myRanks.push(0.0002); }
      if (rank === Rank.Three) { myRanks.push(0.0001); }
      if (rank === Rank.Two) { myRanks.push(0.0000); }
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
    if (suit === Suit.Club) {
      const copyHand: Card[] = cardHand.slice();
      while (copyHand.length > 0) {
        if (copyHand.splice(0, 1)[0].suit === Suit.Club) numCounted++;
      }
    }

    if (suit === Suit.Diamond) {
      const copyHand: Card[] = cardHand.slice();
      while (copyHand.length > 0) {
        if (copyHand.splice(0, 1)[0].suit === Suit.Diamond) numCounted++;
      }
    }

    if (suit === Suit.Heart) {
      const copyHand: Card[] = cardHand.slice();
      while (copyHand.length > 0) {
        if (copyHand.splice(0, 1)[0].suit === Suit.Heart) numCounted++;
      }
    }

    if (suit === Suit.Spade) {
      const copyHand: Card[] = cardHand.slice();
      while (copyHand.length > 0) {
        if (copyHand.splice(0, 1)[0].suit === Suit.Spade) numCounted++;
      }
    }

    return numCounted;
  }

  // fills available cards with 52 correct cards
  private fillDeck(): void {
    this.availableCards.push(new Card(Suit.Club, Rank.Two));
    this.availableCards.push(new Card(Suit.Club, Rank.Three));
    this.availableCards.push(new Card(Suit.Club, Rank.Four));
    this.availableCards.push(new Card(Suit.Club, Rank.Five));
    this.availableCards.push(new Card(Suit.Club, Rank.Six));
    this.availableCards.push(new Card(Suit.Club, Rank.Seven));
    this.availableCards.push(new Card(Suit.Club, Rank.Eight));
    this.availableCards.push(new Card(Suit.Club, Rank.Nine));
    this.availableCards.push(new Card(Suit.Club, Rank.Ten));
    this.availableCards.push(new Card(Suit.Club, Rank.Jack));
    this.availableCards.push(new Card(Suit.Club, Rank.Queen));
    this.availableCards.push(new Card(Suit.Club, Rank.King));
    this.availableCards.push(new Card(Suit.Club, Rank.Ace));

    this.availableCards.push(new Card(Suit.Diamond, Rank.Two));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Three));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Four));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Five));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Six));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Seven));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Eight));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Nine));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Ten));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Jack));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Queen));
    this.availableCards.push(new Card(Suit.Diamond, Rank.King));
    this.availableCards.push(new Card(Suit.Diamond, Rank.Ace));

    this.availableCards.push(new Card(Suit.Heart, Rank.Two));
    this.availableCards.push(new Card(Suit.Heart, Rank.Three));
    this.availableCards.push(new Card(Suit.Heart, Rank.Four));
    this.availableCards.push(new Card(Suit.Heart, Rank.Five));
    this.availableCards.push(new Card(Suit.Heart, Rank.Six));
    this.availableCards.push(new Card(Suit.Heart, Rank.Seven));
    this.availableCards.push(new Card(Suit.Heart, Rank.Eight));
    this.availableCards.push(new Card(Suit.Heart, Rank.Nine));
    this.availableCards.push(new Card(Suit.Heart, Rank.Ten));
    this.availableCards.push(new Card(Suit.Heart, Rank.Jack));
    this.availableCards.push(new Card(Suit.Heart, Rank.Queen));
    this.availableCards.push(new Card(Suit.Heart, Rank.King));
    this.availableCards.push(new Card(Suit.Heart, Rank.Ace));

    this.availableCards.push(new Card(Suit.Spade, Rank.Two));
    this.availableCards.push(new Card(Suit.Spade, Rank.Three));
    this.availableCards.push(new Card(Suit.Spade, Rank.Four));
    this.availableCards.push(new Card(Suit.Spade, Rank.Five));
    this.availableCards.push(new Card(Suit.Spade, Rank.Six));
    this.availableCards.push(new Card(Suit.Spade, Rank.Seven));
    this.availableCards.push(new Card(Suit.Spade, Rank.Eight));
    this.availableCards.push(new Card(Suit.Spade, Rank.Nine));
    this.availableCards.push(new Card(Suit.Spade, Rank.Ten));
    this.availableCards.push(new Card(Suit.Spade, Rank.Jack));
    this.availableCards.push(new Card(Suit.Spade, Rank.Queen));
    this.availableCards.push(new Card(Suit.Spade, Rank.King));
    this.availableCards.push(new Card(Suit.Spade, Rank.Ace));
  }
}