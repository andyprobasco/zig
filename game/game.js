angular
	.module('game', [])
	.service('gameService', ['$interval', 'resourceService', 'locationService', function ($interval, resourceService, locationService) {
		function gameTick(){
			/*locationManager.neighborhood.tick();
			resourceManager.morale.tick();
			resourceManager.survivors.tick();
			resourceManager.food.tick();
			resourceManager.water.tick();
			resourceManager.scrap.tick();
			resourceManager.threat.tick();
			survivorService.tick();
			hordeService.tick();*/
			locationService.tick();//regions[0][0].tick();
			console.log("tick");
		}
		this.launchGameTick = function () {
			$interval(gameTick, 1000);
		}
		this.launchGameTick();
	}])
	.controller('gameController', ['$scope', 'gameService', function ($scope, gameManager){
	}])
