angular
	.module('survivors', [])
	.controller('survivorPanelController', ['$scope', 'resourceService', 'survivorService', function ($scope, resourceService, survivorService) {
		$scope.survivors = resourceService.survivors;
		$scope.idleSurvivors = survivorService.idleSurvivors;
		$scope.morale = resourceService.morale;
		$scope.moraleSurvivorChange = survivorService.moraleSurvivorChange;
	}])
	.service('survivorService', ['resourceService', function (resourceService) {
		var survivorService = this;
		this.idleSurvivors = {
			currentWorkers: resourceService.survivors.current
		}
		this.moraleSurvivorChange = {
			text: "Attracting New Survivors",
			progress: 0
		}
		
		this.tick = function () {
			consumeResources();
			calculateMorale();
			processMorale();
		}

		function consumeResources () {
			var survivors = resourceService.survivors.current;
			resourceService.food.setChangePerSecond(-survivors, "Survivors");
			resourceService.water.setChangePerSecond(-survivors, "Survivors");
		}

		function calculateMorale() {
			//var moraleFactor = -1;

			if (survivorsAreThirsty()) {
				//statusService.setStatus('Thirsty', true);
				resourceService.morale.setChangePerSecond(-1, "Thirsty Survivors");
			} else {
				//statusService.setStatus('Thirsty', false);
				resourceService.morale.setChangePerSecond(0, "Thirsty Survivors");
			}
			if (survivorsAreHungry()) {
				//statusService.setStatus('Starving', true);
				resourceService.morale.setChangePerSecond(-1, "Starving Survivors");
			} else {
				//statusService.setStatus('Starving', false);
				resourceService.morale.setChangePerSecond(0, "Starving Survivors");
			}
			if (survivorsAreScared()) {
				//statusService.setStatus('High Threat', true);
				resourceService.morale.setChangePerSecond(-2, "Scared Survivors");
			} else {
				//statusService.setStatus('High Threat', false);
				resourceService.morale.setChangePerSecond(0, "Scared Survivors");
			}
			resourceService.morale.setChangePerSecond(survivorService.idleSurvivors.currentWorkers * 2);
			resourceService.morale.setChangePerSecond(resourceService.survivors.current, "Survivors");
		}

		function survivorsAreThirsty () {
			if (resourceService.water.current <= 0) {
				return true;
			}
		}
		function survivorsAreHungry () {
			if (resourceService.food.current <= 0) {
				return true;
			}
		}
		function survivorsAreScared () {
			if (resourceService.threat.current >= 100) {
				return true;
			}
		}

		function processMorale () {
			var morale = resourceService.morale.totalChangePerSecond;
			
			survivorService.moraleSurvivorChange.progress += morale;
	

			if (survivorService.moraleSurvivorChange.progress >= 50) {
				if (resourceService.survivors.max > resourceService.survivors.current) {
					resourceService.survivors.changeBy(1);
					survivorService.idleSurvivors.currentWorkers += 1;
					survivorService.moraleSurvivorChange.progress = 0;
				} else {
					survivorService.moraleSurvivorChange.progress = 50;
				}
			} else if (survivorService.moraleSurvivorChange.progres < 0) {
				survivorService.moraleSurvivorChange.progress  = 0;
			}
		}

		function addNewSurvivor() {
			resourceService.survivors.a
		}

		function pullAWorker () {
			/*var regions = locationManager.neighborhood.regions
			for (var i = 0; i < regions.length; i++) {
				var region = regions[i];
				for (var j = 0; j < region.subregions.length; j++) {
					var subregion = region.subregions[j];
					if (subregion.workable && subregion.currentWorkers > 0) {
						subregion.removeWorker();
						console.log("removed a worker from " + subregion.name)
						return;
					}
				}
			}*/
		}

	}]);

