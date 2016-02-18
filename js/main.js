var AzofTest = angular.module("map", ["ngRoute"]);
AzofTest.config(function ($routeProvider) {
	$routeProvider.when(
		"/search", {
			templateUrl: 'views/search.html',
			controller: 'SearchController'
		});
	$routeProvider.when(
		"/create", {
			templateUrl: 'views/create.html',
			controller: 'CreateController'
		});
	$routeProvider.when(
		"/map", {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		});
	$routeProvider.otherwise({redirectTo: '/search'});
});