angular
	.module('game', [])
	.service('gameManager', ['locationManager', 'resourceManager', '$interval', function (locationManager, resourceManager, $interval) {
		function gameTick(){
			locationManager.neighborhood.tick();
			resourceManager.morale.tick();

		}
		this.launchGameTick = function () {
			$interval(gameTick, 1000);
		}
	}])
	.controller('gameSettingsController', ['$scope', 'gameManager', function ($scope, gameManager){
		$scope.startGameLoop = gameManager.launchGameTick;
	}])
