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