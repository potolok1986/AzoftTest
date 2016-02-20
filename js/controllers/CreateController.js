AzoftTest.controller("CreateController", function (Storage) {
	this.createPoint = function (point) {		
		if(Storage.addToStorage(point)){			
			this.name = "";
			this.create = true;
		}
	};

});
