var AzoftTest = angular.module("map_app", ["ngRoute","angucomplete-alt"])
	.config(["$routeProvider",function ($routeProvider) {
		$routeProvider.when(
			"/search", {
				templateUrl: 'views/search.html',
				controller: 'SearchController'
			}).when(
			"/create", {
				templateUrl: 'views/create.html',
				controller: 'CreateController'
			}).when(
			"/map/:data*", {
				templateUrl: 'views/map.html',
				controller: 'MapController'
			}).when(
			"/list", {
				templateUrl: 'views/list.html',
				controller: 'ListController'
			});
		$routeProvider.otherwise({redirectTo: '/search'});
	}]);