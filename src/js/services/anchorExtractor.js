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