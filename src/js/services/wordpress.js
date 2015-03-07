(function(module)
{
	'use strict';
	module.factory('beachesServicesWordpress', ['$http', '$q', function($http, $q)
	{
		var baseUrl = '/wordpress/wp-json/';

		return {
			getPosts: function(opt_type, opt_filters)
			{
				var options = {
					cache: true,
					params: {}
				};

				if (opt_type)
				{
					options.params.type = opt_type;
				}

				if (opt_filters)
				{
					options.filters = opt_filters;
				}

				return $http.get(baseUrl + 'posts', options).then(function(request)
				{
					return request.data;
				});
			},
			getPost: function(id)
			{
				return $http.get(baseUrl + 'posts/' + id, {cache:true}).then(function(request)
				{
					return request.data;
				});
			}
		};
	}]);

})(angular.module('beaches'));