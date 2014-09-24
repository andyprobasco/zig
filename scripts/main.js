$(document).ready(onPageLoad);

var g

function onPageLoad () {
	var game = new Game();
	var view = new DefaultView(game);
	view.render();

	setInterval(view.update, 10);
	g = game;
}