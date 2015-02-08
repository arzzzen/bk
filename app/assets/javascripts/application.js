// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {
	$('.slider').tinycarousel();

	$('#map').contactMap();

	$('#request_call').on('click', function(e) {
		e.preventDefault();
		$('.contact_us').trigger('click');
		modal($('.request_call')).open();
	})

	$('#our_mission_arrow, .services_menu_item').on('click', function(e) {
		e.preventDefault();
		$('#service_toggle').slideToggle();
	});

	$('#page_up').on('click', function(e) {
		e.preventDefault();
		$('html,body').animate({ scrollTop: 0 }, '1000', 'swing');
	});

	$('#read_more').on('click', function(e) {
		e.preventDefault();
		$('.promo_text.mandatory .promo_fade').fadeToggle();
		$('.promo_text.slided')
			.slideToggle()
			.promise()
			.done(function () {
				if ($('.promo_text.slided').is(':visible')) {
					$('#read_more').html('Свернуть');
				} else {
					$('#read_more').html('Подробнее');
				}
			});
	})

	$('.icons_menu .clear:first a:last').addClass('last');

	$('.hoverable').on('mouseover', function () {
		$(this).addClass('hover');
	});
	$('.hoverable').on('mouseout', function () {
		$(this).removeClass('hover');
	})

	$('.contact_us, .contact_us_close').on('click', function (e) {
		e.preventDefault();
		$('.contact_us').toggleClass('active');
		$('.contact_us_popup').fadeToggle();
	});

	if ($('#timer_images').length) {
		setInterval(function() {
			var $e = $('#timer_images');
			$e.animate({opacity: 0}, 2000)
				.promise()
				.done(function () {
					$e.attr('src', $e.data('img'+$e.data('indx')));
					if ($e.data('indx') < 4) {
						$e.data('indx', $e.data('indx') + 1);
					} else {
						$e.data('indx', 1);
					}
					$e.css('opacity', 1);
				})
		}, 3000);
	}

	$('#testimonials_more').on('click', function(e) {
		e.preventDefault();
		var $that = $(this),
			count = 0,
			fn = function() {
				if (count > 4) {
					clearInterval(interval);
					$('.testimonial').removeClass('last');
					$('#additional_testimonials .testimonial:last').addClass('.last');
					$('#additional_testimonials').removeClass('hidden');
					$that.remove();
				} else {
					$that.stop().animate({opacity: count % 2 ? 0 : 1}, 500);
					count++;
				}
			},
			interval = setInterval(fn, 500);
		fn();
	});
})