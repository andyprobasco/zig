DefaultView = function (game) {
	var body = new Panel('body');
	var infoPanel = new Panel('info')
	var resourcesPanel = new Panel('resources')
			//.addChild(new ResourceMeterWidget(game.controllers.resources.water))
			//.addChild(new ResourceMeterWidget(game.controllers.resources.food))
			//.addChild(new ResourceMeterWidget(game.controllers.resources.scrap))
	var facilitiesPanel = new Panel('facilities')
			//.addChild(new FacilityWidget(game.controllers.facilities.well))
			//.addChild(new FacilityWidget(game.controllers.facilities.garden));
	var regionsPanel = new Panel('regions')
			//.addChild(new RegionWidget(game.controllers.regions[0]));

	body.addChild(infoPanel);
	body.addChild(resourcesPanel);
	body.addChild(facilitiesPanel);
	body.addChild(regionsPanel);

	function render () {
		$('body').html(body.getHtml());
	}
	this.render = render;
}
