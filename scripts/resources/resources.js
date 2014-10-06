angular
	.module('resources', [])
	.controller('resourcePanelController', ['$scope', 'resourceManager', function($scope, resourceManager) {
		$scope.resources = [
			resourceManager.morale,
			resourceManager.survivors,
			resourceManager.threat,
			resourceManager.food,
			resourceManager.water,
			resourceManager.scrap
		]
	}])
	
angular
	.module('resources')
	.service('resourceManager', ['resourceFactory', 'morale', 'survivors', function (resourceFactory, morale, survivors) {
		this.survivors = survivors;
		this.morale = morale;
		this.threat = resourceFactory.getInstance({name:'Threat'});
		this.food = resourceFactory.getInstance({name:'Food'});
		this.water = resourceFactory.getInstance({name:'Water'});
		this.scrap = resourceFactory.getInstance({name:'Scrap'});
		
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
			current: 0,
			max: 100,
			min: -100
		});
		var UP = 1;
		var DOWN = -1;

		morale.percentFull = 0;
		morale.progressDirection = UP;

		morale.tick = function () {
			if (this.current > 50) {
				//move towards makeaguy
				if (this.progressDirection == UP) {
					this.percentFull += 1;
				} else {
					this.percentFull -= 1;
				}
			} else if (this.current < -50) {
				//move towards loseaguy
				if (this.progressDirection == DOWN) {
					this.percentFull += 1;
				} else {
					this.percentFull -= 1;
				}
			} else {
				this.percentFull -= 1;
			}

			if (this.percentFull < 0) {
				this.percentFull = 0;
				if (this.progressDirection == UP) {
					this.progressDirection = DOWN;
				} else {
					this.progressDirection = UP;
				}
			}

			if (this.percentFull >= 100) {
				if (this.progressDirection == UP) {
					survivors.changeMaxBy(1);
				} else {
					survivors.changeMaxBy(-1);
				}
				this.percentFull = 0;
			}


		}

		return morale;
	}])


angular
	.module('resources')
	.factory('resourceFactory', function () {
		return {
			getInstance: function (params) {
				var resource = {};
				resource.name = params.name || 'Resource';
				resource.current = params.current || 0;
				resource.max = params.max || 100;
				resource.min = params.min || 0;
				resource.percentFull = resource.current/resource.max*100;

				resource.changeBy = function (increment) {
					this.current += increment;
					if (this.current > this.max) {
						this.current = this.max;
					} else if (this.current < this.min) {
						this.current = this.min;
					}
					this.percentFull = this.current/this.max*100;
					console.log(this.percentFull);
				};
				return resource;
			}
		}
	})

angular
	.module('resources')
	.directive('zgResource', function () {
		return {templateUrl: "scripts/resources/resource.html"}
	})
