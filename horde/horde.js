angular
	.module('horde', [])
	.controller('hordePanelController', ['$scope', 'resourceService', 'hordeService', function ($scope, resourceService, hordeService) {
		$scope.refresh = function () {
			$scope.attackProgress = hordeService.attackProgress;
			$scope.horde = hordeService.horde;
			$scope.threat = resourceService.threat;
			$scope.defense = resourceService.defense;
		}
		$scope.refresh();
	}])
	.service('hordeService', ['resourceService', 'infoService', function (resourceService, infoService) {
		var hordeService = this;
		this.attackProgress = {
			attackIn: 100
		}

		this.horde = {
			size: 0,
			nextZombieProgress: 0
		}

		this.init = function () {
			this.attackProgress.attackIn = 100;
			this.horde.size = 0;
			this.horde.nextZombieProgress = 0;
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
			if (hordeService.horde.size > resourceService.defense.count) {
				infoService.setMessage("Zombies attacked: you lost!");
			} else {
				infoService.setMessage("Zombies attacked: you won!");
			}
			hordeService.horde.size = 0;
			hordeService.horde.nextZombieProgress = 0;
		}

	}])