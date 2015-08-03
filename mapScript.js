$.fn.extend({
    worldMap: function(a) {
		a = $.extend(true, {
			country: '',
			activeClass: '',
			names: true
		}, a);

		function draw(b) {
			var out = '<svg version="1.0" viewBox="-10 -10 1000 400" xmlns="http://www.w3.org/2000/svg">';
			for (var country in worldmap.shapes) {
				var key = worldmap.shapes[country].key,
				value = worldmap.shapes[country].value;
				if (examinar(b, key))
				    out += shape(value, key, true);
				else
					out += shape(value, key, false);
			}
			out += '</svg>';
			if (a.names)
				out += '<div id="mouseMap"></div>';
			return out;
		};

		function shape(value, key, active) {
			if (active) {
				var out = '<path id="' + key + '" class="'+a.activeClass+'" d="' + value + '">';
				out += '</path>';
				if (worldmap.positions[key] != "0,0")
					out += '<path class="pointer" id="pointer-' + key + '" d="'+ getXY(worldmap.positions[key]) + worldmap.pointer.shape + '"></path>';
			} else {
				var out = '<path id="' + key + '" d="' + value + '">';
				out += '</path>';
			}
			return out;
		};

		function examinar(n, m) {
			var aux;
			for (var i in n) {
				n[i] = n[i].toUpperCase();
				if (n[i] == m)
				aux = true
			}
			return aux;
		};

		function getXY(coor) {
			var coordinates = coor.split(',');
			var longitud = coordinates[1] * 2.6938 + 465.4;
			var latitud = coordinates[0] * -2.6938 + 212.066
			return worldmap.pointer.position + longitud.toString() + ',' + latitud.toString();
		};

		function drawName(e) {
			for (var i in a.country) {
				names(a.country[i]);
			}
		};

		function names(id) {
			$('#'+id).mousemove(mouseon(id));
			$('#'+id).mouseenter(mouseon(id));
			$('#'+id).mouseleave(mouseoff);
			$('#pointer-'+id).mousemove(mouseon(id));
			$('#pointer-'+id).mouseenter(mouseon(id));
			$('#pointer-'+id).mouseleave(mouseoff);
		};

		function mouseon(id) {
			return function mouseon_handler(e) {
				var x = e.pageX,
					y = e.pageY,
					o = $('#mouseMap'),
					p = o.parent(),
					w = p.width(),
					wc = o.width(),
					left;

				if (x+(wc/2) > (w+p.offset().left)) {
					left = x-(wc/2) - (x+(wc/2) - w) + p.offset().left;
				}
				else if (x-(wc/2) < p.offset().left) {
					left = x-(wc/2) - (x-(wc/2) - p.offset().left);
				}
				else {
					left = x-(wc/2);
				}
				o.css({
					position: "absolute",
					left: left,
					top: y+5,
				});

				o.html('<p>'+worldmap.names[id]+'</p>');
			};
		};

		function mouseoff() {
			$('#mouseMap').html('');
		}

		return this.each(function() {
            $(this).html(draw(a.country));
            if (a.names)
				drawName();
        });
	}
});