import { CardModel } from "./CardModel";

export class Board {
    public cards: CardModel[];
  
    constructor(card1: CardModel, card2: CardModel, card3: CardModel, card4: CardModel, card5: CardModel) {
        this.cards = [];
        this.cards.push(card1);
        this.cards.push(card2);
        this.cards.push(card3);
        this.cards.push(card4);
        this.cards.push(card5);
    }
  }