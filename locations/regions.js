angular
	.module('locations')
	.service('regionService', ['regionFactory', 'hqFactory', 'warehouseFactory', function (regionFactory, hqFactory, warehouseFactory) {

		this.regions = [];

		this.init = function () {
			while (this.regions.length) {
				this.regions.pop();
			}
			this.regions.push([]);
			this.regions.push([]);
			this.regions.push([]);

			this.regions[0].push(warehouseFactory.getInstance(2));
			this.regions[0].push(warehouseFactory.getInstance(3));
			this.regions[0].push(warehouseFactory.getInstance(4));

			this.regions[1].push(warehouseFactory.getInstance(1));
			this.regions[1].push(hqFactory.getInstance());
			this.regions[1].push(warehouseFactory.getInstance(5));

			this.regions[2].push(warehouseFactory.getInstance(6));
			this.regions[2].push(warehouseFactory.getInstance(7));
			this.regions[2].push(warehouseFactory.getInstance(8));
		}

		this.tick = function () {
			for (var x=0;x<this.regions.length;x++) {
				for (var y=0;y<this.regions[x].length;y++) {
					this.regions[x][y].tick();
				}
			}
		}


	}])
	.factory('regionFactory', ['jobFactory', 'resourceService', function (jobFactory, resourceService) {
		function buildRegion (params) {
			params = params || {};
			params.name = params.name || "Region";
			params.states = params.states || {};
			if (!params.states["Scouting"]) {
				params.states["Scouting"] = {
					progressNeeded: 3,
					onComplete: function () {
						this.changeState("Clearing");
					}
				}
			}
			if (!params.states["Clearing"]) {
				params.states["Clearing"] = {
					progressNeeded: 5,
					onComplete: function () {
						this.changeState("Scavenging");
					}
				}
			}
			if (!params.states["Scavenging"]) {
				params.states["Scavenging"] = {
					progressNeeded: 5,
					onComplete: function () {
						this.getScavengeReward();
					}
				}
			}

			var region = jobFactory.getInstance(params);
			region.getScavengeReward = function () {
				var rewardList = [];
				for (var i = 0; i < this.scavengeRewards.length; i++) {
					for (var j = 0; j < this.scavengeRewards[i].weight; j++) {
						rewardList.push(i);
					}
				}
				if (rewardList.length > 0) {
					var randomIndex = Math.floor(Math.random() * rewardList.length);
					console.log(this.scavengeRewards);
					console.log(rewardList);
					console.log("random index = [" + randomIndex + "]");
					this.scavengeRewards[rewardList[randomIndex]].onComplete();
				}
			}

			region.scavengeRewards = [{
				weight: 1,
				onComplete: function () {
					resourceService.food.changeBy(1);
					resourceService.water.changeBy(1);
					resourceService.scrap.changeBy(1);
				}
			}]
			return region;
		}

		return {
			getInstance: function (params) {
				return buildRegion(params);
			}
		}
	}])
	.factory('hqFactory', ['regionFactory', 'resourceService', 'subregionService', function (regionFactory, resourceService, subregionService) {
		function buildHQ () {
			var hq = regionFactory.getInstance({
				name: 'HQ',
				defaultState: 'Scouting',
				states: {
					'Clearing': {
						progressNeeded: 5,
						onComplete: function () {
							this.changeState("Patrolling");
							subregionService.subregions.unlocked = true;
						}
					},
					'Patrolling': {
						progressNeeded: 1,
						onWorkerUpdate: function () {
							resourceService.threat.setChangePerSecond(-this.currentWorkers, 'Patrolling Survivors');
						}
					}
				}
			});
			return hq;
		}
		return {
			getInstance: function () {
				return buildHQ();
			}
		}	
	}])
	.factory('warehouseFactory', ['regionFactory', 'resourceService', function (regionFactory, resourceService) {
		function buildWarehouse (survivorsToUnlock) {
			survivorsToUnlock = survivorsToUnlock || 1;
			var warehouse = regionFactory.getInstance({
				name: 'Warehouse',
				defaultState: 'Locked',
				checkForUnlock: function () {
					if (this.state === "Locked" && resourceService.survivors.current >= survivorsToUnlock) {
						this.changeState('Scouting');
					}
				}
			});
			return warehouse;
		}
		return {
			getInstance: function (survivorsToUnlock) {
				return buildWarehouse(survivorsToUnlock);
			}
		}
	}])