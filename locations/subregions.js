angular
	.module('locations')
	.service('subregionService', ['subregionFactory', 'gardenFactory', 'waterCollectorFactory', 'storageFactory', 'bedsFactory', function (subregionFactory, gardenFactory, waterCollectorFactory, storageFactory, bedsFactory) {
		this.subregions = [];

		this.tick = function () {
			for (var x=0;x<this.subregions.length;x++) {
				for (var y=0;y<this.subregions[x].length;y++) {
					this.subregions[x][y].tick();
				}
			}
		}

		this.init = function () {
			while (this.subregions.length) {
				this.subregions.pop();
			}
			this.subregions.push([]);
			this.subregions.push([]);
			this.subregions.push([]);

			this.subregions[0].push(gardenFactory.getInstance());
			this.subregions[0].push(waterCollectorFactory.getInstance());
			//this.subregions[0].push(subregionFactory.getInstance());

			this.subregions[1].push(storageFactory.getInstance());
			this.subregions[1].push(bedsFactory.getInstance());
			//this.subregions[1].push(subregionFactory.getInstance());

			//this.subregions[2].push(subregionFactory.getInstance());
			//this.subregions[2].push(subregionFactory.getInstance());
			//this.subregions[2].push(subregionFactory.getInstance());

			this.subregions.unlocked = false;
		}

	}])
	.factory('subregionFactory', ['jobFactory', function (jobFactory) {
		function buildSubregion (params) {
			params = params || {};
			params.name = params.name || 'Subregion';
			params.states = params.states || {};
			if (!params.states['Upgrading']) {
				params.states['Upgrading'] = {
					progressNeeded: 5,
					onComplete: function () {
						this.level += 1
						this.updateLevel();
					}
				}
			}
			if (!params.states['Building']) {
				params.states['Building'] = {
					progressNeeded: 5,
					onComplete: function () {
						this.changeState('Upgrading');
					}
				}
			}
			params.states['Building'].progressNeeded = params.progressNeededToBuild || params.states['Building'].progressNeeded

			params.defaultState = params.defaultState || 'Building'
			var subregion = jobFactory.getInstance(params);
			subregion.level = params.level || 0;
			subregion.updateLevel = params.updateLevel || function () {};
			subregion.updateLevel();
			return subregion;
		}

		return {
			getInstance: function (params) {
				return buildSubregion(params);
			}
		}
	}])
	.factory('gardenFactory', ['subregionFactory', 'resourceService', function (subregionFactory, resourceService) {
		return {
			getInstance: function () {
				params = {};
				params.name = "Vegetable Garden";
				params.updateLevel = function (level) {
					level =  level || this.level;
					this.level = level;
					this.states['Upgrading'].progressNeeded = 5 * level * level;
					if (this.state == 'Upgrading') {
						this.progressNeeded = this.states['Upgrading'].progressNeeded;
					}
					resourceService.food.setChangePerSecond(this.level, 'Vegetable Garden');
					this.status.percentFull = this.progress/this.progressNeeded*100;
				}
				params.progressNeededToBuild = 100;

				return subregionFactory.getInstance(params);
			}
		}
	}])
	.factory('waterCollectorFactory', ['subregionFactory', 'resourceService', function (subregionFactory, resourceService) {
		return {
			getInstance: function () {
				params = {};
				params.name = "Water Collector";

				params.updateLevel = function (level) {
					level = level || this.level;
					this.level = level;
					this.states['Upgrading'].progressNeeded = 5 * level * level;
					if (this.state == 'Upgrading') {
						this.progressNeeded = this.states['Upgrading'].progressNeeded;
					}

					resourceService.water.setChangePerSecond(level, 'Water Collector');
					this.status.percentFull = this.progress/this.progressNeeded*100;
				}
				params.progressNeededToBuild = 100;

				return subregionFactory.getInstance(params);
			}
		}
	}])
	.factory('storageFactory', ['subregionFactory', 'resourceService', function (subregionFactory, resourceService) {
		return {
			getInstance: function () {
				params = {};
				params.name = "Storage";

				params.updateLevel = function (level) {
					level = level || this.level;
					this.level = level;
					this.states['Upgrading'].progressNeeded = 5 * level * level;
					if (this.state == 'Upgrading') {
						this.progressNeeded = this.states['Upgrading'].progressNeeded;
					}
					resourceService.food.max = (level + 1) * 100;
					resourceService.water.max = (level + 1) * 100;
					resourceService.scrap.max = (level + 1) * 100;

					this.status.percentFull = this.progress/this.progressNeeded*100;
				}
				params.progressNeededToBuild = 100;


				return subregionFactory.getInstance(params);
			}
		}
	}])
	.factory('bedsFactory', ['subregionFactory', 'resourceService', function (subregionFactory, resourceService) {
		return {
			getInstance: function () {
				params = {};
				params.name = "Beds";


				params.updateLevel = function (level) {
					level = level || this.level;
					this.level = level;
					this.states['Upgrading'].progressNeeded = 5 * level * level;
					if (this.state == 'Upgrading') {
						this.progressNeeded = this.states['Upgrading'].progressNeeded;
					}
					resourceService.survivors.max = level + 1;

					this.status.percentFull = this.progress/this.progressNeeded*100;
				}
				params.progressNeededToBuild = 100;



				return subregionFactory.getInstance(params);
			}
		}
	}])

