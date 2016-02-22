AzoftTest.controller("SearchController",["Storage", function (Storage) {
	var $this = this;
	$this.maxLength = Storage.getMaxLength();
	$this.point = Storage.responseStorage();
	$this.selectedPoint = function (selected) {
		selected ? $this.data = selected.originalObject : $this.data = null
	}
}]);
