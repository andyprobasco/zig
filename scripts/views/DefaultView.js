var DefaultView = function (game) {

	var food = new ResourceView(game.controllers.resources.scrap);
	var region = new RegionView(game.controllers.neighborhood[0]);

	this.update = function () {
		food.update();
		region.render();
	};
	this.render = function () {
		food.render();
		region.render();
	};
}

var ResourceView = function (controller) {
	var $view = $('<div>').addClass('resource-meter');
	
	this.render = function () {
		this.update();
		$('#resources').append($view);
	}
	this.update = function () {
		$view.html(controller.getName() + ': ' + controller.getCurrent() + '/' + controller.getMax());
	}
	this.$ = $view;
}

var RegionView = function (controller) {
	var $view = $('<div>').addClass('region');

	for (var i = 0; i < controller.subregions.length; i++) {
		var $subregion = new SubregionView(controller.subregions[i]).$
		$view.append($subregion);
	}

	this.render = function () {
		this.update();
		$('#region').append($view);
	}
	this.update = function () {
		//if active
			//for each subregion, update;
	}
	this.$ = $view;
}

var SubregionView = function (controller) {
	$view = $('<div>');
	$view.html(controller.getDisplayName());
	this.$ = $view;
}