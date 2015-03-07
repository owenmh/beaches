(function(module)
{
	'use strict';

	module.config(['$routeProvider', function($routeProvider)
	{
    	$routeProvider.
			when('/', {
				templateUrl: 'dist/partials/home.html',
				controller: 'beachesControllersHome',
				section: 'home'
			}).
			when('/vancouver', {
				templateUrl: 'dist/partials/vancouver.html',
				controller: 'beachesControllersVancouver',
				section:'vancouver'
			}).
			when('/pdx', {
				templateUrl: 'dist/partials/pdx.html',
				controller: 'beachesControllersPdx',
				section: 'pdx'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);
})(angular.module('beaches', ['ngRoute']));