var AzoftTest = angular.module("map", ["ngRoute", "myStorage"]);
AzoftTest.config(function ($routeProvider) {
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
		"/map/:date*", {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		});
	$routeProvider.when(
		"/list", {
			templateUrl: 'views/list.html',
			controller: 'ListController'
		});
	$routeProvider.otherwise({redirectTo: '/search'});
});

angular.module("myStorage", [])
	.factory("Storage", function () {
		var _config = {
				STORAGE_NAME: "pointStorage"
			},
			_storage = [],
			_updateStorage = function () {
				try {
					localStorage.setItem(_config.STORAGE_NAME, angular.toJson(_storage));
				}
				catch (e) {
					alert("Не получилось добавить в локальное хранилище");
				}
				
			};
		return {
			setStorageName: function (storageName) {
				_config.STORAGE_NAME = storageName || _config.STORAGE_NAME;
			},
			addToStorage: function (data) {
				var result = true;
				if (typeof data.X === "number" && typeof data.Y === "number" && data.name.length && data.address.length) {
					_storage.push({
						name: data.name,
						address: data.address,
						coordinateX: data.X,
						coordinateY: data.Y
					});
					_updateStorage();
				} else {
					alert("Какая-то не разбериха с данными");
					result = false;
				}
				return result;
			},
			responseStorage: function () {
				try{
					_storage = JSON.parse(localStorage.getItem(_config.STORAGE_NAME));
				}catch (e){
					_storage = "";
				}
				return _storage;
			}
		};
	});