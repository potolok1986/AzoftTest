AzoftTest.controller("CreateController", function (Storage) {
	this.createPoint = function () {
		if(Storage.addToStorage(this)){
			this.name = "";
		}
	}
});
