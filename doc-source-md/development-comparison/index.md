# Comparison of online map services for developers

## General description

|               | Description |
|---------------|-------------|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a> | OpenStreetMap-based world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a> | A web mapping service developed by Google. It offers satellite imagery, street maps, 360° panoramic views of streets (Street View), real-time traffic conditions (Google Traffic), and route planning for traveling by foot, car, bicycle (in beta), or public transportation. |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a> | A web mapping service provided as a part of Microsoft's Bing suite of search engines and powered by the Bing Maps for Enterprise framework. |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a> | A web mapping service developed by Apple Inc. It is the default map system of iOS, macOS, and watchOS. It provides directions and estimated times of arrival for automobile, pedestrian, and public transportation navigation. Apple Maps also features the unique 'Flyovers' mode, a feature that enables a user to explore densely populated urban centers in a 3D landscape composed of models of buildings and structures. |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a> | OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world. The creation and growth of OSM has been motivated by restrictions on use or availability of map information across much of the world, and the advent of inexpensive portable satellite navigation devices. OSM is considered a prominent example of volunteered geographic information. |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a> | Provider of custom online maps for websites. Also the creator of, or a significant contributor to some open source mapping libraries and applications. |
| <a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a> | An open source JavaScript library for displaying map data in web browsers as slippy maps. It provides an API for building rich web-based geographic applications. |
| <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> | An open source JavaScript library used to build web mapping applications. It supports most mobile and desktop platforms, supporting HTML5 and CSS3. |

## Map database

|               | Map Database |
|---------------|--------------|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a> | Uses OpenStreetMap for providing its services. |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a> | Has its own proprietary map database. |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a> | Has its own proprietary map database. |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a> | Has its own proprietary map database. |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a> | Is itself an open source, community driven map database. |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a> | Uses OpenStreetMap for providing its services. Optionally can be used with custom map databases too. |
| <a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a> | Provides no map database. Has to be used with a service providing map tiles, like MAPCAT, OpenStreetMap or Mapbox. |
| <a href="http://leafletjs.com/"  target="_blank" rel="noopener">Leaflet</a> | Provides no map database. Has to be used with a service providing map tiles, like MAPCAT, OpenStreetMap or Mapbox. |


## Frontend (public map) provided as a service

|                                                                                        | Web | Mobile app | Desktop app | Map data editing | Embed HTML iframe |
|----------------------------------------------------------------------------------------|-----|------------|-------------|------------------|-------------------|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a>                 | Yes | No         | No          | Yes, on web      | No                |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>       | Yes | Yes        | No          | Limited, only reporting issues | Yes |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a>       | Yes | Yes        | No          | User contributions as additional data | Yes |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a>| No  | iOS only   | OS X only   | Limited, only reporting issues | No  |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a>    | Yes | 3rd party  | No          | Yes, on web      | Yes               |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a>                 | No  | No         | No          | No               | No                |

<a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a> and <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> provide no user interfaces as a service.


## Map rendering API

|                                                                                        | Providing vector tiles via API | Providing raster tiles via API 
|----------------------------------------------------------------------------------------|-----|------------|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a>                 | Yes | Yes        |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>       | Yes | Yes        |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a>       | Yes | Yes        |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a>| Yes | Yes        |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a>    | Yes | Yes        |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a>                 | Yes | Yes        |

<a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a> and <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> provide no online services at all.


## Map rendering support for programming languages

|                                                                                        | Javascript        | Swift             | Objective-C       | Java              | C#                | C++ |
|----------------------------------------------------------------------------------------|-------------------|-------------------|-------------------|-------------------|-------------------|-----|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a>                 | 3rd party library | No                | No                | No                |                   |     |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>       | Yes               | Yes               | Yes               | Yes               | Yes               | Yes |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a>       | Yes               | 3rd party library | 3rd party library | No                | Yes               | Yes |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a>| No                | Yes               | Yes               | No                | No                | No  |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a>    | 3rd party library | No                | No                | No                | No                | No  |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a>                 | Yes               | Yes               | Yes               | Yes               | 3rd party library | Yes |
| <a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a>         | Yes               | No                | No                | No                | No                | No  |
| <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>             | Yes               | No                | No                | No                | No                | No  |


## Services provided via API

| | Geocoding | Inverse Geocoding | Routes: car | Routes: ferry support for cars | Routes: bike | Routes: outdoor support for bikes | Routes: public transport | Routes: walk |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a>                 | Yes | Yes | Yes | Yes | Yes | Yes | No  | Yes |
| <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>       | Yes | Yes | Yes | Yes | Limited to some countries | No  | Yes | Yes |
| <a href="https://www.bing.com/maps" target="_blank" rel="noopener">Bing Maps</a>       | Yes | Yes | Yes | ?   | No  | No  | Yes | Yes |
| <a href="https://www.apple.com/ios/maps/" target="_blank" rel="noopener">Apple Maps</a>| Yes | Yes | Yes | Yes | No  | No  | Yes | Yes |
| <a href="http://openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a>    | Yes | No | No  | No  | Yes | No? | No  | Yes |
| <a href="https://mapbox.com" target="_blank" rel="noopener">Mapbox</a>                 | Yes | Yes | Yes | Yes? | No? | No? | Yes? | Yes? |
| <a href="http://openlayers.org/" target="_blank" rel="noopener">OpenLayers</a>         | No | No | No  | No  | No  | No  | No  | No  |
| <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>             | No | No | No  | No  | No  | No  | No  | No  |

For further information see also <a="https://en.wikipedia.org/wiki/Comparison_of_web_map_services" target="_blank" rel="noopener">Comparison of web map services</a> on Wikipedia.
 
## Start your project with MAPCAT

You can render MAPCAT maps either in Angular, React or simply JavaScript. MAPCAT's raster tiles are compatible both with Leaflet and OpenLayers.

[Choose your development framework](../index.md#get-started-with-mapcat) to start.
