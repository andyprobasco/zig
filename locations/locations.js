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
	.service('regionService', ['regionFactory', 'resourceService', function (regionFactory, resourceService) {
		this.regions = [];
		this.regions.push([]);
		this.regions.push([]);
		this.regions.push([]);
		this.regions[0].push(newRegion());
		this.regions[0].push(newRegion());
		this.regions[0].push(newRegion());
		this.regions[1].push(newRegion());
		this.regions[1].push(
			regionFactory.getInstance({
				name:"HQ"
			})
		)
		this.regions[1].push(newRegion());
		this.regions[2].push(newRegion());
		this.regions[2].push(newRegion());
		this.regions[2].push(newRegion());

		function newRegion () {
			return regionFactory.getInstance({name:"Empty Building", state:"locked"});
		}
	}])
	.factory('regionFactory', ['jobFactory', 'resourceService', function (jobFactory, resourceService) {
		function buildRegion (params) {
			var region = jobFactory.getInstance(params);
			region.state = params.state || "scouting";
			region.scoutDifficulty = params.scoutDifficulty || 3;
			region.clearDifficulty = params.clearDifficulty || 5;
			region.scavengeDifficulty = params.scavengeDifficulty || 3;
			region.threatModifier = params.threatModifier || 1;
			region.scavengeReward = params.scavengeReward || defaultScavengeReward;
			region.onComplete = onComplete

			region.progressNeeded = region.scoutDifficulty;
			return region;
		}
		var defaultScavengeReward = [{weight:1, reward:function() {
			resourceService.scrap.changeBy(1);
			resourceService.food.changeBy(1);
			resourceService.water.changeBy(1);
		}}]

		function onComplete () {
			if (this.state == "scouting") {
				this.state = "clearing";
				this.progressNeeded = this.clearDifficulty;
			} else if (this.state == "clearing") {
				this.state = "scavenging"
				this.progressNeeded = this.scavengeDifficulty;
			} else if (this.state == "scavenging") {
				this.scavengeReward[0].reward();
			}
		}
		return {
			getInstance: function (params) {
				return buildRegion(params);
			}
		}
	}])