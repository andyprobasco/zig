angular
	.module('info', [])
	.controller('infoPanelController', ['$scope', 'infoService', function ($scope, infoService) {
		$scope.refresh = function () {
			$scope.message = infoService.message;
		}
		$scope.refresh();
	}])
	.controller('popUpController', ['$scope', 'infoService', function ($scope, infoService) {
		$scope.popUp = infoService.popUp;
		$scope.closePopUp = infoService.closePopUp;
	}])
	.service('infoService', [function () {
		this.message = {content:""};
		this.popUp = {
			content:"",
			visible:false,
		}
		this.setMessage = function (message) {
			this.message.content = message;
		}
		this.openPopUp = function (message) {
			this.popUp.content = message;
			this.popUp.visible = true;
		}
		this.closePopUp = function () {
			this.popUp.visible = false;
			this.popUp.content = "";
		}
		this.init = function () {
			this.setMessage("welcome to zig");
			this.popUp.visible = false;
			this.popUp.content = "";
		}
	}])