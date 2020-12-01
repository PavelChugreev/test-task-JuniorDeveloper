ymaps.ready(init);

function init () {
    let map = new ymaps.Map("map", {
        center: [55.753, 37.622],
        zoom: 13
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });

    // Привязка события по клику
    map.events.add('click', function (e) {
        let coords = e.get('coords');

        ymaps.geocode(coords)
            .then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);

                if (!map.balloon.isOpen()) {
                    let coords = e.get('coords');
                    map.balloon.open(coords, {
                        contentHeader: "Адрес",
                        contentBody: firstGeoObject.getAddressLine(),
                        contentFooter:'<p>Координаты: ' + [coords[0].toPrecision(6),coords[1].toPrecision(6)].join(', ')
                    });
                }
                else {
                    map.balloon.close();
                }
            });
        });
   
    // Скрытие окна
    map.events.add('balloonopen', function (e) {
        map.hint.close();
    });
}