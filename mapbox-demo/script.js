var map = undefined;

function initMap(style) {
    mapboxgl.accessToken = 'undefined';
    var map = new mapboxgl.Map({
        container: 'map',
        style: style,
        center: [0, 51.5],
        zoom: 13
    });
}

function load(apiKey) {
    mapcatview.initVectorView(function(error, response) {
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
            initMap(response);
            $('#apikeyModal').modal('hide');
        }
    }, apiKey, {layer: { "base":"", "ocean":"" }} );
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
