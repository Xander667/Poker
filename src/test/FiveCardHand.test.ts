import { CardModel } from '../models/CardModel';
import { FiveCardHand } from './../models/FiveCardHand';

import { Cards } from '../constants/Cards';

it('test containsCard() with Four Aces and Eight of Clubs', () => {  
  // Verify 4 Aces
  const cards: CardModel[] = [];
  cards.push(Cards.AceClubs);
  cards.push(Cards.AceDiamonds);
  cards.push(Cards.AceHearts);
  cards.push(Cards.AceSpades);
  cards.push(Cards.EightClubs);
  
  const fiveCardHand: FiveCardHand = new FiveCardHand(cards);
  expect(fiveCardHand.containsCard(Cards.AceClubs)).toEqual(true);
  expect(fiveCardHand.containsCard(Cards.AceDiamonds)).toEqual(true);
  expect(fiveCardHand.containsCard(Cards.AceHearts)).toEqual(true);
  expect(fiveCardHand.containsCard(Cards.AceSpades)).toEqual(true);
  expect(fiveCardHand.containsCard(Cards.EightClubs)).toEqual(true);
});