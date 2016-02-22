AzoftTest.controller("MapController", ["$scope","$routeParams","GMap",function ($scope,$routeParams,GMap) {
	$scope.$on("$routeChangeSuccess", function () {
		$scope.data = JSON.parse($routeParams.data);
		GMap.displayPoint($scope.data);		
	});	
}]);
