angular
	.module('game', [])
	.service('gameService', ['$interval', 'resourceService', 'locationService', 'survivorService', 'infoService', 'hordeService', 'featureLockService', function ($interval, resourceService, locationService, survivorService, infoService, hordeService, featureLockService) {

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

			featureLockService.unlockSurvivorsPanel();
			featureLockService.unlockLocationPanel();
			//featureLockService.unlockInfoPanel();
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
	.controller('gameController', ['$scope', 'gameService', 'resourceService', 'infoService', 'survivorService', 'featureLockService', function ($scope, gameService, resourceService, infoService, survivorService, featureLockService) {
		$scope.newGame = gameService.newGame;
		$scope.popUp = function () {
			infoService.openPopUp('testing popup');
		}
		$scope.maxResources = function () {
			resourceService.food.changeBy(1000000);
			resourceService.water.changeBy(1000000);
			resourceService.scrap.changeBy(1000000);
		}

		$scope.newSurvivor = function () {
			resourceService.survivors.changeMaxBy(1);
			resourceService.survivors.changeBy(1);
			survivorService.idleSurvivors.currentWorkers += 1;
		}

		$scope.unlockAllFeatures = function () {
			console.log("unlocking");
			featureLockService.unlockAttackPanel();
			featureLockService.unlockMoralePanel();
			featureLockService.unlockSurvivorsPanel();
			featureLockService.unlockThreatPanel();
			featureLockService.unlockResourcesPanel();
			featureLockService.unlockLocationPanel();
			featureLockService.unlockInfoPanel();			
		}
	}])
	.service('featureLockService', [function () {
		this.attackPanelClass = "panel-disabled";
		this.moralePanelClass = "panel-disabled";
		this.survivorsPanelClass = "panel-disabled";
		this.threatPanelClass = "panel-disabled";
		this.resourcesPanelClass = "panel-disabled";
		this.locationPanelClass = "panel-disabled";
		this.infoPanelClass = "panel-disabled";

		this.unlockAttackPanel = function () {
			this.attackPanelClass = "";
		}
		this.unlockMoralePanel = function () {
			this.moralePanelClass = "";
		}
		this.unlockSurvivorsPanel = function () {
			this.survivorsPanelClass = "";
		}
		this.unlockThreatPanel = function () {
			this.threatPanelClass = "";
		}
		this.unlockResourcesPanel = function () {
			this.resourcesPanelClass = "";
		}
		this.unlockLocationPanel = function () {
			this.locationPanelClass = "";
		}
		this.unlockInfoPanel = function () {
			this.infoPanelClass = "";
		}

	}])

