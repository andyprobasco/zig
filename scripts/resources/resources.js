angular
	.module('resources', [])
	.controller('resourcePanelController', ['$scope', 'resourceManager', function($scope, resourceManager) {
		$scope.resources = [
			resourceManager.threat,
			resourceManager.food,
			resourceManager.water,
			resourceManager.scrap
		]
	}])
	.service('resourceManager', function () {
		this.threat = new Resource({name:'Threat'});
		this.food = new Resource({name:'Food'});
		this.water = new Resource({name:'Water'});
		this.scrap = new Resource({name:'Scrap'});
	})

var Resource = function (params) {
	this.name = params.name || 'Resource';
	this.current = params.current || 0;
	this.max = params.max || 100;

	this.changeBy = function (increment) {
		this.current += increment;
		if (this.current > this.max) {
			this.current = this.max;
		} else if (this.current < 0) {
			this.current = 0;
		}
	};
}

