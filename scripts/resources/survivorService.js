angular
	.module('resources')
	.service('survivorService', ['resourceManager', 'statusService', function (resourceManager, statusService) {
		this.tick = function () {
			var survivors = resourceManager.survivors.current;

			resourceManager.food.setChangePerSecond(-survivors, "Survivors");
			resourceManager.water.setChangePerSecond(-survivors, "Survivors");
			setMorale();
			if (resourceManager.morale.percentFull >= 100) {
				resourceManager.morale.changeBy(-resourceManager.morale.current);
				resourceManager.survivors.changeMaxBy(1);
				resourceManager.survivors.changeBy(1);
			} else if (resourceManager.morale.percentFull <= -100) {
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
			resourceManager.morale.setChangePerSecond(resourceManager.survivors.current * moraleFactor)
		}

	}]);

