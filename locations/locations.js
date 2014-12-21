angular
	.module('locations', [])
	.controller('locationPanelController', ['$scope', 'resourceService', 'locationService', function ($scope, resourceService, locationService) {
		$scope.activeTab = "neighborhood";
		$scope.survivors = resourceService.survivors;
		$scope.restJob = locationService.restJob;
		$scope.scavengeJob = locationService.scavengeJob;
		$scope.regions = locationService.regions;
	}])
	.service('locationService', ['jobFactory', 'resourceService', 'regionService', function (jobFactory, resourceService, regionService) {
		this.scavengeJob = jobFactory.getInstance({name:'Scavenge'});
		this.scavengeJob.onComplete = function(){
			resourceService.water.changeBy(5);
		}
		this.regions = regionService.regions;
		this.tick = function () {
			for (var x=0;x<this.regions.length;x++) {
				for (var y=0;y<this.regions[x].length;y++) {
					this.regions[x][y].tick();
				}
			}
		}
	}])
	.service('regionService', ['regionFactory', 'resourceService', 'hqFactory', 'warehouseFactory', function (regionFactory, resourceService, hqFactory, warehouseFactory) {
		this.regions = [];
		this.regions.push([]);
		this.regions.push([]);
		this.regions.push([]);

		this.regions[0].push(warehouseFactory.getInstance());
		this.regions[0].push(warehouseFactory.getInstance());
		this.regions[0].push(warehouseFactory.getInstance());

		this.regions[1].push(warehouseFactory.getInstance());
		this.regions[1].push(hqFactory.getInstance());
		this.regions[1].push(warehouseFactory.getInstance());

		this.regions[2].push(warehouseFactory.getInstance());
		this.regions[2].push(warehouseFactory.getInstance());
		this.regions[2].push(warehouseFactory.getInstance());

		function newRegion () {
			return regionFactory.getInstance({name:"Empty Building", state:"locked"});
		}
	}])
	.factory('regionFactory', ['jobFactory', 'resourceService', function (jobFactory, resourceService) {
		function buildRegion (params) {
			params = params || {};

			var region = jobFactory.getInstance(params);
			region.changeState = changeState;
			region.states = params.states || {};
			
			if (!region.states["Locked"]) {
				region.states["Locked"] = {
					progressNeeded: 1,
					onComplete: function () {}
				}
			}

			if (!region.states["Scouting"]) {
				region.states["Scouting"] = {
					progressNeeded: 3,
					onComplete: function () {
						this.changeState("Clearing");
					}
				}
			}
			if (!region.states["Clearing"]) {
				region.states["Clearing"] = {
					progressNeeded: 5,
					onComplete: function () {
						this.changeState("Scavenging");
					}
				}
			}
			if (!region.states["Scavenging"]) {
				region.states["Scavenging"] = {
					progressNeeded: 5,
					onComplete: function () {
						resourceService.food.changeBy(1);
						resourceService.water.changeBy(1);
						resourceService.scrap.changeBy(1);
					}
				}
			}
			region.defaultState = params.defaultState || "Scouting";
			region.changeState(region.defaultState);
			return region;
		}

		function changeState (newState) {
			var state = this.states[newState];
			console.log('changing state to ' + newState);
			if (state) {
				this.state = newState;
				this.onComplete = state.onComplete;
				this.progressNeeded = state.progressNeeded;
				this.progress = 0;
			} else {
				console.log("invalid state [" + newState + "] specified");
			}
		}

		return {
			getInstance: function (params) {
				return buildRegion(params);
			}
		}
	}])
	.factory('hqFactory', ['regionFactory', 'resourceService', function (regionFactory, resourceService) {
		function buildHQ () {
			var hq = regionFactory.getInstance({
				name: 'HQ'
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
		function buildWarehouse () {
			var warehouse = regionFactory.getInstance({
				name: 'Warehouse',
				defaultState: 'Locked'
			});
			return warehouse;
		}
		return {
			getInstance: function () {
				return buildWarehouse();
			}
		}
	}])