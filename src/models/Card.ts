export class Card {
    public suit: number;
    public rank: number;
  
    constructor(suit?: Suit, rank?: Rank) {

      if(suit) {
        this.suit = suit;
      } else {
        this.suit = this.setSuit();
      }

      if(rank) {
        this.rank = rank;
      } else {
        this.rank = this.setRank();
      }
    }
  
    private setSuit(): number {
      const randomSuit: number = Math.floor(Math.random() * Math.floor(4));
      return randomSuit;
    }

    private setRank(): number {
        const randomRank: number = Math.floor(Math.random() * Math.floor(13));
        return Rank[randomRank.toString()];
    }
  }
  
  export enum Suit {
     spade,
     heart,
     diamond,
     club
   }
  
   export enum Rank {
    Two = 0,
    Three = 1,
    Four = 2,
    Five = 3,
    Six = 4,
    Seven = 5,
    Eight = 6,
    Nine = 7,
    Ten = 8,
    Jack = 9,
    Queen = 10,
    King = 11,
    Ace = 12
  }