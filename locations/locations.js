angular
	.module('locations', [])
	.controller('locationPanelController', ['$scope', 'resourceService', 'locationService', function ($scope, resourceService, locationService) {
		$scope.refresh = function () {
			$scope.activeTab = "neighborhood";
			$scope.survivors = resourceService.survivors;
			$scope.restJob = locationService.restJob;
			$scope.regions = locationService.regions;
			$scope.subregions = locationService.subregions;
		}
		$scope.refresh();
		$scope.handleDrop = function (itemID, binID) {
			locationService.transferWorker (itemID, binID);
		}
	}])
	.service('locationService', ['jobFactory', 'regionService', 'subregionService', function (jobFactory, regionService, subregionService) {
		this.regions = regionService.regions;
		this.subregions = subregionService.subregions;

		this.tick = function () {
			regionService.tick();
			subregionService.tick();
		}
		this.init = function () {
			regionService.init();
			subregionService.init();
		}
		this.transferWorker = function (itemID, binID) {
			var sourceJob;
			var targetJob;

			var itemIDComponents = itemID.split('-');
			var binIDComponents = binID.split('-');

			if (itemIDComponents[0] === 'region') {
				sourceJob = this.regions[parseInt(itemIDComponents[1])][parseInt(itemIDComponents[2])];
			} else if (itemIDComponents[0] === 'subregion') {
				sourceJob = this.subregions[parseInt(itemIDComponents[1])][parseInt(itemIDComponents[2])];
			} else {
				sourceJob = null;
			}

			if (binIDComponents[0] === 'region') {
				targetJob = this.regions[parseInt(binIDComponents[1])][parseInt(binIDComponents[2])];
			} else if (binIDComponents[0] === 'subregion') {
				targetJob = this.subregions[parseInt(binIDComponents[1])][parseInt(binIDComponents[2])];
			} else {
				targetJob = null;
			}

			if (targetJob) {
				targetJob.addWorker(sourceJob);
			} else {
				sourceJob.removeWorker();
			}


		}

	}])
