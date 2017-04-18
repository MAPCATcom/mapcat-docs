# Using MAPCAT and Leaflet with npm, yarn or browserify

You can use [OpenLayers](http://openlayers.org) to use [MAPCAT](http://mapcat.com) services on your website.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

The following example gives you a quick start:

1. how to render raster based map tiles fetched from the MAPCAT API
2. how to query directions from the MAPCAT API
3. how to render the vector based route on the top of the map

## Get started

First get your MAPCAT access token.


## Install dependencies

Depending on your choice of package manager, either:

```shell
$ npm i -S leaflet
```

or

```shell
$ yarn add leaflet
```

or

```shell
$ bower install --save leaflet
```


## Step 1. Render a map

To use Leaflet JS in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
```

Then you can embed MAPCAT in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>
```

Render a map like the following:

```js
import * as L from 'leaflet';

let map = L.map('map', {
  zoomControl: false,
  center: L.latLng(47.4979, 19.0402),
  zoom: 13,
  minZoom: 0,
  maxZoom: 19
});

L.tileLayer('https://terkepem.hu/tile/{z}/{x}/{y}.png', {
  attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
  maxZoom: 18
}).addTo(map);
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)


## Step 2. Query directions via API

We're going to use jQuery to access the MAPCAT API, so copy these lines into the ```<head>``` part of your HTML page.


To query the server, add the following script in the ```<body>``` part of your page, below the previous one, to the comment saying "continue here".

```javascript
var headers = new Headers();
headers.append("Ocp-Apim-Subscription-Key","");
headers.append("Content-Type","application/json");
headers.append("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");

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

var init = { method: 'POST',
              headers,
              body };

var request = fetch("https://api.mapcat.com/routing/route?subscription-key=" + "< YOUR MAPCAT ACCESS TOKEN >", init)
.then(function(response) {
  return response.json()
})
.then(function(json) {
  // change this:
  alert ("success");
});
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of the [MAPCAT API](https://portal.mapcat.com)

## Step 3. Render the route on the map

Change the parameter of the method in the above script to the following:

```javascript
.then(function(json) {
  var coordinates = [];
  var index, len;
  for (index = 0, len = json.results.features..length; index < len; ++index) {
    coordinates.push(json.results.features[index].geometry.coordinates)
  }
  var polygon = L.polygon(coordinates).addTo(mymap);
});

```

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)

## Putting it together

Your file should look something similar:

`map.js`

```javascript
import * as L from 'leaflet';

let map = L.map('map', {
  zoomControl: false,
  center: L.latLng(47.4979, 19.0402),
  zoom: 13,
  minZoom: 0,
  maxZoom: 19
});

L.tileLayer('https://terkepem.hu/tile/{z}/{x}/{y}.png', {
  attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
  maxZoom: 18
}).addTo(map);

var headers = new Headers();
headers.append("Ocp-Apim-Subscription-Key","");
headers.append("Content-Type","application/json");
headers.append("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");

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

var init = { method: 'POST',
              headers,
              body };

var request = fetch("https://api.mapcat.com/routing/route?subscription-key=" + "< YOUR MAPCAT ACCESS TOKEN >", init)
.then(function(response) {
  return response.json()
})
.then(function(json) {
  var coordinates = [];
  var index, len;
  for (index = 0, len = json.results.features..length; index < len; ++index) {
    coordinates.push(json.results.features[index].geometry.coordinates)
  }
  var polygon = L.polygon(coordinates).addTo(mymap);
});

```
