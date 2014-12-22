angular
	.module('game', [])
	.service('gameService', ['$interval', 'resourceService', 'locationService', 'survivorService', 'infoService', 'hordeService', function ($interval, resourceService, locationService, survivorService, infoService, hordeService) {

		function gameTick(){
			locationService.tick();
			hordeService.tick();
			survivorService.tick();
			resourceService.tick();
		}

		function init () {
			locationService.init(); //
			resourceService.init(); //
			hordeService.init(); 
			survivorService.init(); 
			infoService.init(); 
		}

		function launchGameTick () {
			$interval(gameTick, 1000);
		}

		this.newGame = function () {
			init();
		}

		init();
		launchGameTick();

	}])
	.controller('gameController', ['$scope', 'gameService', 'resourceService', 'infoService', function ($scope, gameService, resourceService, infoService){
		$scope.newGame = gameService.newGame;
		$scope.popUp = function () {
			infoService.openPopUp('testing popup');
		}
	}])
