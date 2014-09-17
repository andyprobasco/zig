
Widget = function (classes) {
	var children = [];

	function addChild(child) {
		children.push(child);
		return this;
	}

	function getChildHtml() {
		var html = '';
		var childrenLength = children.length;
		for (var i = 0; i < childrenLength; i++) {
			html += children[i].getHtml();
		}
		return html;
	}

	function getHtml() {
		return '';
	}

	if (classes) {
		this.classes = classes;
	} else {
		this.classes = "";
	}

	this.addChild = addChild;
	this.getChildHtml = getChildHtml;
	this.getHtml = getHtml;
}

Panel = function (additionalClasses) {
	Widget.call(this, "panel " + additionalClasses);

	this.getHtml = function () {
		var html = '<div class="' + this.classes + '">';
		html += this.getChildHtml();
		html += '</div>';
		return html;
	}
}

FacilityWidget = function (controller) {
	Widget.call(this, "facility");

	this.getHtml = function () {
		html =  '<div class ="' + this.classes + '">';
		html += 	'<button>'
		html += 		controller.name;
		html += 	'</button>'
		html += 	'<span>' + controller.getCount() + '</span>'
		html += '</div>'
		return html;
	}
}

ResourceMeterWidget = function (controller) {
	Widget.call(this, "resource-meter");

	this.getHtml = function () {
		html =  '<div class="' + this.classes + '">';
		html += '<strong>' + controller.name + ': </strong>';
		html += controller.getCurrent() + '/' + controller.getMax();
		html += '</div>';
		return html;
	}
}

RegionWidget = function (controller) {
	Widget.call(this, "region");

	this.getHtml = function () {
		html = '<div class="' + this.classes + '">';
		html = '<button>' + controller.name + '</button>';
		html = '</div>';
		return html;
	}
}