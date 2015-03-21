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
	module.controller('beachesControllersHome', [
		'beachesServicesHeader',
		function(headerService)
		{
			headerService.setMenuNavigation([]);
		}
	]);

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
		'$document',
		'$rootScope',
		'beachesServicesHeader',
		function($document, $rootScope, headerService)
		{
			$($document).on('scroll', function(event)
			{
			    var scrollPos = $($document).scrollTop();
			    $('header a.nav-item[ng-click^="navToMenuSection"]').each(function(el)
			    {
			    	var section = $(this).attr("ng-section-id");
			        var refElement = $('#' + section);
			        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			            headerService.navToAnchor(section, true);
			            $rootScope.$apply();
			        }
			    });
			});

			return {
				templateUrl: 'dist/partials/header.html',
				link: function($scope)
				{
					angular.extend($scope, {
						navItems: headerService.navItems,
						currentSection: function()
						{
							return headerService.getCurrentSection();
						},
						currentHash: function()
						{
							return headerService.getCurrentHash();
						},
						showMobileMenu: false,
						toggleMobileMenu: function()
						{
							$scope.showMobileMenu = !$scope.showMobileMenu;
						},
						navToMenuSection: function(id)
						{
							headerService.navToAnchor(id);
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
		'beachesServicesHeader',
		function($sce, $location, $anchorScroll, wordpress, anchorExtractor, headerService)
		{
			return {
				scope: {
					pageId: '='
				},
				templateUrl: 'dist/partials/page-container.html',
				link: function($scope)
				{
					angular.extend($scope, {
						anchors: {}
					});

					wordpress.getPost($scope.pageId).then(function(page)
					{
						var pageContent = angular.element('<div>' + page.content.rendered + '</div>');
						$scope.page = page;
						var menuLinks = anchorExtractor.getMenuLinks($scope.pageId, pageContent);
						headerService.setMenuNavigation(menuLinks);
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
						id = pageId + title.replace(/[^a-zA-Z\d]/g, '');

					el.attr('id', id);

					menus.push({
						title: title,
						id: id,
						sections: extractor.getMenuSections(id, el.nextAll('.fdm-menu').first())
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
						id = pageId + title.replace(/[^a-zA-Z\d]/g, '');

					el.attr('id', id);

					sections.push({
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
	module.factory('beachesServicesHeader', [
		'$route',
		'$location',
		'$anchorScroll',
		function($route, $location, $anchorScroll)
		{
			var service = {
				navItems: {
					main: [{
						label: 'Home',
						link: 'home'
					},{
						label: 'Vancouver',
						link: 'vancouver'
					},{
						label: 'PDX',
						link: 'pdx'
					}],
					menus:[],
					// menus: [{
					// 	label: 'Breakfast',
					// 	link: 'breakfast',
					// 	hours: ''
					// },{
					// 	label: 'Lunch',
					// 	link: 'lunch',
					// 	hours: ''
					// },{
					// 	label: 'Dinner',
					// 	link: 'dinner',
					// 	hours: ''
					// }],
					about: [{
						label: 'Calendar',
						link: 'calendar'
					},{
						label: 'Community',
						link: 'community'
					},{
						label: 'Blog',
						link: 'blog'
					}],
					contact: [{
						label: 'Reservations',
						link: 'reservation'
					},{
						label: 'Catering',
						link: 'catering'
					},{
						label: 'Gift Cards',
						link: 'giftcard'
					},{
						label: 'Newsletter',
						link: 'newsletter'
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
						icon: 'am-icon-tripadvisor',
						link: 'http://www.tripadvisor.com/Restaurant_Review-g60820-d490501-Reviews-Beaches_Restaurant_Bar-Vancouver_Washington.html'
					},{
						icon: 'icon-location',
						link: 'https://www.google.com/maps/place/Beaches+Restaurant+%26+Bar/@45.6103642,-122.649821,15z/data=!4m2!3m1!1s0x0000000000000000:0xa754a058747aa4d8' //PDX: (503) 335-8385
					},{
						icon: 'icon-phone',
						link: 'tel:3606991592' //PDX: (503) 335-8385
					}]
				},
				setMenuNavigation: function(menuNavItems)
				{
					service.navItems.menus = menuNavItems;
				},
				setTelephoneNumber: function()
				{

				},
				getCurrentSection: function()
				{
					return $route.current.section || 'home';
				},
				getCurrentHash: function()
				{
					return $location.hash();
				},
				navToSection: function(section)
				{
					$location.url(section);
				},
				navToAnchor: function(id, opt_noScroll)
				{
					$location.hash(id);
					if (!opt_noScroll)
					{
						$anchorScroll();
					}
				}
			};
			return service;
		}
	]);

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