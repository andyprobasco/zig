Resources = function () {
	//this.survivors = new Survivors();

	this.food = new Resource({name:'Food'});
	this.water = new Resource({name:'Water'});
	this.scrap = new Resource({name:'Scrap'});

	this.controllers = {
		//survivors: survivors.controller,
		water: this.water.controller,
		food: this.food.controller,
		scrap: this.scrap.controller
	}
}

Resource = function (params) {
	var name = params.name || 'Resource';
	var amount = params.amount || 0;
	var max = params.max || 100;

	this.getCurrent = function () {return amount;};
	this.getMax = function () {return max;};
	this.getName = function () {return name;};

	this.changeBy = function (increment) {
		amount += increment;
		if (amount > max) {
			amount = max;
		} else if (amount < 0) {
			amount = 0;
		}
	};

	this.controller = {
		getName: this.getName,
		getCurrent: this.getCurrent,
		getMax: this.getMax
	}

}