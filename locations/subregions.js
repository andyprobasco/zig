angular
	.module('locations')
	.service('subregionService', ['subregionFactory', 'gardenFactory', function (subregionFactory, gardenFactory) {
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
			this.subregions[0].push(subregionFactory.getInstance());
			this.subregions[0].push(subregionFactory.getInstance());

			this.subregions[1].push(subregionFactory.getInstance());
			this.subregions[1].push(subregionFactory.getInstance());
			this.subregions[1].push(subregionFactory.getInstance());

			this.subregions[2].push(subregionFactory.getInstance());
			this.subregions[2].push(subregionFactory.getInstance());
			this.subregions[2].push(subregionFactory.getInstance());

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
					}
				}
			}
			params.defaultState = params.defaultState || 'Upgrading'
			var subregion = jobFactory.getInstance(params);
			subregion.level = params.level || 1;
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
				params.states = {
					'Upgrading': {
						progressNeeded: 5,
						onComplete: function () {
							this.level += 1;
							this.progressNeeded = 5 * this.level;
							resourceService.food.setChangePerSecond(this.level, 'Vegetable Garden');
						}
					}
				}

				var garden = subregionFactory.getInstance(params);
				return garden;
			}
		}
	}])
