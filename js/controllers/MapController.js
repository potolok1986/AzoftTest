AzoftTest.controller("MapController", function ($scope,$routeParams) {
	$scope.$on("$routeChangeSuccess", function () {
		$scope.data = JSON.parse($routeParams.date);
	});
});
