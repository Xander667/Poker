import { Card } from '../models/Card';
import { FiveCardHand } from './../models/FiveCardHand';

import { Cards } from '../constants/Cards';

it('test containsCard() with Four Aces and Eight of Clubs', () => {  
  // Verify 4 Aces
  const cards: Card[] = [];
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

  // Verify scores. Kh 9d Kc 2d 4c -  8c 2d   - Tc A h
});