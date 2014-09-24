var DefaultView = function (game) {

	var food = new ResourceView(game.controllers.resources.scrap);
	var threat = new ResourceView(game.controllers.resources.threat);
	var region = new RegionView(game.controllers.neighborhood[0]);

	this.update = function () {
		food.update();
		threat.update();
		region.update();
	};
	this.render = function () {
		food.render();
		threat.render();
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
	var subregions = [];

	for (var i = 0; i < controller.subregions.length; i++) {
		subregions.push(new SubregionView(controller.subregions[i]));
	}

	this.render = function () {
		this.update();
		for (var i = 0; i < subregions.length; i++) {
			$view.append(subregions[i].$);
		}
		$('#region').append($view);
	}
	this.update = function () {
		//if active
		for (var i = 0; i < subregions.length; i++) {
			subregions[i].update();
		}
	}
	this.$ = $view;
}

var SubregionView = function (controller) {
	var $view = $('<div>').addClass('subregion');
	$view.html(controller.getDisplayName());
	if (controller.getType() == 'workable') {
		var $progressBar = $('<div>').addClass('progress-bar');
		var $progress = $('<div>').addClass('progress');
		$view.append($progressBar);
		$progressBar.append($progress);
		$view.click(controller.interact);
	}

	this.update = function () {
		if (controller.getType() == 'workable') {
			$progress.css('width', controller.getProgress() + '%');
		}
	}
	this.$ = $view;
}