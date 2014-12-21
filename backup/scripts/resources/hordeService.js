angular
	.module('resources')
	.service('hordeService', ['resourceManager', '$interval', function (resourceManager, $interval) {
		this.horde = resourceManager.horde;
		this.horde.progress = 0;
		this.defense = resourceManager.defense;

		this.tick = function () {
			this.horde.progress += 1;
			if (this.horde.progress >= 100) {
				console.log("HORDE ATTACK");
				this.horde.progress = 0;
				resourceManager.threat.changeBy(-resourceManager.threat.current);
			}
		}

	}])
	.controller('hordePanelController', ['$scope', 'hordeService', function ($scope, hordeService) {
		$scope.horde = hordeService.horde;
		$scope.defense = hordeService.defense;
	}]);