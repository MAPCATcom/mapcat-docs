# Using MAPCAT from CDN

You can use [OpenLayers](http://openlayers.org) to use [MAPCAT](http://mapcat.com) services on your website.

Openlayers is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

The following example gives you a quick start:

1. how to render raster based map tiles fetched from the MAPCAT API
2. how to query directions from the MAPCAT API
3. how to render the vector based route on the top of the map

## Get started

First >get your MAPCAT access token< .

## Step 1. Render a map

To use OpenLayers in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://openlayers.org/en/v4.0.1/build/ol.js" type="text/javascript"></script>
```

Then you can embed MAPCAT in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>

<script type="text/javascript">
  var map = new ol.Map({
    target: 'map',
    layers: [
      {
        type: 'layer',
        name: 'MAPCAT layer',
        layer: new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default',
            projection: 'EPSG:23700'
          })
        })
      }
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

  // continue here
</script>
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [OpenLayers](http://openlayers.org)

## Step 2. Query directions via API

We're going to use jQuery to access the MAPCAT API, so copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
```

To query the server, add the following script in the ```<body>``` part of your page, below the previous one, to the comment saying "continue here".

```javascript

  var body = {
    "waypoints": [
      [
        {
          "lat": 51.509,
          "lon": -0.08
        },
        {
          "lat": 51.51,
          "lon": -0.047
        }
      ]
    ],
  };

  $.ajax({
      url: "https://api.mapcat.com/routing/route",
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");
      },
      type: "POST",
      dataType: 'json',
      // Request body
      data: JSON.stringify(body),
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of the [MAPCAT API](https://portal.mapcat.com)

## Step 3. Render the route on the map

Change the parameter of the method in the above script to the following:

```javascript
  .done(function(data) {
    var features = [];
    var index, len;
    for (index = 0, len = data.results.features.length; index < len; ++index) {
      features[i] = new ol.Feature({
        'geometry': new ol.geom.LineString(data.results.features[index].geometry.coordinates)
      });
    }

    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: features,
        wrapX: false
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#666666',
          width: 1
        })
      })
    });

    map.addLayer (vector)

  })
```


## Putting it together

Your file should look something similar

`index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MapCat with Leaflet</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://openlayers.org/en/v4.0.1/build/ol.js" type="text/javascript"></script>

    <!-- jQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
  </head>

  <body style="margin: 0; background-color: #efefef;">
    
    <div id='map' style='width: 400px; height: 300px;'></div>
    <script>

      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default', {
        attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
        maxZoom: 18,
        accessToken: '< YOUR MAPCAT ACCESS TOKEN >'
      }).addTo(map);

      var body = {
        "waypoints": [
          [
            {
              "lat": 51.509,
              "lon": -0.08
            },
            {
              "lat": 51.51,
              "lon": -0.047
            }
          ]
        ],
      };

      $.ajax({
        url: "https://api.mapcat.com/routing/route",
        beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");
        },
        type: "POST",
        dataType: 'json',
        // Request body
        data: JSON.stringify(body),
      })
      .done(function(data) {
        var features = [];
        var index, len;
        for (index = 0, len = data.results.features.length; index < len; ++index) {
          features[i] = new ol.Feature({
            'geometry': new ol.geom.LineString(data.results.features[index].geometry.coordinates)
          });
        }

        var vector = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: features,
            wrapX: false
          }),
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#666666',
              width: 1
            })
          })
        });

        map.addLayer (vector)
      })
      .fail(function() {
        alert("error");
      });

    </script>

  </body>
</html>
```
