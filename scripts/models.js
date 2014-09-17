Game = function () {
	

	//#Resources
	var water = new Resource({
		name: "water"
	});
	var food = new Resource({
		name: "food"
	});
	var scrap = new Resource({
		name: "scrap"
	});

	//#Facilities
	var well = new Facility({
		name: "well"
	});
	var garden = new Facility({
		name: "garden"
	})

	//#update
	function update() {
		water.update();
		food.update();
	}


	//#Controllers
	this.controllers = {
		resources: {
			water: new ResourceMeterController(water),
			food: new ResourceMeterController(food),
			scrap: new ResourceMeterController(scrap)
		},
		facilities: {
			well: new FacilityController(well),
			garden: new FacilityController(garden)
		},
		regions: [new Region({name:"Abandoned House"}),new Region({name:"Abandoned House"})]
	}

}


Facility = function (params) {

	var count = 0;
	var price = 10;

	function getCount() {
		return count;
	}

	function getPrice() {
		return price;
	}

	function purchase() {
		count += 1;
		price += 1;
	}

	this.getCount = getCount;
	this.getPrice = getPrice;
	this.purchase = purchase;
	this.name = params.name;
}

Resource = function (params) {

	var amount = 0;
	var max = 100;
	var changePerSecond = 1;

	function getCurrent () {
		return amount;
	}

	function getMax () {
		return max;
	}

	function update() {
		amount += changePerSecond;
		if (amount > max) {
			amount = max;
		}
	}

	this.getCurrent = getCurrent;
	this.getMax = getMax;
	this.update = update;
	this.name = params.name;
}

Region = function (params) {
	this.name = params.name;
}