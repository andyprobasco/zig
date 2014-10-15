angular
	.module('location')
	.factory('regionFactory', ['subregionFactory', 'resourceManager', 'logService', function (subregionFactory, resourceManager, logService) {

		var Region = function () {
			this.name = 'Region';
			this.subregions = [];

			this.addSubregion = function (subregion) {
				var subregions = this.subregions
				
				if (subregion.replaceable) {
					var index = this.subregions.length;
					function replaceWith (newSubregion) {
						if (resourceManager.canPayCost(newSubregion.buildCost)) {
							logService.log("built new " + newSubregion.name);
							resourceManager.payCost(newSubregion.buildCost);
							subregions[index].onDestroy();
							subregions[index] = newSubregion;
							subregions[index].onBuild();
						} else {
							logService.log("can't afford " + newSubregion.name)
						}
					}
					subregion.replaceThisWith = replaceWith;
				}
				this.subregions.push(subregion);
			}

			this.tick = function () {
				for (var i = 0; i < this.subregions.length; i++) {
					this.subregions[i].tick();
				}
			}
			this.replaceSubregion = function (position, newSubregion) {
				this.subregions[position] = newSubregion;
			}
		}

		function replaceSubregionWith (index) {
			this.index
		}

		return {
			newHQ: function () {
				region = new Region();
				region.name = 'HQ';
				region.addSubregion(subregionFactory.newBeds());
				region.addSubregion(subregionFactory.newAntiBeds());
				region.addSubregion(subregionFactory.newPatrol());
				region.addSubregion(subregionFactory.newScavenge());
				region.addSubregion(subregionFactory.newEmptyPlot());
				region.addSubregion(subregionFactory.newEmptyPlot());
				region.addSubregion(subregionFactory.newEmptyPlot());
				for (var i = 0; i < region.subregions.length; i++) {
					region.subregions[i].onBuild();
				}
				console.log(region);
				return region;
			}
		}
	}])

