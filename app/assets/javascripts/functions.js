$.fn.contactMap = function() {
    // var addrCoords = [59.948509136999404, 30.3842618971461]
    var addrCoords = [59.948429, 30.384401]
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

                		myPlacemark = new ymaps.Placemark(addrCoords, {
                            balloonContent: '<div class="ymap_baloon"><div class="contact_us_close"></div><h3>Телефон</h3><p>(812) 648 02 67<br><a href="#" class="request_call_link">Заказать звонок</a></p><h3>Адрес</h3><p>191015, Санкт-Петербург,<br>Шпалерная ул. , 51, офис 561</p></div>'
                        },{
                            iconLayout: 'default#image',
                            iconImageHref: '/assets/ymap_placem.png',
                            iconImageSize: [46, 51],
                            iconImageOffset: [-23, -51],
                            // Размеры содержимого балуна
                            balloonContentSize: [260, 218],
                            // Задаем макет балуна - пользовательская картинка с контентом
                            balloonLayout: "default#imageWithContent",
                            // Картинка балуна
                            balloonImageHref: '/ymap_baloon.png',
                            // Смещение картинки балуна
                            balloonImageOffset: [-188, 0],
                            // Размеры картинки балуна
                            balloonImageSize: [260, 233],
                            // Балун не имеет тени
                            balloonShadow: false,
                		});
                        contMap.geoObjects.add(myPlacemark);

                        $('body').on('click', '.ymap_baloon .contact_us_close', function() {
                            contMap.balloon.close();
                        });
                        // myPlacemark.events.add('click', function (placemark) {
                        //     $(window).scrollTop(0)
                        //     modal($('.request_call')).open();
                        // });
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