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
	// $('#slider').slider();
	$('.slider').tinycarousel();

	var addrCoords = [59.949109136999404, 30.3838618971461]
		,zoom = 17
		,$map = $('#map');
	if (typeof document.body.style.maxHeight != "undefined") {
		ymaps.ready(function() {
			$map.contactMap(addrCoords, zoom);
		});
	} else{
		// IE6, older browsers
		var statisMapUrl = 'http://static-maps.yandex.ru/1.x/?ll='+addrCoords.join(',')+'&'+
			'size='+$map.outerWidth()+','+$map.outerHeight()+'&z='+zoom+'&l=map&pt='+addrCoords.join(',')+',pmwtm1~'+addrCoords.join(',')+','+
			'pmwtm99';
		$('#map').html($('<img>').attr('src', statisMapUrl));
	}

	$('#our_mission_arrow').on('click', function(e) {
		e.preventDefault();
		$('.our_mission').slideToggle();
	})
})