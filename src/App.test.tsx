import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Card } from './models/Card';

import { Cards } from './constants/Cards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('test getHandValue() with Four Aces and Eight of Clubs', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.AceClubs);
  hand.push(Cards.AceDiamonds);
  hand.push(Cards.AceHearts);
  hand.push(Cards.AceSpades);
  hand.push(Cards.EightClubs);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(292.0032);
});

it('test getHandValue() with Four Aces and Two of Clubs', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.AceClubs);
  hand.push(Cards.AceDiamonds);
  hand.push(Cards.AceHearts);
  hand.push(Cards.AceSpades);
  hand.push(Cards.TwoClubs);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(292);
});

it('test getHandValue() with Four Aces and Jack of Diamonds', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.AceClubs);
  hand.push(Cards.AceDiamonds);
  hand.push(Cards.AceHearts);
  hand.push(Cards.AceSpades);
  hand.push(Cards.JackDiamonds);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(292.0256);
});