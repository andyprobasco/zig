angular
	.module('logger', [])
	.service('logService', ['$timeout', function ($timeout) {
		var timeout;
		this.messageQueue = [];
		this.log = function (message) {
			this.messageQueue.unshift(message);
			this.newMessageClass = "log-message-new";
			var that = this;
			$timeout.cancel(timeout);
			timeout = $timeout(function(){$timeout.cancel(timeout); that.newMessageClass = "log-message";}, 3000)

		};
		this.newMessageClass = "log-message";
		this.log("");this.log("");this.log("");
	}])
	.controller('logController', ['$scope', 'logService', function ($scope, logService) {
		$scope.messageQueue = logService.messageQueue;
		$scope.logService = logService;
	}])