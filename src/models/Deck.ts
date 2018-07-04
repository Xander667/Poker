import { Card, Rank, Suit } from "./Card";
import { Hand } from "./Hand";

export class Deck {
    public availableCards: Card[];
    public discardedCards: Card[];
  
    constructor() {
        this.availableCards = [];
        this.fillDeck();
        this.discardedCards = [];
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


    // fills available cards with 52 correct cards
    private fillDeck(): void {
        this.availableCards.push(new Card(Suit.club, Rank.Two));
        this.availableCards.push(new Card(Suit.club, Rank.Three));
        this.availableCards.push(new Card(Suit.club, Rank.Four));
        this.availableCards.push(new Card(Suit.club, Rank.Five));
        this.availableCards.push(new Card(Suit.club, Rank.Six));
        this.availableCards.push(new Card(Suit.club, Rank.Seven));
        this.availableCards.push(new Card(Suit.club, Rank.Eight));
        this.availableCards.push(new Card(Suit.club, Rank.Nine));
        this.availableCards.push(new Card(Suit.club, Rank.Ten));
        this.availableCards.push(new Card(Suit.club, Rank.Jack));
        this.availableCards.push(new Card(Suit.club, Rank.Queen));
        this.availableCards.push(new Card(Suit.club, Rank.King));
        this.availableCards.push(new Card(Suit.club, Rank.Ace));

        this.availableCards.push(new Card(Suit.diamond, Rank.Two));
        this.availableCards.push(new Card(Suit.diamond, Rank.Three));
        this.availableCards.push(new Card(Suit.diamond, Rank.Four));
        this.availableCards.push(new Card(Suit.diamond, Rank.Five));
        this.availableCards.push(new Card(Suit.diamond, Rank.Six));
        this.availableCards.push(new Card(Suit.diamond, Rank.Seven));
        this.availableCards.push(new Card(Suit.diamond, Rank.Eight));
        this.availableCards.push(new Card(Suit.diamond, Rank.Nine));
        this.availableCards.push(new Card(Suit.diamond, Rank.Ten));
        this.availableCards.push(new Card(Suit.diamond, Rank.Jack));
        this.availableCards.push(new Card(Suit.diamond, Rank.Queen));
        this.availableCards.push(new Card(Suit.diamond, Rank.King));
        this.availableCards.push(new Card(Suit.diamond, Rank.Ace));
        
        this.availableCards.push(new Card(Suit.heart, Rank.Two));
        this.availableCards.push(new Card(Suit.heart, Rank.Three));
        this.availableCards.push(new Card(Suit.heart, Rank.Four));
        this.availableCards.push(new Card(Suit.heart, Rank.Five));
        this.availableCards.push(new Card(Suit.heart, Rank.Six));
        this.availableCards.push(new Card(Suit.heart, Rank.Seven));
        this.availableCards.push(new Card(Suit.heart, Rank.Eight));
        this.availableCards.push(new Card(Suit.heart, Rank.Nine));
        this.availableCards.push(new Card(Suit.heart, Rank.Ten));
        this.availableCards.push(new Card(Suit.heart, Rank.Jack));
        this.availableCards.push(new Card(Suit.heart, Rank.Queen));
        this.availableCards.push(new Card(Suit.heart, Rank.King));
        this.availableCards.push(new Card(Suit.heart, Rank.Ace));
        
        this.availableCards.push(new Card(Suit.spade, Rank.Two));
        this.availableCards.push(new Card(Suit.spade, Rank.Three));
        this.availableCards.push(new Card(Suit.spade, Rank.Four));
        this.availableCards.push(new Card(Suit.spade, Rank.Five));
        this.availableCards.push(new Card(Suit.spade, Rank.Six));
        this.availableCards.push(new Card(Suit.spade, Rank.Seven));
        this.availableCards.push(new Card(Suit.spade, Rank.Eight));
        this.availableCards.push(new Card(Suit.spade, Rank.Nine));
        this.availableCards.push(new Card(Suit.spade, Rank.Ten));
        this.availableCards.push(new Card(Suit.spade, Rank.Jack));
        this.availableCards.push(new Card(Suit.spade, Rank.Queen));
        this.availableCards.push(new Card(Suit.spade, Rank.King));
        this.availableCards.push(new Card(Suit.spade, Rank.Ace));
    }
  }