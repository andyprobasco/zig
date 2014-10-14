var zigApp = angular.module('zigApp', ['game', 'resources', 'location', 'logger']);
zigApp.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

