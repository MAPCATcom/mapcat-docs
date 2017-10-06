# Using MAPCAT with Angular JS

The easiest way to use [MAPCAT](https://mapcat.com) with Angular JS and [OpenLayers](http://openlayers.org) library is with the help of the [mangol](https://github.com/fegyi001/mangol) module.

Openlayers is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

## Get started

First get your MAPCAT access token.

For limited trial use ``` ``` as your token.

To purchase, ...

## Rendering a map with MAPCAT and Angular JS with OpenLayers

Currently raster tiles is the format served by MAPCAT that's supported by Leaflet out of the box.

You can use this snippet to create a leaflet map using MAPCAT.
You can simply configure mangol to use MAPCAT as its tile provider

```js
@Component({
  selector: 'app-map',
  template: `
      <mangol [config]='config'></mangol>
    `
})

// In ngOnInit :

this.config = {
  map: {
    renderer: 'canvas',
    target: 'demo-osmgwc-map',
    view: {
      projection: 'EPSG:23700',
      center: ol.proj.transform([19.4984, 47.0408], 'EPSG:4326', 'EPSG:3857'),
      zoom: 8
    },
    layers: [
      {
        type: 'layer',
        name: 'OpenStreetMap layer',
        layer: new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default',
            projection: 'EPSG:23700'
          })
        })
      }
    ]
  }
}
```

## Sample project

For a full code example or as a quick start check out our [MAPCAT-Angular2-OpenLayers Sample](https://github.com/MAPCATcom/mapcat-angular2-openlayers) project.





