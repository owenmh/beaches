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