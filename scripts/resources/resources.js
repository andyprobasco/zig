angular
	.module('resources', [])
	.controller('resourcePanelController', ['$scope', 'resourceManager', function($scope, resourceManager) {
		$scope.threat = resourceManager.threat;
		$scope.morale = resourceManager.morale;
		$scope.standardResources = [
			resourceManager.survivors,
			resourceManager.food,
			resourceManager.water,
			resourceManager.scrap
		]
	}])

angular
	.module('resources')
	.factory('resourceFactory', function () {
		return {
			getInstance: function (params) {
				var resource = {};
				var changePerSecondSources = [];
				var multiplierSources = [];

				resource.name = params.name || 'Resource';
				resource.current = params.current || 0;
				resource.max = params.max || 100;
				resource.min = params.min || 0;
				resource.percentFull = resource.current/resource.max*100;

				resource.totalChangePerSecond = 0;

				resource.onChange = function () {};
				resource.changeBy = function (increment) {
					this.current += increment;
					if (this.current > this.max) {
						this.current = this.max;
					} else if (this.current < this.min) {
						this.current = this.min;
					}
					this.percentFull = this.current/this.max*100;
				};
				resource.setChangePerSecond = function (changeBy, source) {
					for (var i = 0; i < changePerSecondSources.length; i++) {
						if (changePerSecondSources[i].source = source) {
							changePerSecondSources[i].changeBy += changeBy;
							this.totalChangePerSecond += changeBy;
							if (changePerSecondSources[i].changeBy === 0) {
								changePerSecondSources.splice(i, 1);
							}
							return;
						}
					}
					changePerSecondSources.push({
						source: source,
						changeBy: changeBy
					});
					this.totalChangePerSecond += changeBy;
					return;
				}
				resource.setMultiplier = function (changeBy, source) {

				}
				resource.tick = function () {
					this.changeBy(this.totalChangePerSecond);
				}

				return resource;
			}
		}
	})

angular
	.module('resources')
	.service('resourceManager', ['resourceFactory', 'morale', 'survivors', function (resourceFactory, morale, survivors) {
		this.survivors = survivors;
		this.morale = morale;
		this.threat = resourceFactory.getInstance({name:'Threat'});
		this.food = resourceFactory.getInstance({name:'Food'});
		this.water = resourceFactory.getInstance({name:'Water'});
		this.scrap = resourceFactory.getInstance({name:'Scrap'});
		
		this.canPayCost = function (cost) {
			if (cost.survivors && cost.survivors > this.survivors.current) return false;
			if (cost.morale && cost.morale > this.morale.current) return false;
			if (cost.threat && cost.threat > this.threat.current) return false;
			if (cost.food && cost.food > this.food.current) return false;
			if (cost.water && cost.water > this.water.current) return false;
			if (cost.scrap && cost.scrap > this.scrap.current) return false;
			return true;
		}
		this.payCost = function (cost) {
			if (cost.survivors) this.survivors.changeBy(-cost.survivors);
			if (cost.morale) this.morale.changeBy(-cost.morale);
			if (cost.threat) this.threat.changeBy(-cost.threat);
			if (cost.food) this.food.changeBy(-cost.food);
			if (cost.water) this.water.changeBy(-cost.water);
			if (cost.scrap) this.scrap.changeBy(-cost.scrap);

		}
	}])

angular
	.module('resources')
	.factory('survivors', ['resourceFactory', function(resourceFactory){
		var survivors = resourceFactory.getInstance({
			name:'Survivors',
			current: 1,
			max: 1
		});
		survivors.changeMaxBy = function (increment) {
			this.current += increment;
			this.max += increment;
			this.percentFull = this.current/this.max*100;
		}
		return survivors;
	}])

angular
	.module('resources')
	.factory('morale', ['resourceFactory', 'survivors', function (resourceFactory, survivors) {
		var morale = resourceFactory.getInstance({
			name: 'Morale',
			current: 1,
			max: 100,
			min: -100
		});
		var UP = 1;
		var DOWN = -1;

		morale.survivorProgressPercent = 0;
		morale.progressDirection = UP;
		morale.percentFullPositive = 0;
		morale.percentFullNegative = 0;

		morale.changeBy = function (increment) {
					this.current += increment;
					if (this.current > this.max) {
						this.current = this.max;
					} else if (this.current < this.min) {
						this.current = this.min;
					}

					if (this.current < 0) {
						this.percentFullNegative = this.current/this.max*-50;
						this.percentFullPositive = 0
					} else {
						this.percentFullPositive = this.current/this.max*50;
						this.percentFullNegative = 0
					}
					//this.percentFull = this.current/this.max*100;
					//this.

				};

		morale.tick = function () {
			if (this.current > 50) {
				//move towards makeaguy
				if (this.progressDirection == UP) {
					this.survivorProgressPercent += 1;
				} else {
					this.survivorProgressPercent -= 1;
				}
			} else if (this.current < -50) {
				//move towards loseaguy
				if (this.progressDirection == DOWN) {
					this.survivorProgressPercent += 1;
				} else {
					this.survivorProgressPercent -= 1;
				}
			} else {
				this.survivorProgressPercent -= 1;
			}

			if (this.survivorProgressPercent < 0) {
				this.survivorProgressPercent = 0;
				if (this.progressDirection == UP) {
					this.progressDirection = DOWN;
				} else {
					this.progressDirection = UP;
				}
			}

			if (this.survivorProgressPercent >= 100) {
				if (this.progressDirection == UP) {
					survivors.changeMaxBy(1);
				} else {
					survivors.changeMaxBy(-1);
				}
				this.survivorProgressPercent = 0;
			}
		}
		morale.changeBy(0);
		return morale;
	}])




angular
	.module('resources')
	.directive('zgResource', function () {
		return {templateUrl: "scripts/resources/resource.html"}
	})
