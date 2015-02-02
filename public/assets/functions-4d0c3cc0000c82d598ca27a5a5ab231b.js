$.fn.slider = function() {
	return $(this).each(function() {
		var $slides = $('.slide', this)
			,slides_num = $slides.length
			,slider_width = $(this).outerWidth()
			,slides_width = 0

			// Const
			,visible_slides = 3
			,slide_height = 360
			
			;

		$slides.each(function(i) {
			var calcMargin = function($slides) {
					var slides_width = 0
						,full_margin
						,margin
						;
					$slides.each(function() {
						slides_width += $(this).outerWidth();
					});
					// console.log('slides_width '+slides_width)
					// console.log('slides_num '+$slides.length)
					full_margin = slider_width - slides_width;
					margin = full_margin / ($slides.length - 1);
					$slides.eq(0).css('margin-right', margin + 'px');
					// console.log(slides_width)
					// console.log(full_margin)
					// console.log(margin)
					return margin;
				};
			// console.log('i '+i)
			calcMargin($slides.slice(i, i+3));
			slides_width += $(this).outerHeight();
		});

		$('.slides_cont').css('width', slides_width);

		$('.slider_right, .slider_left', this).on('click', function(e) {
			e.preventDefault();
			var $firstSlide = $slides.filter('.first')
				,contLeft = parseInt($('.slides_cont').css('left')) || 0
				,right = $(this).hasClass('slider_right');
			if ( (right && !$firstSlide.next().length) || (!right && !$firstSlide.prev().length) ) return;
			$('.slides_cont').animate({'left': contLeft + (right ? -$firstSlide.outerWidth() : $firstSlide.outerWidth() ) });
			if (right) {
				$firstSlide.removeClass('first').next().addClass('first');
			} else {
				$firstSlide.removeClass('first').prev().addClass('first');
			}
		})
	});
}

$.fn.contactMap = function(addrCoords, zoom) {
	return $(this).each(function() { 
        var contMap = new ymaps.Map($(this).attr('id'), {
	            center: addrCoords,
	            zoom: zoom,
	            controls: []
	        });

		myPlacemark = new ymaps.Placemark(addrCoords, {}, {
			iconLayout: 'default#image',
			iconImageHref: '/ymap_placem.png',
	        iconImageSize: [46, 51],
	        iconImageOffset: [-23, -51]
		});
        contMap.geoObjects.add(myPlacemark);
	})
}
;
