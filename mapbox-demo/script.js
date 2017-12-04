
function initMap() {
    mapboxgl.accessToken = 'undefined';
    var map = new mapboxgl.Map({
        container: 'map',
        style: '/demo/mapbox/assets/mapcat.json',
        center: [0, 51.5],
        zoom: 13
    });
}

initMap();