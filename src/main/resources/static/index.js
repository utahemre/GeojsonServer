/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var map;

window.onload = function (e) {

    mapboxgl.accessToken = 'pk.eyJ1IjoidXRhaGVtcmUiLCJhIjoiY2lmM3RxcWp6MDBtM3RsbHlvZTRxd2lvaiJ9._01IsYjztRQ0DhF_lt5y2A';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
        center: [35, 40], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

};

function getGeojson(query, _callback) {
    var url = "/geojsonserver/geojson/getByQuery?query=" + query;

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
                        'circle-radius': 3,
                        'circle-color': '#FF0000'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(pointLayer);

        map.on('click', 'pointLayerId', function (e) {

            const popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.tipi)
                    .addTo(map);
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
                        'line-width': 5,
                        'line-color': '#FF0000'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(lineLayer);


        map.on('click', 'lineLayerId', function (e) {
            popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.adi)
                    .addTo(map);
        });

    });
}
;

function addPolygonLayerToMap() {

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
                        'fill-opacity': 0.3,
                        'fill-outline-color': '#000000',
                        'fill-color': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            '#00FF00',
                            '#0000FF'
                        ]


                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);

        map.on('click', 'polygonLayerId', function (e) {
            var featureId = e.features[0].id;

            if (e.features[0].state.hover) {
                map.setFeatureState(
                        {source: 'polygonSourceId', id: featureId},
                        {hover: false}
                );
            } else {
                map.setFeatureState(
                        {source: 'polygonSourceId', id: featureId},
                        {hover: true}
                );
            }
        });
    });
}

function addPopulationPolygonLayerToMap() {

    getGeojson("select * from egitim_poligon", (_result) => {

        map.addSource("populationPolygonSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "populationPolygonLayerId",
                    'type': 'fill',
                    'source': "populationPolygonSourceId",
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

        map.on('click', 'populationPolygonLayerId', function (e) {
            new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
}

function addPopulationPolygon3DLayerToMap() {

    getGeojson("select * from egitim_poligon", (_result) => {

        map.addSource("populationPolygon3DSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "populationPolygon3DLayerId",
                    'type': 'fill-extrusion',
                    'source': "populationPolygon3DSourceId",
                    'paint': {
                        'fill-extrusion-opacity': 0.5,
                        'fill-extrusion-color':
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
                                    5000000,
                                    '#8B0000'
                                ],
                        'fill-extrusion-height':
                                [
                                    'step',
                                    ['get', 'nufus'],
                                    5000,
                                    500000,
                                    10000,
                                    1000000,
                                    20000,
                                    3000000,
                                    40000,
                                    5000000,
                                    80000
                                ],

                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);

        map.on('click', 'populationPolygon3DLayerId', function (e) {
            new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
}

function removePointLayerFromMap() {
    map.removeLayer("pointLayerId");
    map.removeSource("pointSourceId");
}

function removeLineLayerFromMap() {
    map.removeLayer("lineLayerId");
    map.removeSource("lineSourceId");
}

function removePolygonLayerFromMap() {
    map.removeLayer("polygonLayerId");
    map.removeSource("polygonSourceId");
}

function removePopulationPolygonLayerFromMap() {
    map.removeLayer("populationPolygonLayerId");
    map.removeSource("populationPolygonSourceId");
}

function removePopulationPolygon3DLayerFromMap() {
    map.removeLayer("populationPolygon3DLayerId");
    map.removeSource("populationPolygon3DSourceId");
}

function changeStyle(layerId) {
    map.setStyle('mapbox://styles/mapbox/' + layerId);
}

function changeCircleLayerColor() {
    var color = document.getElementById("color").value;

    if (color) {
        map.setPaintProperty('pointLayerId', 'circle-color', color);
    }
}

function changeLineLayerColor() {
    var color = document.getElementById("color").value;

    if (color) {
        map.setPaintProperty('lineLayerId', 'line-color', color);
    }
}
