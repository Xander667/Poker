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

it('test getHandValue() with 3 Aces and 2 Kings', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.AceClubs);
  hand.push(Cards.AceDiamonds);
  hand.push(Cards.AceHearts);
  hand.push(Cards.KingClubs);
  hand.push(Cards.KingDiamonds);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(279);
});

it('test getHandValue() with 3 Jacks and 2 Tens', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.JackClubs);
  hand.push(Cards.JackDiamonds);
  hand.push(Cards.JackHearts);
  hand.push(Cards.TenDiamonds);
  hand.push(Cards.TenSpades);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(240);
});

it('test getHandValue() with 3 Fours and 2 Aces', () => {
  const app: App = new App({});  
  
  // Verify 4 Aces
  const hand: Card[] = [];
  hand.push(Cards.FourClubs);
  hand.push(Cards.FourDiamonds);
  hand.push(Cards.FourHearts);
  hand.push(Cards.AceDiamonds);
  hand.push(Cards.AceSpades);
  const handValue: number = app.getHandValue(hand);
  expect(handValue).toEqual(159);
});