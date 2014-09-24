var Neighborhood = function (resources) {
	var regions = [];


	this.addRegion = function (region) {
		regions.push(region);
		this.controllers.push(region.controller);
	}

	this.update = function () {
		for (var i = 0; i < regions.length; i++) {
			regions[i].update();
		}
	}

	this.controllers = [];
}

Neighborhood.Default = function (resources) {
	Neighborhood.call(this, resources);

	this.addRegion(new Region.HQ(resources));
}


