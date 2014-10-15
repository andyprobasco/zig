angular
	.module('logger', [])
	.service('logService', ['$timeout', function ($timeout) {
		var timeout;
		this.messageQueue = [];
		this.log = function (message) {
			console.log("[GAMELOG]: " + message);
			this.messageQueue.unshift(message);
			this.newMessageClass = "log-message-new";
			var that = this;
			console.log(that);
			$timeout.cancel(timeout);
			timeout = $timeout(function(){$timeout.cancel(timeout); that.newMessageClass = "log-message"; console.log(that); }, 3000)

		};
		this.newMessageClass = "log-message";
		this.log("");this.log("");this.log("");
	}])
	.controller('logController', ['$scope', 'logService', function ($scope, logService) {
		//$scope.messageQueue = [];
		$scope.messageQueue = logService.messageQueue;
		$scope.logService = logService;
	}])