AzoftTest.controller("CreateController", ["Storage", "GMap", function (Storage, GMap) {
	GMap.addPoint(this);
	this.maxLength = Storage.getMaxLength();	
	this.createPoint = function (point) {
		if(Storage.addToStorage(point)){
			this.name = "";
			this.create = true;
		}
	};
}]);
