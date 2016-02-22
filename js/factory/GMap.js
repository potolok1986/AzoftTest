AzoftTest.factory("GMap", ["$http",function ($http) {
		var _config = {
				// центр Новосибирска
				LAT: 55.00518863585595,
				LNG: 82.9361343383789,
				ZOOM: 12,
				DISPLAY_ZOOM: 14,
				MAP_ID: "map_canvas"
			},
			_initialize = function (lat,lng,zoom) {
				var element = document.getElementById(_config.MAP_ID);
				if (GBrowserIsCompatible() && element) {
					var map = new GMap2(element);
					map.setCenter(new GLatLng( lat || _config.LAT, lng || _config.LNG), zoom || _config.ZOOM);
					map.setUIToDefault();
					return {
						map : map,
						event : GEvent
					};
				}else{
					alert("Не найден елемент " + _config.MAP_ID);
					return false;
				}
			};
		return {
			setDISPLAY_ZOOM: function (displayZoom) {
				_config.DISPLAY_ZOOM = displayZoom || _config.DISPLAY_ZOOM;
			},
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
			addPoint: function (obj) {
				var ObjectInitialize = _initialize();
				if (obj && ObjectInitialize) {
					ObjectInitialize.event.addListener(ObjectInitialize.map, "click", function (overlay, latlng) {
						if (overlay) {
							return;
						}
						$http.post('http://maps.google.com/maps/api/geocode/json?latlng=' + latlng.lat() + ',' + latlng.lng() + '&sensor=false')
							.success(function (data) {
								if (data.status === "OK" && data.results.length) {
									var address = data.results[0].formatted_address;
									ObjectInitialize.map.openInfoWindow(latlng, address);
									obj.address = address;
									obj.X = latlng.lat();
									obj.Y = latlng.lng();
								} else {
									alert("Ошибка получения координат");
								}
							})
							.error(function () {
								alert("Не удалось соединиться с сервером");
							})
					});
				}
			},
			displayPoint:function (data) {
				var ObjectInitialize = _initialize(data.coordinateX, data.coordinateY, _config.DISPLAY_ZOOM);
				if(data && ObjectInitialize){
					var html = "Точка: " + data.name + "<br> Адрес: " + data.address,
						uluru = {lat: parseFloat(data.coordinateX), lng: parseFloat(data.coordinateY)};
					ObjectInitialize.map.openInfoWindow(uluru, html);
				}else{
					alert("Нечего показывать");
				}
			}
		}
	}])
