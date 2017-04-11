# Using MapCat from CDN

You can use [OpenLayers](http://openlayers.org) to use [MapCat](http://mapcat.com) services on your website.

Openlayers is a JavaScript library that renders interactive maps from raster tiles using WebGL. 
MapCat provides various services built upon [OpenStreetMap](http://openstreetmap.org)

## Quick start

First >get your MapCat access token< .

To use OpenLayers in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://openlayers.org/en/v4.0.1/build/ol.js" type="text/javascript"></script>
```

Then you can embed Mapcat in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>

<script type="text/javascript">
  var map = new ol.Map({
    target: 'map',
    layers: [
      {
        type: 'layer',
        name: 'MapCat layer',
        layer: new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'https://terkepem.hu/tile/{z}/{x}/{y}.png',
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
</script>
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [OpenLayers](http://openlayers.org)
