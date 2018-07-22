import * as React from 'react';
import { CardModel, Suit} from "../src/models/CardModel";
import './Card.css';
interface ICardProps {
    card: CardModel;
}

class Card extends React.Component<ICardProps, {}> {

  constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <div id="card">
        { this.renderTopSuit() }
        { this.renderMiddleRankSuit() }
        { this.renderBottomSuit() }
      </div>
    );
  }

  public renderMiddleRankSuit(): JSX.Element {
    return (
      <div id="middle">
          { this.renderSuit(this.props.card.suit) }
          { this.props.card.getRankDisplayName() }
      </div>
    );
  }

  public renderBottomSuit(): JSX.Element {
    return (
      <div id="bottom">
          { this.renderSuit(this.props.card.suit) }
      </div>
    );
  }

  public renderTopSuit(): JSX.Element {
    return (
      <div id="top">
          { this.renderSuit(this.props.card.suit) }
      </div>
    );
  }

  // Returns a JSX with the correct suit
  public renderSuit(suit: Suit): JSX.Element {
    let style: React.CSSProperties = {};
    
    if(suit === Suit.Club || suit === Suit.Spade) {
      style = {
        backgroundColor: "white"
      }; 
    } else if (suit === Suit.Diamond || suit === Suit.Heart) {
      style = {
        color: "red"
      }; 
    }

    if(suit === Suit.Club) {
      return (
        <div style={style}>
          &clubs;
        </div> 
      );
    } else if(suit === Suit.Diamond) {
      return (
        <div style={style}>
          &diams;
        </div> 
      );
    } else if(suit === Suit.Heart) {
      return (
        <div style={style}>
          &hearts;
        </div> 
      );
    } else if(suit === Suit.Spade) {
      return (
        <div style={style}>
          &spades;
        </div> 
      );
    }
    return (
      <div/>
    );
  }
}
export default Card;