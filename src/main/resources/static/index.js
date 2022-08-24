/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var map;

var mapTilerKey = 'YOUR_MAPTILER_KEY';

window.onload = function (e) {

    map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=' + mapTilerKey, // stylesheet location
        center: [35, 40], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

};

function getGeojson(service, _callback) {
    var url = "/geojsonserver/geojson/" + service;

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

    //Example from getPolygonPoints getPointPolygons?city=Ankara
    getGeojson("getPoints", (_result) => {

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

            const popup = new maplibregl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.tipi)
                    .addTo(map);
        });


    });
}
;

function addLineLayerToMap() {

    getGeojson("getLinestrings", (_result) => {

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
            popup = new maplibregl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.adi)
                    .addTo(map);
        });

    });
}
;

function addPolygonLayerToMap() {

    getGeojson("getPolygons", (_result) => {

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

    getGeojson("getPolygons", (_result) => {

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
            new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
}

function addPopulationPolygon3DLayerToMap() {

    getGeojson("getPolygons", (_result) => {

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
            new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
}

function addHeatmapLayerToMap() {

    getGeojson("getPoints", (_result) => {

        map.addSource("heatmapSourceId", {
            'type': 'geojson',
            'data': _result
        });

        let rainbow = new Rainbow();
        rainbow.setNumberRange(1, 5);
        rainbow.setSpectrum('yellow', 'red');

        var heatmapLayer =
                {
                    'id': 'heatmapLayerId',
                    'type': 'heatmap',
                    'source': 'heatmapSourceId',
                    'maxzoom': 9,
                    'paint': {
// Increase the heatmap color weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            1,
                            9,
                            3
                        ],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],

                            0,
                            'rgba(0,0,0,0)',
                            0.2,
                            '#' + rainbow.colorAt(1),
                            0.4,
                            '#' + rainbow.colorAt(2),
                            0.6,
                            '#' + rainbow.colorAt(3),
                            0.8,
                            '#' + rainbow.colorAt(4),
                            1,
                            '#' + rainbow.colorAt(5)
                        ],
// Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            2,
                            9,
                            20
                        ],
// Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            1,
                            9,
                            0
                        ]
                    }
                }

        this.map.addLayer(heatmapLayer);
    });
}

function addWmsLayerToMap() {
    map.addSource("wmsSourceId", {
        'type': 'raster',
        'tileSize': 256,
        'tiles': ['https://tucbs-public-api.csb.gov.tr/trk_srtm_wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=0&STYLES=default&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}']
    });
    var wmsLayer = {
        'id': "wmsLayerId",
        'type': 'raster',
        'source': "wmsSourceId",
        'paint': {
            'raster-opacity': 0.5
        },
        'minZoom': 5,
        'maxZoom': 15
    }

    this.map.addLayer(wmsLayer);
}


function addMvtPointLayerToMap() {

    map.addSource('mvtPointSourceId', {
        'type': 'vector',
        'tiles': [
            "http://localhost:8080/geojsonserver/mvt/{z}/{x}/{y}.pbf?layername=poi"
        ],
        'minzoom': 0,
        'maxzoom': 14
    });

    var mvtPointLayer = {
        'id': 'mvtPointLayerId',
        'type': 'circle',
        'source': 'mvtPointSourceId',
        'source-layer': 'poi',
        'paint': {
            'circle-radius': 3,
            'circle-color': 'red'
        }
    };

    this.map.addLayer(mvtPointLayer);

    map.on('click', 'pointLayerId', function (e) {

        const popup = new maplibregl.Popup({closeButton: false})
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.tipi)
                .addTo(map);
    });

}
;

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

function removeWmsLayerFromMap() {
    map.removeLayer("wmsLayerId");
    map.removeSource("wmsSourceId");
}

function removeHeatmapLayerFromMap() {
    map.removeLayer("heatmapLayerId");
    map.removeSource("heatmapSourceId");
}

function removeMvtPointLayerFromMap() {
    map.removeLayer("mvtPointLayerId");
    map.removeSource("mvtPointSourceId");
}

function changeStyle(layerId) {
    map.setStyle('https://api.maptiler.com/maps/' + layerId + '/style.json?key=' + mapTilerKey);
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

function addFilterToCircleLayer() {
    map.setFilter('pointLayerId', ['==', 'il', document.getElementById("filter").value]);
}

function removeFilterFromCircleLayer() {
    map.setFilter('pointLayerId', null);
}

function changePopulationPolygonLayerColor() {
    let rainbow = new Rainbow();
    rainbow.setNumberRange(1, 5);
    rainbow.setSpectrum(document.getElementById("startColor").value, document.getElementById("endColor").value);
    var fillColor = [
        'step',
        ['get', 'nufus'],
        '#' + rainbow.colorAt(1),
        500000,
        '#' + rainbow.colorAt(2),
        1000000,
        '#' + rainbow.colorAt(3),
        3000000,
        '#' + rainbow.colorAt(4),
        50000000,
        '#' + rainbow.colorAt(5)
    ];
    map.setPaintProperty('populationPolygonLayerId', 'fill-color', fillColor);
}
