import { Card, Rank, Suit } from "./Card";

export class Board {
    public cards: Card[];
  
    constructor(card1: Card, card2: Card, card3: Card, card4: Card, card5: Card) {
        this.cards = [];
        this.cards.push(new Card(Suit.Club, Rank.Ace));
        this.cards.push(new Card(Suit.Spade, Rank.Ace));
        this.cards.push(new Card(Suit.Heart, Rank.Ace));
        this.cards.push(new Card(Suit.Diamond, Rank.Ace));
        this.cards.push(card5);
    }
  }