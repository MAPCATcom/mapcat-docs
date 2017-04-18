# Comparison of online map services for developers

MAPCAT vs Google Maps vs OpenStreetMap vs Apple Maps vs Mapbox vs OpenLayers vs Leaflet

## General description

|               | Description |
|---------------|-------------|
| [MAPCAT](https://mapcat.com) | OpenStreetMap-based world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services |
| [Google Maps](https://maps.google.com) | A web mapping service developed by Google. It offers satellite imagery, street maps, 360° panoramic views of streets (Street View), real-time traffic conditions (Google Traffic), and route planning for traveling by foot, car, bicycle (in beta), or public transportation. |
| [Bing Maps](https://www.bing.com/maps) | A web mapping service provided as a part of Microsoft's Bing suite of search engines and powered by the Bing Maps for Enterprise framework. |
| [Apple Maps](https://www.apple.com/ios/maps/)| A web mapping service developed by Apple Inc. It is the default map system of iOS, macOS, and watchOS. It provides directions and estimated times of arrival for automobile, pedestrian, and public transportation navigation. Apple Maps also features the unique 'Flyovers' mode, a feature that enables a user to explore densely populated urban centers in a 3D landscape composed of models of buildings and structures. |
| [OpenStreetMap](http://openstreetmap.org) | OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world. The creation and growth of OSM has been motivated by restrictions on use or availability of map information across much of the world, and the advent of inexpensive portable satellite navigation devices.[6] OSM is considered a prominent example of volunteered geographic information. |
| [Mapbox](https://mapbox.com) | Provider of custom online maps for websites. Also the creator of, or a significant contributor to some open source mapping libraries and applications. |
| [OpenLayers](http://openlayers.org/) | An open source JavaScript library for displaying map data in web browsers as slippy maps. It provides an API for building rich web-based geographic applications. |
| [Leaflet](http://leafletjs.com/) | An open source JavaScript library used to build web mapping applications. It supports most mobile and desktop platforms, supporting HTML5 and CSS3. |

## Map database

|               | Map Database |
|---------------|--------------|
| [MAPCAT](https://mapcat.com) | Uses OpenStreetMap for providing its services. Optionally can be used with custom map databases too. |
| [Google Maps](https://maps.google.com) | Has its own proprietary map database. |
| [Bing Maps](https://www.bing.com/maps) | Has its own proprietary map database. |
| [Apple Maps](https://www.apple.com/ios/maps/)| Has its own proprietary map database. |
| [OpenStreetMap](http://openstreetmap.org) | Is itself an open source, community driven map database. |
| [Mapbox](https://mapbox.com) | Uses OpenStreetMap for providing its services. Optionally can be used with custom map databases too. |
| [OpenLayers](http://openlayers.org/) | Provides no map database. Has to be used with a service providing map tiles, like MAPCAT, OpenStreetMap or Mapbox. |
| [Leaflet](http://leafletjs.com/) | Provides no map database. Has to be used with a service providing map tiles, like MAPCAT, OpenStreetMap or Mapbox. |


## Frontend (public map) provided as a service

|                                              | Web | Mobile app | Desktop app | Map data editing | Embed HTML iframe |
|----------------------------------------------|-----|------------|-------------|------------------|-------------------|
| [MAPCAT](https://mapcat.com)                 | Yes | No         | No          | Yes, on web      | Yes |
| [Google Maps](https://maps.google.com)       | Yes | Yes        | No          | Limited, only reporting issues | Yes |
| [Bing Maps](https://www.bing.com/maps)       | Yes | Yes        | No          | User contributions as additional data | Yes |
| [Apple Maps](https://www.apple.com/ios/maps/)| No  | IOs only   | OS X only   | Limited, only reporting issues | No |
| [OpenStreetMap](http://openstreetmap.org)    | Yes | No         | No          | Yes, on web | Yes |
| [Mapbox](https://mapbox.com)                 | No  | No         | No          | No          | ? |

[OpenLayers](http://openlayers.org/) and [Leaflet](http://leafletjs.com/) provide no user interfaces as a service.


## Map rendering API

|                                              | Providing vector tiles via API | Providing raster tiles via API 
|----------------------------------------------|-----|------------|
| [MAPCAT](https://mapcat.com)                 | Yes | Yes        |
| [Google Maps](https://maps.google.com)       | Yes | Yes        |
| [Bing Maps](https://www.bing.com/maps)       | Yes | Yes        |
| [Apple Maps](https://www.apple.com/ios/maps/)| Yes | Yes        |
| [OpenStreetMap](http://openstreetmap.org)    | Yes | Yes        |
| [Mapbox](https://mapbox.com)                 | Yes | Yes        |

[OpenLayers](http://openlayers.org/) and [Leaflet](http://leafletjs.com/) provide no online services at all.


## Map rendering support for programming languages

|                                              | Javascript        | Swift         | Objective-C   | Java          | C#             | C++ |
|----------------------------------------------|-------------------|---------------|---------------|---------------|----------------|-----|
| [MAPCAT](https://mapcat.com)                 | 3rd party library | 3rd party lib | 3rd party lib | 3rd party lib |                |     |
| [Google Maps](https://maps.google.com)       | Yes               | Yes           | Yes           | Yes           | Yes            | Yes |
| [Bing Maps](https://www.bing.com/maps)       | Yes               | 3rd party lib | 3rd party lib | No            | Yes            | Yes |
| [Apple Maps](https://www.apple.com/ios/maps/)| No                | Yes           | Yes           | No            | No             | No  |
| [OpenStreetMap](http://openstreetmap.org)    | 3rd party lib     | No            | No            | No            | No             | No  |
| [Mapbox](https://mapbox.com)                 | Yes               | Yes           | Yes           | Yes           | 3rd party lib  | Yes |
| [OpenLayers](http://openlayers.org/)         | Yes               | No            | No            | No            | No             | No  |
| [Leaflet](http://leafletjs.com/)             | Yes               | No            | No            | No            | No             | No  |


## Services provided via API

|                                              | Routes: car | Ferry support for car routes | Routes: bike | Outdoor support for bike routes | Routes: public transport | Routes: walk |
|----------------------------------------------|-----|-----|-----|-----|-----|-----|
| [MAPCAT](https://mapcat.com)                 | Yes | Yes | Yes | Yes | No  | Yes |
| [Google Maps](https://maps.google.com)       | Yes | Yes | Limited to some countries | No  | Yes | Yes |
| [Bing Maps](https://www.bing.com/maps)       | Yes | ?   | No  | No  | Yes | Yes |
| [Apple Maps](https://www.apple.com/ios/maps/)| Yes | Yes | No  | No  | Yes | Yes |
| [OpenStreetMap](http://openstreetmap.org)    | No  | No  | Yes | No? | No  | Yes |
| [Mapbox](https://mapbox.com)                 | Yes | Yes? | No? | No? | Yes? | Yes? |
| [OpenLayers](http://openlayers.org/)         | No  | No  | No  | No  | No  | No  |
| [Leaflet](http://leafletjs.com/)             | No  | No  | No  | No  | No  | No  |


For further information see also [Comparison of web map services](https://en.wikipedia.org/wiki/Comparison_of_web_map_services) on Wikipedia.
 
## About MAPCAT

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

## Start your project with MAPCAT

You can render MAPCAT maps either in Angular2, React or simply JavaScript. MAPCAT's raster tiles are compatible both with Leaflet and OpenLayers.

[Choose your developemntframework](../development-frameworks/index.html) to start.
