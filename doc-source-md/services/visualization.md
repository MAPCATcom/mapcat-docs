# Visualization API

MAPCAT Visualization API provides you raster and vector tiles. You can find further information about our vector tile specification and schema [here](../index.md#vector-tiles).  
In order to use this API you need our Mapview-init ([@mapcat/mapview-init](https://www.npmjs.com/package/@mapcat/mapview-init)) javascript library.  
You can checkout our @mapcat/mapview-init project on [GitHub](https://github.com/MAPCATcom/mapcat-mapview-init) where you can find detailed description and more examples of using the library.  

To access this API, you will need to use your **Visualization API key**.

## Examples
Here is a simple javascript example below showing how to use our *@mapcat/mapview-init* from browser if you want to get raster tiles:
```js
mapcatview.initRasterView(function(error, response) {
    if (error) {
        // Error handling
        console.log(error);
        return;
    }
    var tileUrl = response;
    // Here you can create your map with raster tile url.
}, apiKey, layerOptions, rasterOptions);
```
Here is an another simple javascript example below showing how to use our *@mapcat/mapview-init* from browser if you want to get vector tiles:
```js
mapcatview.initVectorView(function(error, response) {
    if (error) {
        // Error handling
        console.log(error);
        return;
    }
    var styleSheet = response;
    // Here you can create your map with vector tile style sheet.
}, apiKey, layerOptions, vectorOptions);
```

## Parameters
- `callback (error, response)`: *function* (required) - Callback function  
It gets called when the map initialization request returns from our server.
- `apiKey`: *string* (required) - Your MAPCAT Visualization API key
- `layerOptions`: *object* (optional) - Options to show cycle roads, routes layers  
Layers are used to toggle specific subsets of data rendered on the raster and vector tiles. Customizable: cycle roads and routes. Default: cycle road and route layers are off.
- `rasterOptions`: *object* (optional) - Options to set label language and raster tile scale  
Parameter ***lang*** is the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code representation of the desired language, it defaults to "en". To disable label rendering set lang to `null` or `""`.  
Parameter ***scale*** must be 1 or 2. By default, it is 1, meaning that the required raster tile size is 256 × 256 pixel. If you want to get tiles for retina displays (512 × 512 pixel tiles), you can use value 2.
- `vectorOptions`: *object* (optional) - Options to change style sheet format  
Customizable which vector style sheet format returned, possible values: "mapbox", "openlayers". This defaults to: "mapbox".

## Response
You get `response` in callback function.
- The first parameter holds the `error message` (*null* means no error)
- The second parameter
    - in case of using ***initRasterView*** function call is the response data holding your templated map view url (*string*)
    - in case of using ***initVectorView*** function call is the response data holding the vector tile style sheet (*object*)

