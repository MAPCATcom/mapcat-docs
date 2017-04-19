# Using MapCat and OpenLayers with npm, yarn or browserify

You can use [OpenLayers](http://openlayers.org) to use [MapCat](http://mapcat.com) services on your website.

Openlayers is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.


The following example gives you a quick start:

1. how to render raster based map tiles fetched from the MAPCAT API
2. how to query directions from the MAPCAT API
3. how to render the vector based route on the top of the map

## Get started

First >get your MAPCAT access token< .

## Install dependencies

Depending on your choice of package manager, either:

```shell
$ npm i -S openlayers
```

or

```shell
$ yarn add openlayers
```

or

```shell
$ bower install --save openlayers
```

## Step 1. Render a map

Then you can embed MapCat in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>
```

Render a map like the following:

```js
import * as ol from 'openlayers';

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
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [OpenLayers](http://openlayers.org)


## Step 2. Query directions via API

To query the server, continue the script above:

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

Your file should look something similar:

`map.js`

```javascript
import * as ol from 'openlayers';

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
});
```
