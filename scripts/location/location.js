angular
	.module('location', [])
	.controller('locationPanelController', ['$scope', 'locationManager', function ($scope, locationManager) {
		$scope.neighborhood = locationManager.neighborhood;
		//$scope.region = locationManager.neighborhood.regions[0];
		$scope.activeRegion = locationManager.neighborhood.regions[0];
		$scope.activeSubregion = locationManager.neighborhood.regions[0].subregions[0];
		$scope.neighborhoodIsActive = false;
		$scope.regionIsActive = true;
		$scope.subregionIsActive = false;
		$scope.gotoNeighborhood = function () {
			$scope.neighborhoodIsActive = true;
			$scope.regionIsActive = false;
			$scope.subregionIsActive = false;
		};
		$scope.gotoRegion = function (region) {
			$scope.activeRegion = region
			$scope.neighborhoodIsActive = false;
			$scope.regionIsActive = true;
			$scope.subregionIsActive = false;
		};
		$scope.gotoSubregion = function (subregion) {
			$scope.activeSubregion = subregion;
			$scope.neighborhoodIsActive = false;
			$scope.regionIsActive = false;
			$scope.subregionIsActive = true;
		};
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
