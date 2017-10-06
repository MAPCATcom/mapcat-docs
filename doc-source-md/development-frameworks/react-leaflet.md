# Using MAPCAT with React JS

The easiest way to use [MAPCAT](https://mapcat.com) with React JS is using the [Leaflet](http://leafletjs.com/) library via the  [react-leaflet](https://github.com/PaulLeCam/react-leaflet) module.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

## Get started

First get your MAPCAT access token.

For limited trial use ``` ``` as your token.

To purchase, ...

## Rendering a map with MAPCAT and React JS


Currently raster tiles is the format served by MAPCAT that's supported by Leaflet out of the box.

You can use this snippet to create a leaflet map using MAPCAT.

```jsx
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

let map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url='https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default'
      attribution='Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors'
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

For a full code example or as a quick start check out our [MAPCAT-React-Leaflet Sample](https://github.com/MAPCATcom/mapcat-react-leaflet) project.





