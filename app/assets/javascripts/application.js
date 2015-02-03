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
//= require turbolinks
//= require_tree .

$(function() {
	$('.slider').tinycarousel();

	$('#map').contactMap();

	$('#our_mission_arrow').on('click', function(e) {
		e.preventDefault();
		$('.our_mission').slideToggle();
	});

	$('#page_up').on('click', function(e) {
		e.preventDefault();
		$('html,body').animate({ scrollTop: 0 }, '1000', 'swing');
	});

	$('#read_more').on('click', function(e) {
		e.preventDefault();
		$('.promo_text.mandatory .promo_fade').fadeToggle();
		$('.promo_text.slided').slideToggle();
	})
})