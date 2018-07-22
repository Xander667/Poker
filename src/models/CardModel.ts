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
  
    public getRankDisplayName(): string {
      if(this.rank === Rank.Ace) {
        return "A";
      } else if(this.rank === Rank.Two) {
        return "2";
      } else if(this.rank === Rank.Three) {
        return "3";
      } else if(this.rank === Rank.Four) {
        return "4";
      } else if(this.rank === Rank.Five) {
        return "5";
      } else if(this.rank === Rank.Six) {
        return "6";
      } else if(this.rank === Rank.Seven) {
        return "7";
      } else if(this.rank === Rank.Eight) {
        return "8";
      } else if(this.rank === Rank.Nine) {
        return "9";
      } else if(this.rank === Rank.Ten) {
        return "T";
      } else if(this.rank === Rank.Jack) {
        return "J";
      } else if(this.rank === Rank.Queen) {
        return "Q";
      } else if(this.rank === Rank.King) {
        return "K";
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