$.fn.contactMap = function() {
    var addrCoords = [59.949109136999404, 30.3838618971461]
    	,zoom = 17
    	,$map = $('#map');
	return $(this).each(function() {
        if (typeof document.body.style.maxHeight != "undefined") {
            $.getScript('http://api-maps.yandex.ru/2.1/?lang=ru_RU')
                .done(function () {
                	ymaps.ready(function() {
                        var contMap = new ymaps.Map($map.attr('id'), {
                	            center: addrCoords,
                	            zoom: zoom,
                	            controls: ['zoomControl']
                	        });
                        contMap.behaviors.disable('scrollZoom');

                		myPlacemark = new ymaps.Placemark(addrCoords, {}, {
                			iconLayout: 'default#image',
                			iconImageHref: '/assets/ymap_placem.png',
                	        iconImageSize: [46, 51],
                	        iconImageOffset: [-23, -51]
                		});
                        contMap.geoObjects.add(myPlacemark);
                	});
                })
        } else {
        	// IE6, older browsers
        	addrCoords.reverse();
        	var statisMapUrl = 'http://static-maps.yandex.ru/1.x/?ll='+addrCoords.join(',')+'&'+
        		'size='+($map.outerWidth() > 650 ? 650 : $map.outerWidth() )+','+$map.outerHeight()+'&z='+zoom+'&l=map&pt='+addrCoords.join(',')+',vkgrm';

        	$map.html($('<img>').attr('src', statisMapUrl)).addClass('text_center');
        }
	})
}

// Можно html или html
function modal(content) {
    if (content instanceof jQuery) {
        content = content.clone().show().wrap('<div></div>').parent().html();
    }
    var  modal = {
            $modal: $('<div class="overlay"><div class="modal"></div></div>')
            ,open: function() {
                this.$modal.on('click', function(e) {
                    if (e.target === this) {
                        modal.close();
                    }
                })
                $('body').append(this.$modal);
                $(window).on('resize.modal', function() {
                    modal.onCenter.call(modal);
                });
                this.onCenter();
            }
            ,close: function() {
                $(window).off('resize.modal');
                this.$modal.remove();
            }
            ,onCenter: function() {
                var $modal = $('.modal', this.$modal),
                    wh = $(window).height() / 2,
                    ww = $(window).width() / 2,
                    modal_params = this.getHiddenDivParams($modal),
                    top = wh - modal_params.height / 2,
                    left = ww - modal_params.width / 2;
                $modal.css({
                    top: top > 0 ? top : 0,
                    left: left > 0 ? left : 0
                });
            }
            ,getHiddenDivParams: function($div) {
                var oldStyle = $div.attr('style');
                $div.css({
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'block'
                });
                var params = {
                    height: $div.outerHeight() + this.cssSize($div.css('margin-top')) + this.cssSize($div.css('margin-bottom')),
                    width: $div.outerWidth()
                }
                $div.attr('style', oldStyle ? oldStyle : '');
                return params;
            }
            ,cssSize: function(css) {
                return parseInt(css ? css.replace("px", "") : 0);
            }
        };
    modal.
        $modal
        .find('.modal')
        .html(content);

    $('.overlay', modal.$modal).on('click', function() {
        modal.close();
    })
    return modal;
}