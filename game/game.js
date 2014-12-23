angular
	.module('game', [])
	.service('gameService', ['$interval', 'resourceService', 'locationService', 'survivorService', 'infoService', 'hordeService', function ($interval, resourceService, locationService, survivorService, infoService, hordeService) {

		var t = 0;
		function microTick(){
			//progress location jobs
			//progress morale
			//progress threat
			//progress attack

			locationService.tick();
			hordeService.tick();
			survivorService.microTick();

			if (t++ > 10) {
				t = 0;
				macroTick();
			}

		}
		function macroTick(){
			survivorService.macroTick();
			resourceService.tick();
		}
		function gameTick(){
			locationService.tick();
			hordeService.tick();
			survivorService.tick();
			resourceService.tick();
		}

		function init () {
			t = 0;
			locationService.init(); //
			resourceService.init(); //
			hordeService.init(); 
			survivorService.init(); 
			infoService.init(); 
		}

		function launchGameTick () {
			//$interval(gameTick, 1000);
			$interval(microTick, 100);
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
