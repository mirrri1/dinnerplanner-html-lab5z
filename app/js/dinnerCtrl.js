// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  var dishLoaded = false
  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.selectedDinner = new Array();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

	$scope.getTotalMenuPrice = function(){
		return Dinner.getTotalMenuPrice();
	}
	
  	$scope.getselectedDinner = function(){
  		$scope.selectedDinner = Dinner.getSelectedDinner();
	}

  	$scope.getDishPrice = function(dish){
    	return Dinner.getDishPrice(dish);
	}

  	$scope.removeDishFromMenu = function(id){
  	Dinner.removeDishFromMenu(id)
  	}

   $scope.getselectedDinner()


});