angular
	.module('zigApp')
	.directive('zgStatusBar', function(){
		return {
			templateUrl: "views/directives/statusBar.html",
			scope: {
				percentFull: "="// zg-status-bar"
			}
		}
	})