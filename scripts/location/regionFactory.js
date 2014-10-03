angular
	.module('location')
	.factory('regionFactory', ['subregionFactory', function (subregionFactory) {

		var Region = function () {
			this.name = 'Region';
			this.subregions = [];

			this.addSubregion = function (subregion) {

				if (subregion.replaceable) {
					var index = this.subregions.length;
					var subregions = this.subregions;
					function replaceWith (newSubregion) {
						subregions[index] = newSubregion;
					}
					subregion.replaceThisWith = replaceWith;
				}
				this.subregions.push(subregion);
			}

			this.tick = function () {
				for (var i = 0; i < subregions.length; i++) {
					subregions[i].tick();
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
				region.addSubregion(subregionFactory.newPatrol());
				region.addSubregion(subregionFactory.newScavenge());
				region.addSubregion(subregionFactory.newEmptyPlot());
				region.addSubregion(subregionFactory.newEmptyPlot());
				region.addSubregion(subregionFactory.newEmptyPlot());
				console.log(region);
				return region;
			}
		}
	}])

