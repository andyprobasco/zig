angular
	.module('info', [])
	.controller('infoPanelController', ['$scope', 'infoService', function ($scope, infoService) {
		$scope.message = infoService.message;
	}])
	.service('infoService', [function () {
		this.message = {content:""};
		this.setMessage = function (message) {
			this.message.content = message;
		}
	}])