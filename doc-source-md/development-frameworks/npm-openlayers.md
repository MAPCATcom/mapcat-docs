# Using MapCat and OpenLayers with npm, yarn or browserify

You can use [OpenLayers](http://openlayers.org) to use [MapCat](http://mapcat.com) services on your website.

Openlayers is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

## Get started

First get your MapCat access token.

For limited trial use ``` ``` as your token.

To purchase, ...

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

## Using OpenLayers

Then you can embed MapCat in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>
```

Render a map like the following:

```js
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
