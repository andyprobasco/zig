var DefaultView = function (game) {
	var $view = $("#body");
	var resources = new ResourcesPanel(game);
	var location = new LocationPanel(game);

	this.update = function () {
		resources.update();
		location.update();
	};
	this.render = function () {
		resources.render();
		resources.appendTo($view);
		location.render();
		location.appendTo($view);
	};
}


var LocationPanel = function (game) {
	var $view = $('<div>').addClass('location-panel');
	
	var neighborhood = game.controllers.neighborhood;
	for (var i = 0; i < neighborhood.length; i++) {
		var region = neighborhood[i];
		region.view = new RegionView(region);
		for (var j = 0; j < region.length; j++) {
			var subregion = region[j];
			subregion.widget = new SubregionWidget(subregion);
			subregion.view = new SubregionView(subregion);
		}
	}
	$view.on('click', '.replace-subregion-button', function () {
		console.log('replace subregion clicked');
		console.log($(this).attr('subregion-position'));
	})
	this.switchActiveTabTo = function (newActiveTab) {
		$view.html("");
		activeTab = newActiveTab;
		activeTab.render();
		newActiveTab.appendTo($view);
	}
	this.render = function () {
		activeTab.render();
	}
	this.update = function () {
		activeTab.update();
	}
	this.appendTo = function ($jQueryObject) {
		$view.appendTo($jQueryObject);
	}

	this.switchActiveTabTo(neighborhood[0].view);
}

var ResourcesPanel = function (game) {
	var $view = $('<div>').addClass('resources-panel');
	var food = new ResourceView(game.controllers.resources.scrap);
	var threat = new ResourceView(game.controllers.resources.threat);
	this.render = function () {
		food.render();
		threat.render();
		food.appendTo($view);
		threat.appendTo($view);
		//$view.append(food.$).append(threat.$);
		//$('#body').append($view);
	}
	this.update = function () {
		food.update();
		threat.update();
	}
	this.appendTo = function ($jQueryObject) {
		$view.appendTo($jQueryObject);
	}
}

var ResourceView = function (controller) {
	var $view = $('<div>').addClass('resource-meter');
	
	this.render = function () {
		this.update();
		//$('#resources').append($view);
	}
	this.update = function () {
		$view.html(controller.getName() + ': ' + controller.getCurrent() + '/' + controller.getMax());
	}
	this.appendTo = function ($jQueryObject) {
		$view.appendTo($jQueryObject);
	}
	//this.$ = $view;
}

var RegionView = function (controller) {
	var $view = $('<div>').addClass('region');
	var subregions = [];

	for (var i = 0; i < controller.subregions.length; i++) {
		subregions.push(new SubregionWidget(controller.subregions[i], i));
	}

	this.render = function () {
		this.update();
		for (var i = 0; i < subregions.length; i++) {
			//$view.append(subregions[i].$);
			subregions[i].appendTo($view);
		}
		//$('#region').append($view);
	}
	this.update = function () {
		//if active
		for (var i = 0; i < subregions.length; i++) {
			subregions[i].update();
		}
	}
	this.appendTo = function ($jQueryObject) {
		$view.appendTo($jQueryObject);
	}
	//this.$ = $view;
}

var SubregionWidget = function (controller, position) {
	var $view = $('<div>').addClass('subregion');
	$view.html(controller.getDisplayName());
	if (controller.getType() == 'workable') {
		var $progressBar = $('<div>').addClass('progress-bar');
		var $progress = $('<div>').addClass('progress');
		$view.append($progressBar);
		$progressBar.append($progress);
		$view.click(controller.interact);
	}
	if (controller.getType() == 'replaceable') {
		var $button = $('<button>').addClass('replace-subregion-button').html('build').attr('subregion-position', position);
		$view.append($button);
	}

	this.update = function () {
		if (controller.getType() == 'workable') {
			$progress.css('width', controller.getProgress() + '%');
		}
	}
	this.appendTo = function ($jQueryObject) {
		$view.appendTo($jQueryObject);
	}
	//this.$ = $view;
}

var SubregionView = function (controller) {
	var $view 
}
