import { CardModel } from "./CardModel";

export class Hand {
    public card1: CardModel;
    public card2: CardModel;
  
    constructor(card1: CardModel, card2: CardModel) {
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