Game = function () {

	var resources = new Resources();
	var neighborhood = new Neighborhood.Default(resources);

	this.controllers = {
		resources: resources.controllers,
		neighborhood: neighborhood.controllers
	}

	setInterval(gameTick, 10);

	function gameTick () {
		neighborhood.update();
	}
}