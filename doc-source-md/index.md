# MAPCAT for Developers

Custom-made, easy-to-integrate OpenStreetMap-based worldwide map API for public websites, internal systems or mobile apps to let your location-based info come to life.
- Extremly simple integration
- Works with your current systems, easy to install or switch to

[More about our services](https://pro.mapcat.com/services/)  
[See pricing](https://pro.mapcat.com/planpricing/)

## Why to choose MAPCAT?

Compare the MAPCAT services with that of the biggest competitors. [Click here to read more](development-comparison/index.md).

## Web development with MAPCAT

Currently the easiest way to start rendering map tiles provided by [MAPCAT](https://mapcat.com) is by either using [Leaflet JS](http://leafletjs.com) or [OpenLayers](http://openlayers.org).

Both [Leaflet JS](http://leafletjs.com) and [OpenLayers](http://openlayers.org) are open source libraries for embedding interactive maps into webpages.

## Get started with MAPCAT

To integrate your application with MAPCAT services, you will need to subscribe for one of our plans (free or commercial). You can do this by contacting us, most conveniently through our [Pricing page](https://pro.mapcat.com/planpricing/).

To access our services, unique keys are required that connect API requests to your subscription. When you subscribe for a plan, we will provide you the MAPCAT access tokens you may use to integrate your application with MAPCAT services. The access tokens are API keys that provide unique identification of your subscription and allow you to access all the services that you are provided within your subscription.

The basic services available in all plans are: map visualization (map tiles rendering), geocoding (search and reverse geocoding) and route planning. You will access these services through our [service API-s](./index.html#mapcat-service-apis), using for each the API-keys provided by us.

You can render the map tiles provided by either using Leaflet JS or OpenLayers, our detailed technical descriptions will guide you in setting up your application:

* [Start using MAPCAT with Leaflet](development-frameworks/leaflet.md)
* [Start using MAPCAT raster based map tiles with OpenLayers](development-frameworks/openlayers.md)
* [Start using MAPCAT vector based map tiles with OpenLayers](development-frameworks/openlayers_vt.md)
* [Start using MAPCAT with Mapbox GL JS](development-frameworks/mapbox.md)
* [Start using MAPCAT on Android](development-frameworks/mapbox_android.md)

## MAPCAT Service APIs

* [Search API](./services/search.md)
* [Reverse Geocoding API](./services/reverse-geocoding.md)
* [Routing API](./services/routing.md)
* [Height API](./services/height.md)

## Vector tiles

MAPCAT backend is suitable for serving both raster and vector tiles.  
Our vector tiles conform to the [Mapbox Vector Tile Specification](https://www.mapbox.com/vector-tiles/specification/).  
MAPCAT vector tile data schema is based on and extends the well-known [Open Map Tiles Schema](https://openmaptiles.org/schema/).  
Here is a detailed specification of our [MAPCAT Vector Tile Schema](./vt-spec/vt-spec-01.md).
