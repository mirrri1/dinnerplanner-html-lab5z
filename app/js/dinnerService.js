// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    var menuType = [];
    for (menu = 0; menu < specMenu.length; menu++) { //loopar igenom varje maträtt
      var dish = this.getDish(specMenu[menu]); //hämtar ut rätterna om de finns i menyn
      if (dish.type == type){ 
              menuType.push(dish.id); //lägger i listan om rätt type
        }
  }
  return menuType;
  }

/*  this.addPendingDish = function(id) {
    var pendingDish = this.getDish(id);
    pendingDishes.push(pendingDish);
    this.notifyObservers(id);
  } 

  this.removePendingDish = function(){
    pendingDishes = [];
    pendingDishes.pop(); //Tar bort det sista elemntet
    console.log(pendingDishes)
    }

  this.getPendingDish = function() {
    //dishen = pendingDishes.pop();
    return pendingDishes[0];
  }

  //Returns */
  this.getFullMenu = function() {
    console.log(specMenu)
    return specMenu;
  }


    
  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var allIngredients = [];
    for (i = 0; i < specMenu.length; i++) {
      var ingredient = this.getDish(i).ingredients; //sparar ner ingredienserna till de dishes vi fått ut
      for (var key in ingredient){ //
        allIngredients.push(ingredient[key]);
    }
      }
    return allIngredients;
  }

  this.getDishPrice = function(id){
    var specPrice = 0;
    ingredient = [];
    ingredient.push(this.getDish(id).Ingredients);
    var dish = ingredient[0];
    for(key in dish){
      specPrice += dish[key].MetricQuantity;
    }
    specPrice = specPrice*numberOfGuests;
    return specPrice;
  }

  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var totalMenuPrice = 0;
    for(key in specMenu){
      totalMenuPrice += this.getDishPrice(specMenu[key].RecipeID);
    }
    return totalMenuPrice;
  }
  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(id) {
    //TODO Lab 2 
    var dishToAdd = this.getDish(id);
    if (specMenu.length >= 1) {
      var dishExist = false;
      for (menu in specMenu){
        var dish = specMenu[menu];
        if (dish.RecipeID == dishToAdd.RecipeID) {
          dishExist = true;
          this.removeDishFromMenu(dishToAdd.RecipeID);
          specMenu.push(dishToAdd);

        }
      }
      if(dishExist == false) {
        specMenu.push(dishToAdd);
      }
    }
    else {
      specMenu.push(dishToAdd);
    }
  return specMenu;
  this.notifyObservers(); //ska senare skicka med ett objekt
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    var removeDish = this.getDish(id);
    for (menu = 0; menu < specMenu.length; menu++){
      var dish = specMenu[menu];
      if(removeDish.RecipeID == dish.RecipeID){ //kollar om den rätten man vill ta bort faktiskt finns i menyn, om den gör det f
        specMenu.splice(menu, 1);
      }
      else if(removeDish.Category == dish.Category){ //kollar om den rätten man vill ta bort faktiskt finns i menyn, om den gör det f
        specMenu.splice(menu, 1);
      }
    }
    return specMenu;
    this.notifyObservers(); //ska senare skicka med ett objekt

  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  this.getAllDishes = function (Category, filter, cb) {
      var apiKey = "Li5k9EKcwy83lOzY9W1uCa0K08ZT9K2S";
      var type = Category;
      var searchword = filter;
      // if (filter === ""){
      //   var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&include_primarycat=" + type + "&pg=1&rpp=125";
      // }
      if (filter === "") {
          var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&include_primarycat=" + type + "&pg=1&rpp=125";
      }
      else {
        var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&title_kw=" + searchword + "&include_primarycat=" + type + "&pg=1&rpp=125";
      }
      $.ajax({
          type: "GET",
          dataType:'json',
          cache: false,
          async: true,
          url: url,
          success: cb,
          error: function(data) {
          alert("Something's wrong!");
        },
        complete: function(data) {
          $("#LoadingView").hide();
        }
      });
  }
  // var apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP";
  // var recipeID = 196149;
  // var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
  // var model = this; 
  // $.ajax({
  //          type: "GET",
  //          dataType: 'json',
  //          cache: false,
  //          url: url,
  //          success: function (data) {
 //           eventObject = {"description" : "dishes", "data" : data};
 //           console.log(eventObject)
 //           model.notifyObserver(eventObject);
  //             },
  //         error: function(xhr, status, error){
 //           console.log('Error in getAllDishes function');
 //               model.errorMessage(xhr, status, error);
 //               } 
  //          });
  
  // }

  //function that returns a dish of specific ID
  this.getDish = function (id, cb) {
      var apiKey = "Li5k9EKcwy83lOzY9W1uCa0K08ZT9K2S";
      var recipeID = id;
      console.log("inne i getDish")
      var url = "http://api.bigoven.com/recipe/" + recipeID + "?&api_key=" + apiKey + "&pg=1&rpp=125";
        var dish = "";
        $.ajax({
            type: "GET",
            dataType:'json',
            cache: false,
            async: true,
            url: url,
            success: cb,
            error: function(data) {
              alert("Something's wrong!");
            }
        });
}

  this.getSpecificDish = function (id) {
    for(key in dishes){
      if(dishes[key].id == id) {
        return selectedDish = dishes[key].name;
      }
    }
  }




  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});