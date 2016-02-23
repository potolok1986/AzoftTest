AzoftTest.factory("Storage", function () {
	var _config = {
			// имя локального хранилища
			STORAGE_NAME: "pointStorage",
			// максимальная длинна строки при создании точки и поиска этой точки
			MAX_LENGTH: 20
		},
		_storage = [],
		_updateStorage = function () {
			try {
				localStorage.setItem(_config.STORAGE_NAME, angular.toJson(_storage));
			}
			catch (e) {
				alert("Ошибка добавления в локальное хранилище: " + e);
			}
		};
	return {
		setMaxLength: function (maxLength) {
			_config.MAX_LENGTH = maxLength || _config.MAX_LENGTH
		},
		getMaxLength: function () {
			return _config.MAX_LENGTH
		},
		setStorageName: function (storageName) {
			_config.STORAGE_NAME = storageName || _config.STORAGE_NAME;
		},
		addToStorage: function (data) {
			var result = true;
			if (typeof data.X === "number" && typeof data.Y === "number" && data.name.length && data.address.length) {
				if (!_storage) {
					_storage = [];
				}
				_storage.push({
					name: data.name,
					address: data.address,
					coordinateX: data.X,
					coordinateY: data.Y
				});
				_updateStorage();
			} else {
				alert("Ошибка типа данных");
				result = false;
			}
			return result;
		},
		responseStorage: function () {
			try {
				_storage = JSON.parse(localStorage.getItem(_config.STORAGE_NAME));
				if(!_storage){
					_storage = [];
				}
			} catch (e) {
				alert("Ошибка обращения к LocalStorage: " + e);
				_storage = [];
			}
			return _storage;
		}
	};
});