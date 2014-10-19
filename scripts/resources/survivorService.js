angular
	.module('resources')
	.service('survivorService', ['resourceManager', 'locationManager', 'statusService', function (resourceManager, locationManager, statusService) {
		this.tick = function () {
			var survivors = resourceManager.survivors.current;

			resourceManager.food.setChangePerSecond(-survivors, "Survivors");
			resourceManager.water.setChangePerSecond(-survivors, "Survivors");
			setMorale();
			if (resourceManager.morale.percentFull >= 100) {
				resourceManager.morale.changeBy(-resourceManager.morale.current);
				resourceManager.survivors.changeMaxBy(1);
				resourceManager.survivors.changeBy(1);
			} else if (resourceManager.morale.percentFull <= -100 && resourceManager.survivors.max > 1) {
				console.log("checking for 0 survivors free");
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
			if (resourceManager.water.current <= 0) {
				statusService.setStatus('Thirsty', true);
				moraleFactor--;
			} else {
				statusService.setStatus('Thirsty', false);
			}
			if (resourceManager.food.current <= 0) {
				statusService.setStatus('Starving', true);
				moraleFactor--;
			} else {
				statusService.setStatus('Starving', false);
			}
			if (resourceManager.threat.current >= 100) {
				statusService.setStatus('High Threat', true);
				moraleFactor--;
			} else {
				statusService.setStatus('High Threat', false);
			}
			resourceManager.morale.setChangePerSecond(resourceManager.survivors.current * moraleFactor, "Survivors")
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

