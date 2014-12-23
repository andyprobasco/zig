angular
	.module('survivors', [])
	.controller('survivorPanelController', ['$scope', 'resourceService', 'survivorService', 'locationService', function ($scope, resourceService, survivorService, locationService) {

		$scope.refresh = function () {
			$scope.survivors = resourceService.survivors;
			$scope.idleSurvivors = survivorService.idleSurvivors;
			$scope.morale = resourceService.morale;
			$scope.moraleSurvivorChange = survivorService.moraleSurvivorChange;
		}

		$scope.refresh();

		$scope.handleDrop = function (itemID, binID) {
			locationService.transferWorker (itemID, binID);
		}

	}])
	.service('survivorService', ['resourceService', function (resourceService) {
		this.idleSurvivors = {
			currentWorkers: 0
		}
		this.moraleSurvivorChange = {
			text: "Attracting New Survivors",
			progress: 0
		}


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
			//var moraleFactor = -1;

			if (survivorsAreThirsty()) {
				//statusService.setStatus('Thirsty', true);
				resourceService.morale.setChangePerSecond(-1, "Thirsty Survivors");
			} else {
				//statusService.setStatus('Thirsty', false);
				resourceService.morale.setChangePerSecond(0, "Thirsty Survivors");
			}
			if (survivorsAreHungry()) {
				//statusService.setStatus('Starving', true);
				resourceService.morale.setChangePerSecond(-1, "Starving Survivors");
			} else {
				//statusService.setStatus('Starving', false);
				resourceService.morale.setChangePerSecond(0, "Starving Survivors");
			}
			if (survivorsAreScared()) {
				//statusService.setStatus('High Threat', true);
				resourceService.morale.setChangePerSecond(-2, "Scared Survivors");
			} else {
				//statusService.setStatus('High Threat', false);
				resourceService.morale.setChangePerSecond(0, "Scared Survivors");
			}
			resourceService.morale.setChangePerSecond(survivorService.idleSurvivors.currentWorkers * 2);
			resourceService.morale.setChangePerSecond(resourceService.survivors.current, "Survivors");
		}

		function survivorsAreThirsty () {
			if (resourceService.water.current <= 0) {
				return true;
			}
		}
		function survivorsAreHungry () {
			if (resourceService.food.current <= 0) {
				return true;
			}
		}
		function survivorsAreScared () {
			if (resourceService.threat.current >= 100) {
				return true;
			}
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
			} else if (survivorService.moraleSurvivorChange.progres < 0) {
				survivorService.moraleSurvivorChange.progress  = 0;
			}
		}

		function addNewSurvivor() {
			resourceService.survivors.a
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
