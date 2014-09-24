var Subregion = function (resources) {
	var name = 'Subregion';
	var type = null;
	var art = 'no art path specified';


	this.getName = function () {return name;}
	this.setName = function (newName) {name = newName;};
	this.getDisplayName = function () {return name;};

	this.getType = function () {return type};
	this.setType = function (newType) {type = newType;};

	this.getArt = function () {return art};
	this.setArt = function (newArt) {art = newArt;};

	this.update = function () {}

	this.controller = {
		getDisplayName: this.getDisplayName,
		getArt: this.getArt,
		getType: this.getType
	}
}

Subregion.Workable = function (resources) {
	Subregion.call(this);
	this.setType('workable');

	var progress = 0;
	var progressMax = 100;
	var taskActive = false;
	var workerCount = 0;

	this.changeWorkers = function (changeBy) {
		workerCount += changeBy;
	}

	this.getProgress = function () {
		return Math.ceil(progress/progressMax*100);
	}

	this.interact = function () {
		if (!taskActive) {
			progress = 0;
			taskActive = true;
		}
	}

	this.update = function () {
		if (taskActive) {
			progress++;
			if (progress >= progressMax) {
				this.onTaskComplete();
				taskActive = false;
				progress = 0;
			}
		}
	}

	this.onTaskComplete = function () {

	}

	this.controller.getWorkerCount = this.getWorkerCount;
	this.controller.changeWorkers = this.changeWorkers;
	this.controller.getProgress = this.getProgress;
	this.controller.interact = this.interact;
}

Subregion.Upgradeable = function (resources) {
	Subregion.call(this);
	this.setType('upgradeable');
	this.getUpgradeCost = function () {};
	this.upgrade = function () {};

	this.controller.getUpgradeCost = getUpgradeCost;
	this.controller.upgrade = this.upgrade;
}

Subregion.Replaceable = function (resources) {
	Subregion.call(this);
	this.setType('replaceable');
	this.build = function (newSubregionName) {};
	this.controller.build = this.build;
}


Subregion.Patrol = function (resources) {
	Subregion.Workable.call(this);
	this.setName('Patrol');
	this.onTaskComplete = function () {
		resources.threat.changeBy(-1);
	}
}

Subregion.Scavenge = function (resources) {
	Subregion.Workable.call(this);
	this.setName('Scavenge');
	this.onTaskComplete = function () {
		console.log('oncomplete')
		resources.scrap.changeBy(1);
		resources.threat.changeBy(1);
	}
}

Subregion.EmptyPlot = function (resources) {
	Subregion.Replaceable.call(this);
	this.setName('Empty Plot');
}