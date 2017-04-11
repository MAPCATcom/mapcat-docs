# Using MAPCAT with React JS

The easiest way to use [MapCat](https://mapcat.com) with React JS is using the [Leaflet](http://leafletjs.com/) library via the  [react-leaflet](https://github.com/PaulLeCam/react-leaflet) module.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 
MapCat provides various services built upon [OpenStreetMap](http://openstreetmap.org)

## Get started

First get your MapCat access token.

For limited trial use ``` ``` as your token.

To purchase, ...

## Rendering a map with MapCat and Angular JS


Currently raster tiles is the format served by MapCat that's supported by Leaflet out of the box.

You can use this snippet to create a leaflet map using MapCat.

```jsx
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

let map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url='https://terkepem.hu/tile/{z}/{x}/{y}.png'
      attribution='Imagery &copy; 2017 <a href="http://mapcat.com">MapCat</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors'
    />
    <Marker position={position}>
      <Popup>
        <span>A pretty CSS3 popup.<br />Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
)
```

## Sample project

For a full code example or as a quick start check out our [MapCat-React-Leaflet Sample](https://github.com/MapCat-Com/mapcat-react-leaflet) project.





