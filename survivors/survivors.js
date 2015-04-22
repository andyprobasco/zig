angular
	.module('survivors', [])
	.controller('survivorPanelController', ['$scope', 'resourceService', 'survivorService', 'locationService', function ($scope, resourceService, survivorService, locationService) {
		$scope.refresh = function () {
			$scope.survivors = resourceService.survivors;
			$scope.idleSurvivors = survivorService.idleSurvivors;
		}
		$scope.handleDrop = function (itemID, binID) {
			locationService.transferWorker (itemID, binID);
		}
		$scope.refresh();
	}])
	.controller('moralePanelController', ['$scope', 'resourceService', 'survivorService', 'locationService', function ($scope, resourceService, survivorService, locationService) {
		$scope.refresh = function () {
			$scope.morale = resourceService.morale;
			$scope.moraleSurvivorChange = survivorService.moraleSurvivorChange;
		}
		$scope.refresh();
	}])
	.service('survivorService', ['resourceService', function (resourceService) {
		this.idleSurvivors = {
			currentWorkers: 0
		}
		this.moraleSurvivorChange = {
			text: "Attracting New Survivors",
			progress: 0,
			percentFull: 0
		}

		var drinkRate = -1;
		var eatRate = -1;


		this.init = function () {
			this.idleSurvivors.currentWorkers = resourceService.survivors.current;
			this.moraleSurvivorChange.text = "Attracting New Survivors";
			this.moraleSurvivorChange.progress = 0;
		}

		var survivorService = this;
		
		this.tick = function () {
			consumeResources();
			calculateMorale();
			processMorale();
		}
		this.microTick = function () {
			processMorale();
		}
		this.macroTick = function () {
			consumeResources();
			calculateMorale();
		}

		function consumeResources () {
			var survivors = resourceService.survivors.current;
			resourceService.food.setChangePerSecond(-survivors, "Survivors");
			resourceService.water.setChangePerSecond(-survivors, "Survivors");
		}

		function calculateMorale() {
			resourceService.morale.setChangePerSecond(-getNumberOfThirstySurvivors(), "Thirsty Survivors");
			resourceService.morale.setChangePerSecond(-getNumberOfHungrySurvivors(), "Hungry Survivors");
			//survivor fear/danger level
			resourceService.morale.setChangePerSecond(survivorService.idleSurvivors.currentWorkers * 2, "Resting Survivors");
			resourceService.morale.setChangePerSecond(-resourceService.survivors.current, "Total Survivors");
			console.log(resourceService.morale.tooltip)
		}

		function getNumberOfThirstySurvivors () {
			var waterLeftNextTick = (resourceService.water.current + resourceService.water.totalChangePerSecond);
			var count = waterLeftNextTick * drinkRate;
			var numberOfSurvivors = resourceService.survivors.current;

			if (count > numberOfSurvivors) return numberOfSurvivors;
			if (count <= 0) return 0;
			return count;
		}

		function getNumberOfHungrySurvivors () {
			var foodLeftNextTick = (resourceService.food.current + resourceService.food.totalChangePerSecond);
			var count = foodLeftNextTick * eatRate;
			var numberOfSurvivors = resourceService.survivors.current;

			if (count > numberOfSurvivors) return numberOfSurvivors;
			if (count <= 0) return 0;
			return count;
		}

		function processMorale () {
			var morale = resourceService.morale.totalChangePerSecond;
			
			survivorService.moraleSurvivorChange.progress += morale;
	

			if (survivorService.moraleSurvivorChange.progress >= 50) {
				if (resourceService.survivors.max > resourceService.survivors.current) {
					resourceService.survivors.changeBy(1);
					survivorService.idleSurvivors.currentWorkers += 1;
					survivorService.moraleSurvivorChange.progress = 0;
				} else {
					survivorService.moraleSurvivorChange.progress = 50;
				}
			} else if (survivorService.moraleSurvivorChange.progress < 0) {
				survivorService.moraleSurvivorChange.progress  = 0;
			}

			survivorService.moraleSurvivorChange.percentFull = survivorService.moraleSurvivorChange.progress/50*100
		}


		function pullAWorker () {
			/*var regions = locationManager.neighborhood.regions
			for (var i = 0; i < regions.length; i++) {
				var region = regions[i];
				for (var j = 0; j < region.subregions.length; j++) {
					var subregion = region.subregions[j];
					if (subregion.workable && subregion.currentWorkers > 0) {
						subregion.removeWorker();
						console.log("removed a worker from " + subregion.name)
						return;
					}
				}
			}*/
		}

	}])
	.directive('zgDraggable', function () {
		return function (scope, element) {
			var el = element[0];
			el.draggable = true;

			el.addEventListener(
				'dragstart',
				function(e) {
					e.dataTransfer.effectAllowed = 'move';
					console.log("dragging " + this.id);
					console.log(this);
					e.dataTransfer.setData('Text', this.id);
					this.classList.add('drag');
					return false;
				},
				false
			);

			el.addEventListener(
				'dragend',
				function(e) {
					this.classList.remove('drag');
					return false;
				},
				false
			);
		}
	})
	.directive('zgDroppable', function () {
		return {
			scope: {
				drop: '&' ,
				bin: '='
			},
			link: function (scope, element) {
				var el = element[0];
				el.addEventListener(
					'dragover',
					function(e) {
						e.dataTransfer.dropEffect = 'move';
						// allows us to drop
						if (e.preventDefault) e.preventDefault();
						this.classList.add('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'dragenter',
					function(e) {
						this.classList.add('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'dragleave',
					function(e) {
						this.classList.remove('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'drop',
					function(e) {
						// Stops some browsers from redirecting.
						if (e.stopPropagation) {e.stopPropagation();}
						if (e.preventDefault) {e.preventDefault();}

						this.classList.remove('over');

						var binId = this.id;
						var item = document.getElementById(e.dataTransfer.getData('Text'));
						console.log(e.dataTransfer.getData('Text'));
						//this.appendChild(item); //
						scope.$apply(function (scope) {
							var fn = scope.drop();
							if ('undefined' !== typeof fn) {
								fn(item.id, binId);
							}
						});

						return false;
					},
					false
				);

			}
		}
	})
