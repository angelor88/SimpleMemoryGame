import $ from 'jquery';
import '../css/styles.css';
import { Card } from './../js/Card.js';

var uniqueCards = [];
// var displayCards = [];

function GenerateCards(){
  for(var i = 1; i <= 36; i ++){
    let myImgPath = "../img/" + i + ".png";
    let newCard = new Card(i,myImgPath);
    uniqueCards.push(newCard);
  }
  console.log(uniqueCards);
}
$(document).ready(function(){
  GenerateCards();
});
