var map = undefined;

function init() {
    map = L.map('map', {
        zoomControl: true,
        center: L.latLng(40.73, -74.00),
        zoom: 13,
        minZoom: 0,
        maxZoom: 18
    });
    map.zoomControl.setPosition('topright');
}

function load(apiKey) {
    mapcatview.initRasterView(function(error, response) {
        if (error) {
            map = undefined;
            $('#map').empty();
            if (typeof(error) === 'object') {
                $('#warningMessage').html(error.message);
            } else {
                $('#warningMessage').html(error);
            }
            console.log(error);
        } else {
            init();
            $('#apikeyModal').modal('hide');
            var tileUrl = response;
            L.tileLayer(tileUrl, {
                attribution: 'Imagery &copy; 2017 <a href="https://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
                maxZoom: 18
            }).addTo(map);
        }
    }, apiKey);
}

$(document).ready( function() {
    $('#apikeyModal').modal('show');

    $('#submitButton').on('click', function() {
        load($('#apiKey').val());
    });

    $('#apikeyModal').on('hidden.bs.modal', function () {
        if (map === undefined) {
            $('#message').html('You need a MAPCAT Visualization API key to show the example map.');
            $('#modalButton').show();
        } else {
            $('#modalButton').hide();      
            $('#message').html('');
        }
    });

    $('#modalButton').on('click', function() {
        $('#modalButton').hide();
        $('#message').html('');
        $('#warningMessage').html('');
    });

});