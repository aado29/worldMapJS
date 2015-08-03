(function(d) {
	d.fn.worldMap = function(a) {
		a = d.extend({}, {
			country: '',
			activeClass: 'green'
		}, a);
		var e = d(jQuery(this));
		var latlonrg = /(\d+(?:\.\d+)?)[\xb0\s]?\s*(?:(\d+(?:\.\d+)?)['\u2019\u2032\s])?\s*(?:(\d+(?:\.\d+)?)["\u201d\u2033\s])?\s*([SNEW])?/i;
		this.draw = function(b) {
			var out = '<svg version="1.0" viewBox="-10 -10 1000 400" xmlns="http://www.w3.org/2000/svg">';
			for (var country in worldmap.shapes) {
				var key = worldmap.shapes[country].key,
				value = worldmap.shapes[country].value;
				if (this.examinar(b, key))
				    out += this.shape(value, key, true);
				else
					out += this.shape(value, key, false);
			}
			out += '</svg>'
			return out;
		};
		this.shape = function(value, key, active) {
			if (active) {
				var out = '<path id="' + key + '" class="'+a.activeClass+'" d="' + value + '">';
				out += '</path>';
				if (worldmap.positions[key] != "0,0")
					out += '<path class="pointer" id="pointer-' + key + '" d="'+ this.getXY(worldmap.positions[key]) + worldmap.pointer.shape + '"></path>';
			} else {
				var out = '<path id="' + key + '" d="' + value + '">';
				out += '</path>';
			}
			return out;
		};
		this.examinar = function(n, m) {
			var aux;
			for (var i in n) {
				n[i] = n[i].toUpperCase();
				if (n[i] == m)
				aux = true
			}
			return aux;
		};
		this.getXY = function(coor) {
			var coordinates = coor.split(',');
			var longitud = coordinates[1] * 2.6938 + 465.4;
			var latitud = coordinates[0] * -2.6938 + 212.066
			return worldmap.pointer.position + longitud.toString() + ',' + latitud.toString();
		};
		this.drawName = function(e) {
			jQuery('body').append('<div id="mouseMap"></div>');
			for (var i in a.country) {
				this.names(a.country[i]);
			}
		};
		this.names = function(id) {
			jQuery('#'+id).mouseenter(function(e) {
				//console.log(worldmap.names[id]);
				jQuery(this).mousemove(function(e) {
					var x = e.pageX, y = e.pageY;
					var obH = jQuery('#mouseMap').height();
					jQuery('#mouseMap').css({
						position: "absolute",
						top: y-(obH/2),
						left: x+20
					});
					jQuery('#mouseMap').html('<p>'+worldmap.names[id]+'</p>');
				});
			});
			jQuery('#'+id).mouseleave(function() {
				jQuery('#mouseMap').html('');
			});
		};
		this.__constructor = function() {
			e[0].innerHTML = this.draw(a.country);
			this.drawName();
			return this
		};
		return this.__constructor()
	}
})(jQuery);