angular
	.module('zigApp')
	.directive('zgStatusBar', function(){
		return {
			templateUrl: "views/statusBar/statusBar.html",
			scope: {
				percentFull: "="// zg-status-bar"
			}
		}
	})