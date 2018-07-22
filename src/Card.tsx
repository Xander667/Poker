import * as React from 'react';
import { CardModel, Suit} from "../src/models/CardModel";
import './Card.css';
interface ICardProps {
    /** The model of the card we want to render */
    card: CardModel;

    /** Optional prop to decide if we should render full sized cards (default) or a mini version for results and chat */
    miniCards?: boolean;
}

class Card extends React.Component<ICardProps, {}> {

  constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    if(this.props.miniCards) {
      return (
        <div id="miniCard">
          { this.renderMiddleRankSuit() }
        </div>
      );
    } else {
      return (
        <div id="card">
          { this.renderTopSuit() }
          { this.renderMiddleRankSuit() }
          { this.renderBottomSuit() }
        </div>
      );
    }
  }

  public renderMiddleRankSuit(): JSX.Element {
    return (
      <div id="middle">
            { this.props.card.getRankDisplayName() }
            { this.renderSuit(this.props.card.suit) }
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
    const style: React.CSSProperties = {};
    
    if(this.props.miniCards) {
      style.height = "10px";
      style.position = "relative";
      style.bottom = "10px";
    }

    let suitUnicode: string = "ErrorSuit";
    if(suit === Suit.Club) {
      // style.backgroundColor = "white";
      suitUnicode = "\u2663";
    } else if(suit === Suit.Diamond) {
      style.color = "red"
      suitUnicode = "\u2666";
    } else if(suit === Suit.Heart) {
      style.color = "red"
      suitUnicode = "\u2665";
    }else if(suit === Suit.Spade) {
      style.color = "black";
      // style.backgroundColor = "white";
      suitUnicode = "\u2660";
    }

    return (
      <div style={style}>
        { suitUnicode}
      </div>
    );
  }
}
export default Card;