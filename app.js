var zigApp = angular.module('zigApp', ['game', 'resources', 'locations', 'jobs', 'survivors', 'info', 'horde']);
zigApp.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);