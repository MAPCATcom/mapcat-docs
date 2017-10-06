# Using MAPCAT with Angular JS

The easiest way to use [MAPCAT](https://mapcat.com) with Angular JS is using the [Leaflet](http://leafletjs.com/) library.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

## Get started

First get your MAPCAT access token.

For limited trial use ``` ``` as your token.

To purchase, ...

## Rendering a map with MAPCAT and Angular JS

Currently raster tiles is the format served by MAPCAT that's supported by Leaflet out of the box.

You can use this snippet to create a leaflet map using MAPCAT.

```js
import * as L from 'leaflet';

let map = L.map('map', {
  zoomControl: false,
  center: L.latLng(47.4979, 19.0402),
  zoom: 13,
  minZoom: 0,
  maxZoom: 19
});

L.tileLayer('https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default', {
  attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
  maxZoom: 18
}).addTo(map);
```

## Sample project

For a full code example or as a quick start check out our [MAPCAT-Angular2-Leaflet Sample](https://github.com/MAPCATcom/mapcat-angular2-leaflet) project.





