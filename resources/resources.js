angular
	.module('resources', [])
	.controller('resourcePanelController', ['$scope', 'resourceService', 'featureLockService', function($scope, resourceManager, featureLockService) {
		$scope.refresh = function () {
			$scope.resources = [
				resourceManager.food,
				resourceManager.water,
				resourceManager.scrap
			]
			$scope.featureLockService = featureLockService;
			console.log(resourceManager.food);
		}
		$scope.refresh();
	}])

angular
	.module('resources')
	.factory('resourceFactory', function () {
		return {
			getInstance: function (params) {
				var resource = {};
				resource.changePerSecondSources = [];
				resource.tooltip = "<h3>Total: 0 p/s</h3>";

				resource.name = params.name || 'Resource';
				resource.current = params.current || 0;
				resource.min = params.min || 0;
				resource.max = params.max || 100;
				resource.status = {
					percentFull: resource.current/resource.max*100,
					text: ""
				}

				resource.totalChangePerSecond = 0;

				resource.changeBy = function (increment) {
					this.current += increment;
					if (this.current > this.max) {
						this.current = this.max;
					} else if (this.current < this.min) {
						this.current = this.min;
					}
					this.status.percentFull = this.current/this.max*100;
				};
				resource.changeMaxBy = function (increment) {
					this.max += increment;
					if (this.max < this.min) {
						this.max = this.min;
					}
					this.status.percentFull = this.current/this.max*100;
				}

				resource.modifyChangePerSecond = function (changeBy, source) {
					for (var i = 0; i < this.changePerSecondSources.length; i++) {
						if (this.changePerSecondSources[i].source === source) {
							this.changePerSecondSources[i].changeBy += changeBy;
							this.totalChangePerSecond += changeBy;
							if (this.changePerSecondSources[i].changeBy === 0) {
								this.changePerSecondSources.splice(i, 1);
							}
							this.setTooltip();
							return;
						}
					}
					this.changePerSecondSources.push({
						source: source,
						changeBy: changeBy
					});
					this.totalChangePerSecond += changeBy;
					this.setTooltip();
					return;
				}

				resource.setChangePerSecond = function (changeTo, source) {
					for (var i = 0; i < this.changePerSecondSources.length; i++) {
						if (this.changePerSecondSources[i].source === source) {
							this.totalChangePerSecond += changeTo - this.changePerSecondSources[i].changeBy;
							this.changePerSecondSources[i].changeBy = changeTo;
							if (changeTo === 0) {
								this.changePerSecondSources.splice(i, 1);
							}
							this.setTooltip();
							return;
						}
					}
					if (changeTo !== 0) {
						this.changePerSecondSources.push({
							source: source,
							changeBy: changeTo
						});
						this.totalChangePerSecond += changeTo;
					}
					this.setTooltip();
					return;
				}
				resource.setMultiplier = function (changeBy, source) {

				}
				resource.tick = function () {
					this.changeBy(this.totalChangePerSecond);
				}
				resource.setTooltip = function () {
					this.tooltip = "<h3>Total: " + this.totalChangePerSecond + " p/s</h3>";
					for (var i = 0; i < this.changePerSecondSources.length; i++) {
						this.tooltip += "<div>" + this.changePerSecondSources[i].changeBy + " p/s from: " + this.changePerSecondSources[i].source + "</div>"
					}
					this.tooltip += "<p></p>"
				}

				resource.reset = function (params) {
					params = params || {};
					while (this.changePerSecondSources.length > 0) {
						this.changePerSecondSources.pop();
					}
					this.totalChangePerSecond = 0;
					this.current = params.current || 0;
					this.max = params.max || 100;
					this.setTooltip();
				}
				return resource;
			}
		}
	})

angular
	.module('resources')
	.service('resourceService', ['resourceFactory', function (resourceFactory) {

		this.init = function (params) {
			this.horde.reset({max:100000});
			this.defense.reset({max:10000});// = resourceFactory.getInstance({name:'Defense Rating', current:0, max:10000})
			this.morale.reset({max:100});// = resourceFactory.getInstance({name:'Morale', max:100,min:-100});
			this.threat.reset({max:100});// = resourceFactory.getInstance({name:'Threat', max:100,min:-100});
			this.survivors.reset({current:1, max:1});// = resourceFactory.getInstance({name:'Survivors', current:4, max:10});
			this.food.reset();// = resourceFactory.getInstance({name:'Food'});
			this.water.reset();// = resourceFactory.getInstance({name:'Water'});
			this.scrap.reset();// = resourceFactory.getInstance({name:'Scrap', current:0, max:100});
		}

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
		this.tick = function () {
			this.food.tick();
			this.water.tick();
			this.scrap.tick();
		}

		this.horde = resourceFactory.getInstance({name:'Horde'});
		this.defense = resourceFactory.getInstance({name:'Defense Rating'})
		this.morale = resourceFactory.getInstance({name:'Morale'});
		this.threat = resourceFactory.getInstance({name:'Threat'});
		this.survivors = resourceFactory.getInstance({name:'Survivors'});
		this.food = resourceFactory.getInstance({name:'Food'});
		this.water = resourceFactory.getInstance({name:'Water'});
		this.scrap = resourceFactory.getInstance({name:'Scrap'});
		this.init();
	}])

angular
	.module('resources')
	.directive('zgResource', function () {
		return {templateUrl: "resources/resource.html"}
	})
