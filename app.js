// Finish abstracting Preferences so can be multiple customers

// Probably shouldn't be using global variable here
var allInstances = [];

// Constructor function for questions 
var Questions = function(question) {
  this.question = question;
   // creates array to store all instances
  allInstances.push(this); // adds each instance
};

// Instances of Questions constructor
var strengthQuestion = new Questions(["Do ye like yer drinks strong?", "strong", "weak"]);
var saltLevelQuestion = new Questions(["Do ye prefer salty or fruity?", "salty", "fruity"]);
var thirdQuestion = new Questions(["Do ye prefer tasty or nasty?", "tasty", "nasty"]);

// Constructor for ingredients
var Ingredients = function(ingredient) {
  this.ingredient = ingredient;
};

// Instances of ingredients. Each is an array containing 3 different ingredients 
var strongIngredients = new Ingredients(["Glug of rum", "slug of whisky", "splash of gin"]);
var weakIngredients = new Ingredients(["Diet coke", "Ginger Ale", "water"]);
var saltyIngredients = new Ingredients(["olive", "salt-dusted rim", "rasher of bacon"]);
var fruityIngredients = new Ingredients(["slice of orange", "cherry", "lime zest"]);

// Preferences constructor
var Preferences = function(preferenceSet){
  this.preferenceSet = preferenceSet;
  Preferences.customers = [];
  Preferences.customers.push(this);
};

// for now just setting Preference instance to empty array; will take user input later
var preferenceSetCustomer1 = new Preferences([]);
var preferenceSetCustomer2 = new Preferences(["salty", "weak"]);
// var customerCounter = 1;
// var currentCustomerPreferences = window["preferenceSetCustomer" + customerCounter];

// Bartender constructor takes preferences object
var Bartender = function(order) {
  this.order = order;
};

// createDrink method on bartender prototype takes preferenceSet and creates drink 
Bartender.prototype.createDrink = function() {
  var drink = [];

  order = this.order.preferenceSet;

  if (order.indexOf("strong") >= 0) {
    drink.push(strongIngredients.ingredient[0]); // need to add randomness
  };

  if (order.indexOf("weak") >= 0) {
    drink.push(weakIngredients.ingredient[0]);
  }

  if (order.indexOf("fruity") >= 0) {
    drink.push(fruityIngredients.ingredient[0]);
  }

  if (order.indexOf("salty") >= 0) {
    drink.push(saltyIngredients.ingredient[0]);
  }

  $('.done').after("Have a " + drink);
  $('.done').hide();

};

function makeDrink(preferenceSetCustomer1) {
  var dan = new Bartender(preferenceSetCustomer1);
  dan.createDrink();
}

// UI logic
$(document).ready(function() {
  var questionCounter = 0;
  var currentQuestion = allInstances[questionCounter].question;

  function setQuestion() {
    $('.question').html(currentQuestion[0]);
    $('.answer1').html(currentQuestion[1]);
    $('.answer2').html(currentQuestion[2]);
    questionCounter++;
    if (typeof allInstances[questionCounter] != "undefined") {
      currentQuestion = allInstances[questionCounter].question;
    }
  }

  setQuestion();

  $('.answer').on('click', function() {
    var submission = $(event.target).html();
    preferenceSetCustomer1.preferenceSet.push(submission);
    //$('.preferences').append(submission);
    setQuestion();
  });

  $('.done').on('click', function() {
    makeDrink(preferenceSetCustomer1);
  });
});