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