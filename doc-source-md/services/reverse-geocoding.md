# Reverse Geocoding API

Mapcat Reverse Geocoding API is used to retrieve information about the address and the objects at a specific geo-location.  

You can find a detailed description of the request parameters and the response scheme of the API point in our [swagger documentation](../swagger/#/Search_APIs/get_location_invgeocode).  

To access this API, you will need to use your **Search API key**.  

## Example
Here is a simple javascript example below showing how to use our Search API from browser:

```js
var req = new XMLHttpRequest();

var reqListener = function(e) {
    console.log(req.response); // logging the reverse geocoded result to console
};
req.addEventListener('load', reqListener);
req.open('GET', 'https://api.mapcat.com/location/invgeocode?lat=46.062330862&lng=11.122249671', true);
req.setRequestHeader('X-Api-Key', '< Your MAPCAT Search API key >');
req.send(null);
```

## Parameters
* `lat` and `lng` parameters are mandatory. They represent the latitude and longitude of the geo-coordinate of the reverse geocoded request.
* `lang`: this optional string parameter is the two-letter ISO 639-1 code of the language we want to retrieve the reverse geocoded results in. Examples:
    - _"en"_: English
    - _"de"_: German
    - _"zh"_: Chinese

     When not present, the values would be returned in the default language of the found map elements.
* `osmidx`: this parameter is also optional. It is used for making an reverse geocoding request with the OSM identifier of a specific POI (point-of-interest). If the reverse geocode engine finds the specified object close to the given _lat_ and _lng_ geo-location, it returns extra data about that specific POI in the _poiattr_ field of the result (see response description below). This parameter is useful when there are a lot of POIs close to each other and you would like to select one to get detailed information about.

## Response
The response is a json object. It contains `meta` and `result` fields.
The _meta_ field has `version`, `status_code` and `message` values. Field _version_ represents the version of the Reverse Geocoding API engine, the *status_code* is equal to the http status code of the response, and the _message_ string field contains a detailed error message if any.

When there was no error during the reverse geocode request, field _result_ is specified. It is an object having the following fields:
* `address` is an object. It contains the full address at the result as a formed text field, as well as the address parts of the found address in a categorized way (e.g.: country, state, city, district...). For a full list of address parts, look up our [swagger documentation](../swagger/#/Search_APIs/get_location_invgeocode).
* `poi` in case there is a POI close to the geo-location of the reverse geocoded point, then the name, OSM id (_osmidx_) and geolocation (_pos_) of the POI are given in this field.
* `pois`: this field is an array, holding information about the POIs nearby in the same way as the _poi_ field does. POIs closer to the reverse geocoded point comes earlier in the list.
* `shapes` is an array containing the names of the shapes at the reverse geocoded location. It can contain the name of parks, woods, lakes, etc.
* The `poiattr` parameter is only present, if the _osmidx_ query parameter was supplied (see above). This field contains every attribute available (from OSM) of the specified POI. These are:
    - _"name"_: the name of the POI
    - _"stname"_: the name of the street the POI belongs to
    - _"hnum"_: the house number of the POI
    - _"postcode"_: the postal code of the POI
    - _"telnum"_: the telephone number of the POI
    - _"email"_: the email address of the POI
    - _"url"_: the url of the website of the POI
