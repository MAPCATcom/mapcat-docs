# Using MapCat and Leaflet with npm, yarn or browserify

You can use [OpenLayers](http://openlayers.org) to use [MapCat](http://mapcat.com) services on your website.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 
MapCat provides various services built upon [OpenStreetMap](http://openstreetmap.org)

## Get started

First get your MapCat access token.

For limited trial use ``` ``` as your token.

To purchase, ...

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


## Using Leaflet

To use Leaflet JS in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
```

Then you can embed MapCat in the ```<body>``` part of your page in a div that has its size specified.

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
  attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MapCat</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
  maxZoom: 18
}).addTo(map);
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)
