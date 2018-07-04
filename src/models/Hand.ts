import { Card } from "./Card";

export class Hand {
    public card1: Card;
    public card2: Card;
  
    constructor(card1: Card, card2: Card) {
        if(card1 === card2) {
            throw Error("Can't have two of the same card");
        }

        if(card1) {
        this.card1 = card1;
        } 

        if(card2) {
        this.card2 = card2;
        }
    }
  }