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