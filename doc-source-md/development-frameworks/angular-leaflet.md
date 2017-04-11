# Using MAPCAT with Angular JS

The easiest way to use [MapCat](https://mapcat.com) with Angular JS is using the [Leaflet](http://leafletjs.com/) library.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 
MapCat provides various services built upon [OpenStreetMap](http://openstreetmap.org)

## Get started

First get your MapCat access token.

For limited trial use ``` ``` as your token.

To purchase, ...

## Rendering a map with MapCat and Angular JS

Currently raster tiles is the format served by MapCat that's supported by Leaflet out of the box.

You can use this snippet to create a leaflet map using MapCat.

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

## Sample project

For a full code example or as a quick start check out our [MapCat-Angular2-Leaflet Sample](https://github.com/MapCat-Com/mapcat-angular2-leaflet) project.





