# MapCat vs Google Maps vs OpenStreetMap vs Apple Maps vs Mapbox vs OpenLayers vs Leaflet


## Feature comparison:

| Features            | MAPCAT           | Google Maps      | OpenStreetMap    | Apple Maps       | MapBox           | OpenLayers       | Leaflet          |
|---------------------|------------------|------------------|------------------|------------------|------------------|------------------|------------------|
| Description | Public map and business services built upon OSM | Public map and business services | Public, editable map | Public map and business services | Business services built upon OSM | Web frontend map rendering library | Web frontend map rendering library |
| Map data            | No, uses OSM (1) | Yes, proprietary | Yes, open source | Yes, proprietary | No, uses OSM (1) | No (2)           | No (2)           |
| Editing map data    | Yes, on OSM (1)  | No               | Yes              | No               | No               | No               | No               |
| Map UI              | Yes, free        | Yes, free        | Yes, free        | Yes, free        | No               | Yes              | Yes              |
| Directions: car     | Yes              | Yes              | No               | Yes              | Yes              | No               | No               |
| Directions: public  | No               | Yes              | No               | Yes              | No               | No               | No               |
| Directions: bike    | Yes              | Yes              | No               | No               | No               | No               | No               |
| Directions: foot    | Yes              | Yes              | No               | Yes              | Yes              | No               | No               |
| Directions: ship    | Yes              | Yes              | No               | No               | Yes              | No               | No               |
| Asset tracking      | Yes              | Yes              | No               | No               | Yes              | No               | No               |
| Vector tile serving | Yes              | Yes              | No               | Yes              | Yes              | No               | No               |
| Raster tile serving | Yes              | Yes              | No               | Yes              | Yes              | No               | No               |
| Web-embedded vector tile render  | Using other libs (3) | Yes              | No               | Yes              | Yes              | Yes              | Only paths       |
| Web-embedded raster tile render  | Using other libs (3) | Yes              | No               | Yes              | Yes              | Yes              | Yes              |
| Mobile web-embedded render       | Using other libs (3) | Yes              | No               | Yes              | Yes              | No               | No               |
| Native iOS render   | Using other libs (3) | Yes              | No               | Yes              | Yes              | Yes              | Yes              |
| Native Android render | Using other libs (3) | Yes            | No               | Yes              | Yes              | Yes              | Yes              |
|                     | [Get started](../development-frameworks) | [Switch to MapCat](./switch-from-googlemaps) | [Use with MapCat](../development-frameworks) | [Switch to MapCat](./switch-from-applemaps) | [Switch to MapCat](./switch-from-mapbox) | [Use with MapCat](./switch-from-openlayers) | [Use with MapCat](./switch-from-leaflet) |


(1) Built on the Open Street Map database.

(2) Can be configured with any standardized custom map tile renderer for web.

(3) MapCat tiles can be rendered either with OpenLayers or Leaflet.


## Start your project with MapCat

You can render MapCat maps either in Angular2, React or simply JavaScript. MapCat's raster tiles are compatible both with Leaflet and OpenLayers.

[Choose your developemntframework](../development-frameworks/index.html) to start.

# ----- LATER

## Switch to MapCat

Switching from an existing map provider to Mapcat is easy. Read the specific docs to for step-by-step instructions:

* [Switching from Google Maps to MAPCAT](./switch-from-googlemaps)
* [Switching from Apple Maps to MAPCAT](./switch-from-applemaps)
* [Switching from Mapbox to MAPCAT](./switch-from-mapbox) 


