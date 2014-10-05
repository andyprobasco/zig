angular
	.module('location', [])
	.controller('locationPanelController', ['$scope', 'locationManager', function ($scope, locationManager) {
		$scope.region = locationManager.neighborhood.regions[0];
	}])
	.service('locationManager', ['resourceManager', 'neighborhoodFactory', function (resourceManager, neighborhoodFactory) {
		this.neighborhood = neighborhoodFactory.newDefaultNeighborhood();
	}])


angular
	.module('location')
	.factory('neighborhoodFactory', ['regionFactory', function(regionFactory){
		var Neighborhood = function () {
			this.regions = [];
			this.addRegion = function (region) {
				this.regions.push(region);
			}; 
			this.tick = function () {
				for (var i = 0; i < this.regions.length; i++) {
					this.regions[i].tick();
				}
			}
		}
		return {
			newDefaultNeighborhood: function () {
				var neighborhood = new Neighborhood();
				neighborhood.addRegion(regionFactory.newHQ());
				return neighborhood;
			}
		}
	}])
