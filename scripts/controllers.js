
ResourceMeterController = function (resource) {
	this.getCurrent = resource.getCurrent;
	this.getMax = resource.getMax;
	this.name = resource.name;
}

FacilityController = function (facility) {
	this.getCount = facility.getCount;
	this.getPrice = facility.getPrice;
	this.purchase = facility.purchase;
	this.name = facility.name;
}

RegionController = function (region) {
	this.name = region.name;
}

SurvivorMeter = function (survivors) {
	//function getTotal() {};
	//function getAvailable() {};
}