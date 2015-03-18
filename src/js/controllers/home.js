(function(module)
{
	'use strict';
	module.controller('beachesControllersHome', [
		'beachesServicesHeader',
		function(headerService)
		{
			headerService.setMenuNavigation([]);
		}
	]);

})(angular.module('beaches'));