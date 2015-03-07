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