export class CardModel {
    public suit: Suit;
    public rank: Rank;
    public availableSuits: Suit[];
    public availableRanks: Rank[];


    constructor(suit: Suit, rank: Rank) {
        this.setAvailableRanks();
        this.setAvailableSuits();
      
        this.suit = suit;
        this.rank = rank;
    }
  
    // private setSuit(): Suit {
    //   const randomSuit: number = Math.floor(Math.random() * Math.floor(4));
    //   return randomSuit;
    // }

    // private setRank(): Rank {
    //     const randomRank: number = Math.floor(Math.random() * Math.floor(13));
    //     return Rank[randomRank.toString()];
    // }
    public getRankName(): string {
      if(this.rank === Rank.Ace) {
        return "Ace";
      } else if(this.rank === Rank.Two) {
        return "Two";
      } else if(this.rank === Rank.Three) {
        return "Three";
      } else if(this.rank === Rank.Four) {
        return "Four";
      } else if(this.rank === Rank.Five) {
        return "Five";
      } else if(this.rank === Rank.Six) {
        return "Six";
      } else if(this.rank === Rank.Seven) {
        return "Seven";
      } else if(this.rank === Rank.Eight) {
        return "Eight";
      } else if(this.rank === Rank.Nine) {
        return "Nine";
      } else if(this.rank === Rank.Ten) {
        return "Ten";
      } else if(this.rank === Rank.Jack) {
        return "Jack";
      } else if(this.rank === Rank.Queen) {
        return "Queen";
      } else if(this.rank === Rank.King) {
        return "King";
      } else {
        return "Error suit in getRankName";
      }
    }

    public getSuitName(): string {
      if(this.suit === Suit.Club) {
        return "Clubs";
      } else if(this.suit === Suit.Diamond) {
        return "Diamonds";
      } else if(this.suit === Suit.Heart) {
        return "Hearts";
      } else if(this.suit === Suit.Spade) {
        return "Spades";
      } else {
        return "Error suit in getSuitName";
      }
    }

    private setAvailableSuits() {
      this.availableRanks = [];
      this.availableRanks.push(Rank.Two);
      this.availableRanks.push(Rank.Ace);
    }

    private setAvailableRanks() {
      this.availableRanks = [];
      this.availableRanks.push(Rank.Two);
      this.availableRanks.push(Rank.Ace);
    }
  }

  export enum Suit {
     Spade = "Spade",
     Heart = "Heart",
     Diamond = "Diamond",
     Club = "Club"
   }
  
   export enum Rank {
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
    Six = "Six",
    Seven = "Seven",
    Eight = "Eight",
    Nine = "Nine",
    Ten = "Ten",
    Jack = "Jack",
    Queen = "Queen",
    King = "King",
    Ace = "Ace"
  }