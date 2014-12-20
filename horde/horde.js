angular
	.module('horde', [])
	.controller('hordePanelController', ['$scope', 'resourceService', 'hordeService', function ($scope, resourceService, hordeService) {
		$scope.attackProgress = hordeService.attackProgress;
		$scope.horde = hordeService.horde;
		$scope.threat = resourceService.threat;
		$scope.defense = resourceService.defense;
	}])
	.service('hordeService', ['resourceService', function (resourceService) {
		var hordeService = this;
		this.attackProgress = {
			attackIn: 100
		}

		this.horde = {
			size: 0,
			nextZombieProgress: 0
		}

		this.tick = function () {
			processThreat();
			advanceAttack();
		}

		function processThreat () {
			var threat = resourceService.threat.totalChangePerSecond;
			hordeService.horde.nextZombieProgress += threat;
			if (hordeService.horde.nextZombieProgress > 50) {
				hordeService.horde.size += 1;
				hordeService.horde.nextZombieProgress = 0;
			} else if (hordeService.horde.nextZombieProgress < 0) {
				hordeService.horde.nextZombieProgress = 0;
			}
		}

		function advanceAttack () {
			hordeService.attackProgress.attackIn -= 1;
			if (hordeService.attackProgress.attackIn <= 0) {
				hordeService.attackProgress.attackIn = 100;
				launchAttack();
			}
		}

		function launchAttack () {
			hordeService.horde.size = 0;
			hordeService.horde.nextZombieProgress = 0;
		}

	}])