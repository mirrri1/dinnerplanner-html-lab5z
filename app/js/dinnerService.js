// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  this.guests = 1;

  var temp = $cookieStore.get('guests')
  if (temp != undefined) {
    this.guests = temp;
  }
  this.selectedDinner = new Array();
  this.currentDish = new Object();
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'e1H9dDZsH5J3PY6j89PK326LBwN97iS6'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'e1H9dDZsH5J3PY6j89PK326LBwN97iS6'}); 
  

  //sparar användarens data i cookies
  this.getDinnerCookies = function() {
    var dinner = this.selectedDinner;
    var tempArray = new Array()
    for (var i=0;i<3;i++) { 
      if ($cookieStore.get(i.toString()) != undefined) {
        tempArray.push($cookieStore.get(i.toString()))
        console.log(tempArray)
      }
    }
    for (var j=0;j<tempArray.length;j++){
      this.Dish.get({id:tempArray[j]},function(data){
        dinner.push(data);
      },function(data){
        console.log("No more cookies for you");
      }); 
    }
   }

//settar antalet gäster och sparar ner i cookies
  this.setNumberOfGuests = function(num) {
    this.guests = num;
    $cookieStore.put('guests',this.guests);
  }

  // hämtar antalet gäster
  this.getNumberOfGuests = function() {
    return this.guests
  }

  //returnerar dish av en viss typ (starter, main, dessert) som användaren har skrivit in
  this.getSelectedDish = function(type) {
    //TODO Lab 2
    for (var i = 0; i<this.dishes.length; i++){
      if (this.dishes[i].type==type){
        return this.dishes[i];
      }
    return null;
    }
  }
  
  //returnerar hela menyn
  this.getSelectedDinner = function(){
    return this.selectedDinner;
  }

  //Returnerar alla ingredienser för alla dishes på menyn
  this.getAllIngredients = function() {
    //TODO Lab 2
    var ingredient = new Array();
    for (var i = 0; i<this.selectedDinner.length; i++){
      for (key in this.selectedDinner[i].Ingredients){
        ingredient.push(this.selectedDinner[i].Ingredients[key]);
      }
    }
    return ingredient;
  }
  
  //hämtar priset för en dish (Ingredienserna för dishen*antalet gäster)
  this.getDishPrice = function(dish) {
    var sum=0;
    for (var i=0;i<dish.Ingredients.length;i++){
      sum ++;
    }
    return sum*this.guests;
  }

  //returnerar priset för en hel meny (Ingredienser för alla dishes i menyn*antalet gäster)
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var ingredients = this.getAllIngredients();
    var sum=0;
    for (var i=0;i<ingredients.length;i++){
      sum ++;
    }

    return sum*this.guests;
  }
  
  //Lägger till en dish till menyn, om en dish redan finns av samma kategori tas den bort och den nya läggs till
  //Sparar ner i cookie

  this.addDishToMenu = function(dish) {
    //TODO Lab 2
    var category = dish.Category;
    console.log(category)
    var flag = false;
    
    for (var i=0;i<this.selectedDinner.length;i++){
      if (this.selectedDinner[i].Category == category){
        this.selectedDinner[i] = dish;
        flag = true;
        $cookieStore.put(i.toString(),dish.RecipeID);
        console.log(i.toString()+' '+dish.RecipeID)
      }
    }
    if (flag == false && this.selectedDinner.length<3){
      $cookieStore.put(this.selectedDinner.length.toString(),dish.RecipeID);
      this.selectedDinner.push(dish);
      
              console.log(this.selectedDinner.length.toString()+' '+dish.RecipeID)

    }
    
  }

  //Tar bort dish från menyn och även från cookie
  this.removeDishFromMenu = function(id) {
    //TODO Lab 2
    for (var i=0;i<this.selectedDinner.length;i++){
      if (this.selectedDinner[i].RecipeID == id){
        this.selectedDinner.splice(i,1);

        for (var j=i;j<2;j++){
          $cookieStore.put(j.toString(),$cookieStore.get((j+1).toString()));
          console.log("index: "+j+" value:"+$cookieStore.get((j+1).toString()))
          
        }
        console.log("menu length: "+this.selectedDinner.length);
        $cookieStore.remove(this.selectedDinner.length.toString());

      }
    }

  }

  this.getDinnerCookies();


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});