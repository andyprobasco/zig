$(document).ready(onPageLoad);

function onPageLoad () {
	var game = new Game();
	var view = new DefaultView(game);
	view.render();
}