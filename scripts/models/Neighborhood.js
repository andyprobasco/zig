Neighborhood = function (resources) {
	var region = new Region({name:'HQ'});
	
	this.controllers = [
		region.controller
	]
}

Region = function (params) {
	var name = params.name || 'Region';
	var subregions = [];

	this.addSubregion = function (subregion) {
		subregions.push(subregion);
		console.log(this)
		this.controller.subregions.push(subregion.controller);
	}

	this.getName = function () {return name;};

	this.controller = {
		getName: this.getName,
		subregions: []
	}

	this.addSubregion(new WorkableSubregion({name:'Patrol'}));
	this.addSubregion(new WorkableSubregion({name:'Scavange'}));
	this.addSubregion(new ReplaceableSubregion({name:'empty plot'}));
}

Subregion = function (params) {
	var name = params.name || 'Subregion';
	var level = params.level || null;
	var type = params.subregionType || null;
	var art = params.artPath || 'no art path specified';


	this.getDisplayName = function () {return name;};
	this.getType = function () {return type};
	this.getArt = function () {return art};

	//this.getInteractionText = function () {};
	//this.getUpgradeCost = function () {};

	this.controller = {
		getDisplayName: this.getDisplayName,
		getArt: this.getArt,
		getType: this.getType
	}
}

WorkableSubregion = function (params) {
	Subregion.call(this, params);
	var progress = 0;

	this.workerCount = params.workerCount || 0;
	this.changeWorkers = function (changeBy) {
		workerCount += changeBy;
	}
	this.getProgress = function () {};

	this.controller.getWorkerCount = this.getWorkerCount;
	this.controller.changeWorkers = this.changeWorkers;
	this.controller.getProgress = this.getProgress;
}

UpgradeableSubregion = function (params) {
	Subregion.call(this, params);
	this.getUpgradeCost = function () {};
	this.upgrade = function () {};

	this.controller.getUpgradeCost = getUpgradeCost;
	this.controller.upgrade = this.upgrade;
}

ReplaceableSubregion = function (params) {
	Subregion.call(this, params);
	this.build = function (newSubregionName) {};
	this.controller.build = this.build;
}