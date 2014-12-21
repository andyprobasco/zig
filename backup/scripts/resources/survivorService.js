angular
	.module('resources')
	.service('survivorService', ['resourceManager', 'locationManager', 'statusService', function (resourceManager, locationManager, statusService) {
		this.tick = function () {
			var survivors = resourceManager.survivors.current;
			var maxSurvivors = resourceManager.survivors.max;

			resourceManager.food.setChangePerSecond(-maxSurvivors-1, "Survivors");
			resourceManager.water.setChangePerSecond(-maxSurvivors-1, "Survivors");
			setMorale();
			if (resourceManager.morale.percentFull >= 100) {
				resourceManager.morale.changeBy(-resourceManager.morale.current);
				resourceManager.survivors.changeMaxBy(1);
				resourceManager.survivors.changeBy(1);
			} else if (resourceManager.morale.percentFull <= -100 && maxSurvivors > 0) {
				if (survivors === 0) {
					pullAWorker();
				}
				resourceManager.morale.changeBy(-resourceManager.morale.current);
				resourceManager.survivors.changeMaxBy(-1);
				resourceManager.survivors.changeBy(-1);
			}
		};

		function setMorale () {
			var moraleFactor = -1;
			var survivors = resourceManager.survivors.current;

			if (resourceManager.water.current <= 0) {
				statusService.setStatus('Thirsty', true);
				resourceManager.morale.setChangePerSecond(-survivors-1, "Thirsty Survivors");
			} else {
				statusService.setStatus('Thirsty', false);
				resourceManager.morale.setChangePerSecond(0, "Thirsty Survivors");
			}
			if (resourceManager.food.current <= 0) {
				statusService.setStatus('Starving', true);
				resourceManager.morale.setChangePerSecond(-survivors-1, "Starving Survivors");
			} else {
				statusService.setStatus('Starving', false);
				resourceManager.morale.setChangePerSecond(0, "Starving Survivors");
			}
			if (resourceManager.threat.current >= 100) {
				statusService.setStatus('High Threat', true);
				resourceManager.morale.setChangePerSecond(-survivors-1, "Scared Survivors");
			} else {
				statusService.setStatus('High Threat', false);
				resourceManager.morale.setChangePerSecond(0, "Scared Survivors");
			} 
			resourceManager.morale.setChangePerSecond(-survivors, "Survivors");
		}

		function pullAWorker () {
			var regions = locationManager.neighborhood.regions
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
			}
		}

	}]);

