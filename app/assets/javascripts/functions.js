$.fn.contactMap = function() {
    var addrCoords = [59.949109136999404, 30.3838618971461]
    	,zoom = 17
    	,$map = $('#map');
	return $(this).each(function() {
        if (typeof document.body.style.maxHeight != "undefined") {
        	ymaps.ready(function() {
                var contMap = new ymaps.Map($map.attr('id'), {
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
        	});
        } else {
        	// IE6, older browsers
        	addrCoords.reverse();
        	var statisMapUrl = 'http://static-maps.yandex.ru/1.x/?ll='+addrCoords.join(',')+'&'+
        		'size='+($map.outerWidth() > 650 ? 650 : $map.outerWidth() )+','+$map.outerHeight()+'&z='+zoom+'&l=map&pt='+addrCoords.join(',')+',vkgrm';

        	$map.html($('<img>').attr('src', statisMapUrl)).addClass('text_center');
        }
	})
}