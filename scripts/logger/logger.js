angular
	.module('logger', [])
	.service('logService', [function () {
		this.messageQueue = [];
		this.log = function (message) {
			console.log("[GAMELOG]: " + message);
			this.messageQueue.unshift(message);
			this.firstMessage = this.messageQueue[0];
			this.secondMessage = this.messageQueue[1];
			this.thirdMessage = this.messageQueue[2];
		};
		this.firstMessage = "";
		this.secondMessage = "";
		this.thirdMessage = "";
		this.log("");this.log("");this.log("");
	}])
	.controller('logController', ['$scope', 'logService', function ($scope, logService) {
		//$scope.messageQueue = [];
		$scope.messageQueue = logService.messageQueue;
		$scope.firstMessage = logService.firstMessage;
		$scope.secondMessage = logService.secondMessage;
		$scope.thirdMessage = logService.thirdMessage;

	}])