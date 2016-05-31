// Burger chef extension

$(document).ready(function() {

  var BartenderApp = BartenderApp || {}
  BartenderApp.allInstances = [];
  BartenderApp.customersList = [];


  // Constructor function for questions 
  var Questions = function(question) {
    this.question = question;
    BartenderApp.allInstances.push(this); // adds each instance to array
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
    BartenderApp.customersList.push(this);
  };

  var tony = new Preferences([]);
  var jack = new Preferences([]);
  var customerCounter = 0;

  // Bartender constructor takes preferences object
  var Bartender = function(order) {
    this.order = order;
  };

  // createDrink method on bartender prototype takes preferenceSet and creates drink 
  Bartender.prototype.createDrink = function() {
    var drink = [];

    order = this.order.preferenceSet;

    if (order.indexOf("strong") >= 0) {
      var rand = strongIngredients.ingredient.length;
      rand = Math.round(Math.random()*rand);
      drink.push(strongIngredients.ingredient[rand]); // need to add randomness
    };

    if (order.indexOf("weak") >= 0) {
      var rand = weakIngredients.ingredient.length;
      rand = Math.round(Math.random()*rand);
      drink.push(weakIngredients.ingredient[rand]);
    }

    if (order.indexOf("fruity") >= 0) {
      var rand = fruityIngredients.ingredient.length;
      rand = Math.round(Math.random()*rand);
      drink.push(fruityIngredients.ingredient[rand]);
    }

    if (order.indexOf("salty") >= 0) {
      var rand = saltyIngredients.ingredient.length;
      rand = Math.round(Math.random()*rand);
      drink.push(saltyIngredients.ingredient[rand]);
    }

    $('.done').after("<p class='drink'>Have a " + drink + "</p>");
    $('.done').hide();
    $('.drink').after("<button class='next'>Next Customer</button>");
    
    $('.next').on('click', function() {
      customerCounter++;
      questionCounter = 0;
      $('.done').show();
      $(this).remove();
      $('.drink').remove();
      setQuestion();
    });
  };

  function makeDrink(preferenceSet) {
    var dan = new Bartender(preferenceSet);
    dan.createDrink();
  }

  var questionCounter = 0;
  var currentQuestion = BartenderApp.allInstances[questionCounter].question;

  function setQuestion() {
    // If there is a next question, ask it, else make a drink
    if (typeof BartenderApp.allInstances[questionCounter] != "undefined") {
      currentQuestion = BartenderApp.allInstances[questionCounter].question;
      $('.question').html(currentQuestion[0]);
      $('.answer1').html(currentQuestion[1]);
      $('.answer2').html(currentQuestion[2]);
      questionCounter++;
    } else {
      makeDrink(BartenderApp.customersList[customerCounter]);
    }
  }

  setQuestion();

  $('.answer').on('click', function() {
    var submission = $(event.target).html();
    BartenderApp.customersList[customerCounter].preferenceSet.push(submission);
    setQuestion();
  });

  $('.done').on('click', function() {
    makeDrink(BartenderApp.customersList[customerCounter]);
  });
});