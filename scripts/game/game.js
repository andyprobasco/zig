angular
	.module('game', [])
	.service('gameManager', ['locationManager', '$interval', function (locationManager, $interval) {
		function gameTick(){
			locationManager.neighborhood.tick();
			console.log("hey");
		}
		this.launchGameTick = function () {
			$interval(gameTick, 1000);
			console.log('heyhey');
		}
	}])
	.controller('gameSettingsController', ['$scope', 'gameManager', function ($scope, gameManager){
		$scope.startGameLoop = gameManager.launchGameTick;
	}])
