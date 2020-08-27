var map;

window.onload = function (e) {


    mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [35, 40], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    //addPointLayerToMap();
    //addLineLayerToMap();
    //addPolygonLayerToMap();
    addPopulationPolygonLayerToMap();
};


function getGeojson(query, _callback) {
    url = "/geojsonserver/geojson/getByQuery?query=" + query;

    fetch(url).then(res => res.json())
            .then((res) => {
                {
                    _callback(res);
                    return;
                }
            }
            );
}
;

function addPointLayerToMap() {

    getGeojson("select * from egitim_nokta", (_result) => {

        map.addSource("pointSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var pointLayer =
                {
                    'id': "pointLayerId",
                    'type': 'circle',
                    'source': "pointSourceId",
                    'paint': {
                        'circle-radius': 5,
                        'circle-color': '#0000FF'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(pointLayer);
        
        var popup;
        
        map.on('mouseenter', 'pointLayerId', function (e) {
            popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.tipi)
                    .addTo(map);
        });
        
        map.on('mouseleave', 'pointLayerId', function (e) {
            popup.remove();
        });
    });
}
;

function addLineLayerToMap() {

    getGeojson("select * from egitim_cizgi", (_result) => {

        map.addSource("lineSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var lineLayer =
                {
                    'id': "lineLayerId",
                    'type': 'line',
                    'source': "lineSourceId",
                    'paint': {
                        'line-width': 3,
                        'line-color': '#FF0000'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(lineLayer);
        
        
        map.on('mouseenter', 'lineLayerId', function (e) {
            popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.adi)
                    .addTo(map);
        });
        
        map.on('mouseleave', 'lineLayerId', function (e) {
            popup.remove();
        });
        
    });
}
;

function addPolygonLayerToMap() {

    getGeojson("select * from egitim_poligon where il='Ankara'", (_result) => {

        map.addSource("polygonSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "polygonLayerId",
                    'type': 'fill',
                    'source': "polygonSourceId",
                    'paint': {
                        'fill-opacity': 0.3,
                        'fill-color': '#00FF00',

                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);
        
        map.on('mouseenter', 'polygonLayerId', function (e) {
            popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il)
                    .addTo(map);
        });
        
        map.on('mouseleave', 'polygonLayerId', function (e) {
            popup.remove();
        });
    });
}

function addPopulationPolygonLayerToMap() {

    getGeojson("select * from egitim_poligon", (_result) => {

        map.addSource("polygonSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "polygonLayerId",
                    'type': 'fill',
                    'source': "polygonSourceId",
                    'paint': {
                        'fill-opacity': 0.5,
                        'fill-color':
                                [
                                    'step',
                                    ['get', 'nufus'],
                                    '#00FF00',
                                    500000,
                                    '#FFFF00',
                                    1000000,
                                    '#FFA500',
                                    3000000,
                                    '#FF0000',
                                    50000000,
                                    '#8B0000'
                                ]

                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);

        map.on('click', 'polygonLayerId', function (e) {
            new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
}
