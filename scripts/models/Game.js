Game = function () {

	var resources = new Resources();
	var neighborhood = new Neighborhood(resources);

	this.controllers = {
		resources: resources.controllers,
		neighborhood: neighborhood.controllers
	}
}