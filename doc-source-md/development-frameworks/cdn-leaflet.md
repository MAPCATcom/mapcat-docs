# Using MapCat from CDN

You can use [Leaflet JS](http://leafletjs.org) to use [MapCat](http://mapcat.com) services on your website.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 
MapCat provides various services built upon [OpenStreetMap](http://openstreetmap.org)

## Quick start

First >get your MapCat access token< .

To use Leaflet JS in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />

<!-- Latest compiled and minified JavaScript -->
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
```

Then you can embed Mapcat in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>
<script>

  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://terkepem.hu/tile/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapcat.com">MapCat</a>',
    maxZoom: 18,
    accessToken: '< YOUR MAPCAT ACCESS TOKEN >'
}).addTo(mymap);
</script>
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)
