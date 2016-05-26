// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
	var loaded = false
	var dishID = $routeParams.dishId
	// $scope.dish = Dinner.Dish.get({id:dishID})


  	$scope.getDishPrice = function(){
  		if (loaded == true){
    		return Dinner.getDishPrice($scope.dish);
		}
		return $scope.status
	}

	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
	}

	$scope.addDishToMenu = function() {
    	Dinner.addDishToMenu($scope.dish);
  	}

  	$scope.loadDish = function() {
	   $scope.status = "Loading...";
	   loaded = false;
	   Dinner.Dish.get({id:dishID},function(data){
	     $scope.dish=data;
	     $scope.status = "Done loading"
	   	 loaded = true},function(data){
	     	$scope.status = "There was an error";
	   });
 	}

 	$scope.loadDish()
});