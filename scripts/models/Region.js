var Region = function (resources) {
	var name = 'Region';
	var subregions = [];

	this.addSubregion = function (subregion) {
		subregions.push(subregion);
		console.log(this)
		this.controller.subregions.push(subregion.controller);
	}
	this.setName = function (newName) {name = newName;};
	this.getName = function () {return name;};

	this.update = function () {
		for (var i = 0; i < subregions.length; i++) {
			subregions[i].update();
		}
	}

	this.controller = {
		getName: this.getName,
		subregions: []
	}

}


Region.HQ = function (resources) {
	Region.call(this);
	this.setName('HQ');
	this.addSubregion(new Subregion.Patrol(resources));
	this.addSubregion(new Subregion.Scavenge(resources));
	this.addSubregion(new Subregion.EmptyPlot(resources));
	this.addSubregion(new Subregion.EmptyPlot(resources));
}