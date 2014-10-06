angular
	.module('location')
	.factory('subregionFactory', ['resourceManager', '$interval', function (resourceManager, $interval){
		var Subregion = function () {
			this.name = 'Subregion';
			this.type = null;
			this.art = 'no art path specified';
			this.tick = function () {}
		}
		function makeClickable (subregion) {
			subregion.clickable = true;
			subregion.percentFull = 0;
			subregion.taskLength = 2; // in seconds
			var currentTask
			var taskActive = false;
			subregion.launchTask = function () {
				if (!taskActive) {
					var taskInterval = subregion.taskLength * 10 // 1% of a second
					currentTask = $interval(taskTick, taskInterval);
					taskActive = true;
					function taskTick () {
						subregion.percentFull += 1;
						if (subregion.percentFull >= 100) {
							subregion.percentFull = 0;
							taskActive = false;
							subregion.onTaskComplete();
							$interval.cancel(currentTask);
						}
					}
				}
			}
			subregion.onTaskComplete = function () {};
		}
		function makeWorkable (subregion) {
			subregion.workable = true;
			subregion.currentWorkers = 0;
			subregion.addWorker = function () {
				if (resourceManager.survivors.current > 0) {
					resourceManager.survivors.changeBy(-1);
					subregion.currentWorkers += 1;
				}
			}
			subregion.removeWorker = function () {
				if (subregion.currentWorkers > 0) {
					subregion.currentWorkers -= 1;
					resourceManager.survivors.changeBy(1);
				}
			}
		}
		function makeUpgradeable (subregion) {
			subregion.upgradeable = true;
			subregion.level = 0;
		}
		function makeReplaceable (subregion) {
			subregion.replaceable = true;
			subregion.replacementOptions = [];
			subregion.replaceThisWith; //abstract function, overwritten by region generator;
			subregion.addReplacementOption = function (constructor) {
				subregion.replacementOptions.push(constructor());
			}
		}

		var constructors = {
			newPatrol: function () {
				var subregion = new Subregion();
				subregion.name = "Patrol";
				makeClickable(subregion);
				makeWorkable(subregion);
				subregion.onTaskComplete = function (){
					resourceManager.threat.changeBy(-10);
				}
				subregion.tick = function () {
					resourceManager.threat.changeBy(-this.currentWorkers*2);
				}

				return subregion;
			},
			newScavenge: function () {
				var subregion = new Subregion();
				subregion.name = "Scavenge";
				makeClickable(subregion);
				makeWorkable(subregion);
				subregion.onTaskComplete = function (){
					resourceManager.scrap.changeBy(5);
					resourceManager.threat.changeBy(5);
				}
				subregion.tick = function () {
					resourceManager.scrap.changeBy(this.currentWorkers);
					resourceManager.threat.changeBy(this.currentWorkers);
				}
				return subregion;
			},
			newEmptyPlot: function () {
				var subregion = new Subregion();
				subregion.name = "Empty Plot";
				makeReplaceable(subregion);
				subregion.addReplacementOption(constructors.newPatrol);
				subregion.addReplacementOption(constructors.newScavenge);
				subregion.addReplacementOption(constructors.newWell);
				return subregion;
			},
			newWell: function () {
				var subregion = new Subregion();
				subregion.name = "Well";
				makeUpgradeable(subregion);
				subregion.tick = function () {
					resourceManager.water.changeBy(1);
					resourceManager.morale.changeBy(10);
				}
				return subregion;
			},
			newBeds: function () {
				var subregion = new Subregion();
				subregion.name = "Beds";
				makeUpgradeable(subregion);
				subregion.tick = function () {
					//resourceManager.morale.changeBy(1);
				}
			}
		}
		return constructors;
	}])

angular
	.module('location')
	.directive('zgSubregion', function () {
		return {
			templateUrl: "scripts/location/subregion.html"
		}
	})

