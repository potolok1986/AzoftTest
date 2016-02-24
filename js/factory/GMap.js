AzoftTest.factory("GMap", ["$http", function ($http) {
	var _config = {
			// центр Новосибирска
			LAT: 55.00518863585595,
			LNG: 82.9361343383789,
			// параметр увеличения при загрузке карты
			ZOOM: 12,
			// параметр увеличения при детальном отображении точки
			DISPLAY_ZOOM: 14,
			// ID обертки в которой будет находиться карта
			MAP_ID: "map_canvas"
		},
		_initialize = function (lat, lng, zoom) {
			var element = document.getElementById(_config.MAP_ID);
			if (GBrowserIsCompatible() && element) {
				var map = new google.maps.Map(element);
				map.setCenter(new GLatLng(lat || _config.LAT, lng || _config.LNG), zoom || _config.ZOOM);
				return  map;
			} else {
				alert("Не найден елемент " + _config.MAP_ID);
				return false;
			}
		},GoogleMap;
	return {		
		setMAP_ID: function (mapId) {
			_config.MAP_ID = mapId || _config.MAP_ID;
		},
		setLAT: function (lat) {
			_config.LAT = parseFloat(lat || _config.LAT);
		},
		setLNG: function (lng) {
			_config.LNG = parseFloat(lng || _config.LNG);
		},
		setZOOM: function (zoom) {
			_config.ZOOM = parseInt(zoom || _config.ZOOM);
		},
		setDISPLAY_ZOOM: function (displayZoom) {
			_config.DISPLAY_ZOOM = parseInt(displayZoom || _config.DISPLAY_ZOOM);
		},
		addPoint: function (obj) {
			GoogleMap = _initialize();
			if (obj && GoogleMap) {
				GEvent.addListener(GoogleMap, "click", function (overlay, latlng) {
					if (overlay) {
						return;
					}
					$http.post('http://maps.google.com/maps/api/geocode/json?latlng='
						+ latlng.lat() + ',' + latlng.lng() + '&sensor=false')
						.success(function (data) {
							if (data.status === "OK" && data.results.length) {
								var address = data.results[0].formatted_address;
								GoogleMap.openInfoWindow(latlng, address);
								obj.address = address;
								obj.X = latlng.lat();
								obj.Y = latlng.lng();
							} else {
								alert("Ошибка получения адреса по координатам");
							}
						})
						.error(function () {
							alert("Не удалось соединиться с сервером");
						})
				});
			}
		},
		displayPoint: function (data) {
			GoogleMap = _initialize(data.coordinateX, data.coordinateY, _config.DISPLAY_ZOOM);
			if (data && GoogleMap) {
				var html = "Точка: " + data.name + "<br>" +
					"Адрес: " + data.address,
					uluru = {lat: parseFloat(data.coordinateX), lng: parseFloat(data.coordinateY)};
				GoogleMap.openInfoWindow(uluru, html);
			} else {
				alert("Нет данных для отображения");
			}
		}
	}
}]);
