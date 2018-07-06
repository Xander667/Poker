
import { Board } from "./Board";
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