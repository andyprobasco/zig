angular
	.module('game', [])
	.service('gameManager', ['locationManager', 'resourceManager', '$interval', function (locationManager, resourceManager, $interval) {
		function gameTick(){
			locationManager.neighborhood.tick();
			resourceManager.morale.tick();
			resourceManager.survivors.tick();
			resourceManager.food.tick();
			resourceManager.water.tick();
			resourceManager.scrap.tick();
			resourceManager.threat.tick();
		}
		this.launchGameTick = function () {
			$interval(gameTick, 1000);
		}
		this.launchGameTick();
	}])
	.controller('gameSettingsController', ['$scope', 'gameManager', function ($scope, gameManager){
		//$scope.startGameLoop = gameManager.launchGameTick;
	}])
