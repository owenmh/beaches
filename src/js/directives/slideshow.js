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