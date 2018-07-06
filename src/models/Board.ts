import { Card } from "./Card";

export class Board {
    public cards: Card[];
  
    constructor(card1: Card, card2: Card, card3: Card, card4: Card, card5: Card) {
        this.cards = [];
        this.cards.push(card1);
        this.cards.push(card2);
        this.cards.push(card3);
        this.cards.push(card4);
        this.cards.push(card5);
    }
  }