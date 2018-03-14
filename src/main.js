import $ from 'jquery';
import '../css/styles.css';
import { Card } from './../js/Card.js';

var uniqueCards = [];
var displayCards = [];

function GenerateCards(inputNumber){
  uniqueCards = [];
  displayCards = [];
  for(var i = 1; i <= inputNumber; i ++){
    let myImgPath = "http://localhost:8080/img/" + i.toString() + ".png";
    let newCard = new Card(i,myImgPath);
    uniqueCards.push(newCard);
  }
  GenerateDisplayCards();
  RandomizeDisplayCards();
  GenerateCardDisplay();
}
function GenerateCardDisplay(){
  $("#displayCards").text("");
  for(var i = 0; i < displayCards.length; i ++){
    $("#displayCards").append('<div class="col-md-2 result"><h1>' + displayCards[i].id + '</h1><input type="hidden" value="'+i+'"/><img src="' + displayCards[i].imgUrl + '" alt="A Card" height="100" width="100"></div>');
  }
}
function GenerateDisplayCards(){
  for(var i = 0; i < uniqueCards.length; i ++){
    displayCards.push(uniqueCards[i]);
    displayCards.push(uniqueCards[i]);
  }
}
function RandomizeDisplayCards(){
  for(var i = 0; i < displayCards.length; i ++){
    let randomPosition = Math.floor((Math.random() * displayCards.length));
    let currentIndexValue = displayCards[i];
    displayCards[i] = displayCards[randomPosition];
    displayCards[randomPosition] = currentIndexValue;
  }
}

$(document).ready(function(){
  let firstCardId = -1;
  let lastCardIndex = 0;
  let firstCardState = true;

  $("form#newGame").submit(function(event) {
    event.preventDefault();
    var numberOfCards = $("#cardNum").val();
    $("#initial").addClass("hidden");
    $("#results").show();
    GenerateCards(numberOfCards);
    $("img").addClass("hidden");
    $(".result").click(function() {
      let thisCardId = parseInt($(this).find("h1").text());

      $(this).find("img").removeClass("hidden");
      if(firstCardState){

        firstCardId = thisCardId;
        lastCardIndex = $(this).find("input").val();
        firstCardState = false;
      } else {
        if(firstCardId == thisCardId){
          firstCardState = true;
          //DO nothing
        } else {
          setTimeout(function(){
            $('.result input[value="' + lastCardIndex + '"]').siblings("img").addClass("hidden");
          }, 1000);
          setTimeout(function(){
            $(this).find("img").addClass("hidden");
          }, 1000);

          firstCardState = true;
        }
      }
    });
  });
  $("#playAgain").click(function() {
  $("#initial").removeClass("hidden");
  $("#results").hide();
    });
});
