import { CardModel, Rank, Suit } from "./CardModel";

export class FiveCardHand {
    public cards: CardModel[]; // Should have 5
  
    constructor(cards: CardModel[]) {
        this.cards = cards;
    }


    // Count how many of a rank are in a hand, e.g. how many A in AAAQQ
    public countOfRank(rank: Rank): number {
        let count: number = 0;
        this.cards.forEach(cardInHand => {
            if(cardInHand.rank === rank) { 
                count++; 
            }
        });
        
        return count;
    }

    // Take a hand of 5 cards and return true if a card is found.
    public containsCard(card: CardModel): boolean {
        let foundIt: boolean = false;
        this.cards.forEach(cardInHand => {
            if((cardInHand.rank === card.rank) && (cardInHand.suit === card.suit)) { 
                foundIt = true; 
            }
        });
        
        return foundIt;
    }

    // Take a hand of 5 cards and return true if a card is found.
    public containsRank(rank: Rank): boolean {
        let foundIt: boolean = false;
        this.cards.forEach(cardInHand => {
            if(cardInHand.rank === rank) { 
                foundIt = true; 
            }
        });
        
        return foundIt;
    }

    
    // Take a hand of 5 cards and return true if a certain suit exists
    public containsSuit(suit: Suit): boolean {
        let foundIt: boolean = false;
        this.cards.forEach(cardInHand => {
            if(cardInHand.suit === suit) { 
                foundIt = true; 
            }
        });
        
        return foundIt;
    }
  }