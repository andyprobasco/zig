angular
	.module('location')
	.factory('subregionFactory', ['resourceManager', '$interval', 'logService', function (resourceManager, $interval, logService){
		var Subregion = function () {
			this.name = 'Subregion';
			this.type = null;
			this.art = 'no art path specified';
			this.tick = function () {};
			this.buildCost = {};
			this.onBuild = function () {};
			this.onDestroy = function () {};
		}
		function makeClickable (subregion) {
			subregion.clickable = true;
			subregion.clickText = "Click Here"
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
						console.log(subregion.percentFull);
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
					this.currentWorkers += 1;
					this.onAddWorker();
					logService.log("added worker to " + this.name);

				}
			}
			subregion.removeWorker = function () {
				if (this.currentWorkers > 0) {
					resourceManager.survivors.changeBy(1);
					this.currentWorkers -= 1;
					this.onRemoveWorker();
				}
			}
			subregion.onAddWorker = function () {};
			subregion.onRemoveWorker = function () {};
		}
		function makeUpgradeable (subregion) {
			subregion.upgradeable = true;
			subregion.level = 0;
			subregion.upgradeCost = {};
			subregion.upgrade = function () {
				if (resourceManager.canPayCost(this.upgradeCost)) {
					resourceManager.payCost(this.upgradeCost);
					this.level += 1;
					this.onUpgrade();
					this.updateUpgradeCost();
					logService.log("upgraded " + this.name);
				} else {
					logService.log("can't afford to upgrade " + this.name);
				}
			};
			subregion.updateUpgradeCost = function () {};
			subregion.onUpgrade = function () {};
			subregion.onDowngrade = function () {};
		}
		function makeReplaceable (subregion) {
			subregion.replaceable = true;
			subregion.replacementOptions = [];
			subregion.replaceThisWith; //abstract function, overwritten by region generator;
			subregion.onDestroy = function () {};
			subregion.addReplacementOption = function (constructor) {
				subregion.replacementOptions.push(constructor());
			}
		}

		var constructors = {
			newPerimeter: function () {
				var subregion = new Subregion();
				subregion.name = "Perimeter";
				makeClickable(subregion);
				subregion.clickText = "Patrol";
				makeWorkable(subregion);
				subregion.onTaskComplete = function (){
					resourceManager.threat.changeBy(-10);
				}
				/*subregion.tick = function () {
					resourceManager.threat.changeBy(-this.currentWorkers*2);
				}*/
				subregion.onAddWorker = function () {
					resourceManager.threat.modifyChangePerSecond(-2, "Patrolling");
				}
				subregion.onRemoveWorker = function () {
					resourceManager.threat.modifyChangePerSecond(2, "Patrolling");
				}

				return subregion;
			},
			newJunkPile: function () {
				var subregion = new Subregion();
				subregion.name = "Junk Pile";
				makeClickable(subregion);

				subregion.clickText = "Scavenge"
				subregion.onTaskComplete = function (){
					resourceManager.scrap.changeBy(5);
					resourceManager.threat.changeBy(5);
				}


				makeWorkable(subregion);
				subregion.onAddWorker = function () {
					resourceManager.threat.modifyChangePerSecond(1, "Scavenging");
					resourceManager.scrap.modifyChangePerSecond(1, "Scavenging");
				}
				subregion.onRemoveWorker = function () {
					resourceManager.threat.modifyChangePerSecond(-1, "Scavenging");
					resourceManager.scrap.modifyChangePerSecond(-1, "Scavenging");
				}

				return subregion;
			},
			newEmptyPlot: function () {
				var subregion = new Subregion();
				subregion.name = "Empty Plot";
				makeReplaceable(subregion);
				subregion.addReplacementOption(constructors.newWell);
				subregion.addReplacementOption(constructors.newBeds);
				subregion.addReplacementOption(constructors.newAntiBeds);

				return subregion;
			},
			newWell: function () {
				var subregion = new Subregion();
				subregion.name = "Well";
				subregion.buildCost = {scrap:50};
				makeUpgradeable(subregion);
				subregion.upgradeCost= {scrap:50};
				//makeBuildable(subregion);
				subregion.onBuild = function () {
					resourceManager.water.modifyChangePerSecond(1, "Wells");
				}
				subregion.onDestroy = function () {
					resourceManager.water.modifyChangePerSecond(-1, "Wells");
				}
				subregion.onUpgrade = function () {
					console.log("upgrading a well");
					resourceManager.water.modifyChangePerSecond(1, "Wells");
				}
				subregion.onDowngrade = function () {
					resourceManager.water.modifyChangePerSecond(-1, "Wells");
				}
				return subregion;
			},
			newBeds: function () {
				var subregion = new Subregion();
				subregion.name = "Beds";
				subregion.buildCost = {scrap:50};
				makeUpgradeable(subregion);
				subregion.upgradeCost = {scrap:50};
				//makeBuildable(subregion);
				subregion.onBuild = function () {
					resourceManager.morale.modifyChangePerSecond(1);
				}
				subregion.onUpgrade = function () {
					resourceManager.morale.modifyChangePerSecond(1);
				}
				subregion.onDestroy = function () {
					resourceManager.morale.modifyChangePerSecond(-1);
				}
				subregion.onDowngrade = function () {
					resourceManager.morale.modifyChangePerSecond(-1);
				}
				return subregion;

			},
			newAntiBeds: function () {
				var subregion = new Subregion();
				subregion.name = "AntiBeds";
				subregion.buildCost = {scrap:50};
				makeUpgradeable(subregion);
				subregion.upgradeCost = {scrap:50};
				//makeBuildable(subregion);
				subregion.onBuild = function () {
					resourceManager.morale.modifyChangePerSecond(-1);
				}
				subregion.onUpgrade = function () {
					resourceManager.morale.modifyChangePerSecond(-1);
				}
				subregion.onDestroy = function () {
					resourceManager.morale.modifyChangePerSecond(1);
				}
				subregion.onDowngrade = function () {
					resourceManager.morale.modifyChangePerSecond(1);
				}
				return subregion;

			}
		}
		return constructors;
	}])

angular
	.module('location')
	.directive('zgSubregion', function () {
		return {
			templateUrl: "scripts/location/subregion/subregion.html"
		}
	})
	.directive('zgSubregionReplacement', function () {
		return {
			templateUrl: "scripts/location/subregion/subregionReplacement.html"
		}
	})

