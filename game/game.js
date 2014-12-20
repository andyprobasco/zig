angular
	.module('game', [])
	.service('gameService', ['$interval', 'resourceService', 'locationService', 'survivorService', 'infoService', 'hordeService', function ($interval, resourceService, locationService, survivorService, infoService, hordeService) {
		function gameTick(){
			ticktock();
			locationService.tick();
			hordeService.tick();
			survivorService.tick();
			resourceService.tick();
		}
		this.launchGameTick = function () {
			$interval(gameTick, 1000);
		}
		this.launchGameTick();


		var x = 1;
		function ticktock () {
			if (x) {
				infoService.setMessage("tick");
				x=0;
			} else {
				infoService.setMessage("tock");
				x=1;
			}

		}
	}])
	.controller('gameController', ['$scope', 'gameService', function ($scope, gameManager){
	}])
