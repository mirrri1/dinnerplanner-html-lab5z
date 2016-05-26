dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

  
  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  	$scope.selectedDinnerFunc = function(){
    	$scope.selectedDinner = Dinner.getSelectedDinner();
	}

  	$scope.getDishPrice = function(dish){
    	return Dinner.getDishPrice(dish);
	}	

  	$scope.getTotalMenuPrice = function(){
    	return Dinner.getTotalMenuPrice();
	}

	$scope.selectedDinnerFunc()


})
