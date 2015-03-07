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
(function(module)
{
	'use strict';
	module.controller('beachesControllersHome', function()
	{

	});

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.controller('beachesControllersPdx', [
		'$scope',
		function($scope)
		{

		}
	]);

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.controller('beachesControllersVancouver', [
		'$scope',
		function($scope)
		{

		}
	]);

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.directive('beachesDirectivesHeader', [
		'$route',
		function($route)
		{
			return {
				templateUrl: 'dist/partials/header.html',
				link: function($scope)
				{
					angular.extend($scope, {
						navItems:{
							main: [{
								label: 'Home',
								link: 'home'
							},{
								label: 'Calendar',
								link: 'calendar'
							},{
								label: 'Community',
								link: 'community'
							},{
								label: 'Gift Cards',
								link: 'giftcards'
							}],
							restaurant: [{
								label: 'Vancouver',
								link: 'vancouver'
							},{
								label: 'PDX',
								link: 'pdx'
							},{
								label: 'Catering',
								link: 'catering'
							}],
							social: [{
								icon: 'icon-instagram',
								link: 'http://instagram.com/beachesrestaurant'
							},{
								icon: 'icon-twitter',
								link: 'https://twitter.com/#!/beachesrandb'
							},{
								icon: 'icon-facebook',
								link: 'http://www.facebook.com/home.php?#!/beachesrestaurantandbar?ref=ts'
							},{
								icon: 'icon-phone',
								link: 'tel:3606991592' //PDX: (503) 335-8385
							}]
						},
						currentSection: function()
						{
							return $route.current.section || 'home';
						},
						showMobileMenu: false,
						toggleMobileMenu: function()
						{
							$scope.showMobileMenu = !$scope.showMobileMenu;
						}
					});
				}
			};
		}
	]);

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.directive('beachesDirectivesPageContainer', [
		'$sce',
		'$location',
		'$anchorScroll',
		'beachesServicesWordpress',
		'beachesServicesAnchorExtractor',
		function($sce, $location, $anchorScroll, wordpress, anchorExtractor)
		{
			return {
				scope: {
					pageId: '='
				},
				templateUrl: 'dist/partials/page-container.html',
				link: function($scope)
				{
					angular.extend($scope, {
						anchors: {},
						navToAnchor: function(id)
						{
							$location.hash(id);
						    $anchorScroll();
						}
					});

					wordpress.getPost($scope.pageId).then(function(page)
					{
						var pageContent = angular.element('<div>' + page.content.rendered + '</div>');
						$scope.page = page;
						$scope.anchors.menus = anchorExtractor.getMenuLinks($scope.pageId, pageContent);
						$scope.page.title = $sce.trustAsHtml($scope.page.title.rendered);
						$scope.page.content = $sce.trustAsHtml(pageContent.html());
					});
				}
			};
		}
	]);

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.directive('beachesDirectivesSlideshow', ['beachesServicesWordpress', '$sce', function(wordpress, $sce)
	{
		return {
			templateUrl: 'dist/partials/slideshow.html',
			controller: function($scope)
			{
				angular.extend($scope, {
					slideInfo: {
						slides: [],
						activeIndex: 0
					},
					setActiveIndex: function(index)
					{
						$scope.slideInfo.activeIndex = index;
					},
					previous: function()
					{
						if ($scope.slideInfo.activeIndex > 0)
						{
							$scope.slideInfo.activeIndex--;
						}
					},
					next: function()
					{
						if ($scope.slideInfo.activeIndex < $scope.slideInfo.slides.length - 1)
						{
							$scope.slideInfo.activeIndex++;
						}
					}
				});

				wordpress.getPosts('homepageslides').then(function(slidePosts)
				{
					angular.forEach(slidePosts, function(post)
					{
						$scope.slideInfo.slides.push({
							title: post.title.rendered,
							content: $sce.trustAsHtml(post.content.rendered),
							image: post.featured_image.source
						});
					});
				});
			}
		};
	}]);

})(angular.module('beaches'));
(function(module)
{
	'use strict';
	module.factory('beachesServicesAnchorExtractor', ['$http', '$q', function($http, $q)
	{
		var extractor = {
			getMenuLinks: function(pageId, content)
			{
				var menus = [];
				var titles = content.find('.fdm-menu-title');
				angular.forEach(titles, function(el)
				{
					el = angular.element(el);
					var title = el.text(),
						id = pageId + title.replace(' ', '');

					el.attr('id', id);

					menus.push({
						title: title,
						id: id,
						sections: extractor.getMenuSections(pageId, el.next('.fdm-menu'))
					});
				});

				return menus;
			},
			getMenuSections: function(pageId, content)
			{
				var sections = [];
				angular.forEach(content.find('.fdm-section-header h3'), function(el)
				{
					el = angular.element(el);
					var title = el.text(),
						id = pageId + title.replace(' ', '');

					el.attr('id', id);

					menus.push({
						title: title,
						id: id
					});
				});

				return sections;
			}
		};

		return extractor;
	}]);

})(angular.module('beaches'));
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