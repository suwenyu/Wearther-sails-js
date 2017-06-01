$( document ).ready(function() {
		  var wall = new Freewall("#freewall");
				wall.reset({
					selector: '.brick',
					animate: true,
					cellW: 200,
					cellH: 'auto',
					onResize: function() {
						wall.fitWidth();
					}
				});

				wall.container.find('.brick img').on('load', function() {
					wall.fitWidth();
				});
});