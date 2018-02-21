# Search API

MAPCAT Search API is used to run full text search queries on our map database.  

You can find a detailed description of the request parameters and the response scheme of the API point in our [swagger documentation](../swagger/#/Search_APIs/get_location_search).  

## Example
Here is a simple javascript example below showing how to use our Search API from browser:

```js
var req = new XMLHttpRequest();
var reqListener = function(e) {
    console.log(req.response); // logging the search response to the console
};
req.addEventListener('load', reqListener);
req.open('GET', 'https://api.mapcat.com/location/search?query=Manhattan', true);
req.setRequestHeader('X-Api-Key', '< Your MAPCAT Search API key >');
req.send(null);
```

## Parameters
* `query`: this parameter is mandatory. It is a free form text you would like to search for. It can be a full address, a part of an address. Examples:
    - _"denmark"_
    - _"Burgos España"_
    - _"Sweetwater Tavern Boylston Place Boston"_
    - _"Oudezijds Voorburgwal 146 Amsterdam, Nederland"_  

    As you can see, you can search in any language and our search engine is not case sensitive. The order of the address parts does not matter in the search text, so searching for _"Hungary Budapest"_ and _"Budapest Hungary"_ gives the same result.
* `lang` is the language parameter. It is the two-letter (ISO 639-1) code of the language we want to retrieve the search results in. Examples:
    - _"en"_: English
    - _"de"_: German
    - _"zh"_: Chinese

    When omitted, the default language of the map element is used for each search result.
* `lat` and `lng` are optional parameters. They represent the latitude and longitude of the center of the viewport respectively. The viewport center is used as a hint in the sorting phase of the search results. Places closer to the geo-coordinates of the viewport center get a higher rank, thus more likely to appear before other results in the list.
* `bbox`: this parameter is also optional. It represents the viewport bounding box. Currently it requires the _lat_ and _lng_ parameters to be set. It defines the top left and bottom right geo-coordinates for the search viewport, and it is also used as a hint in the sorting phase. Found items inside the bounding box are getting higher ranks.

## Response
The search response is a json object. It consists of two parts: `meta` and `result`.

In case of error, only _meta_ is specified, and result is null. _Meta_ has 3 fields: `status_code`, `message` and `version`. Parameter *status_code* represents the http status code, _message_ is a detailed error message, and _version_ is the version of the search engine.

When there was no error during the search request, field _result_ is specified. It is an array, containing the search results. They are ordered starting with the most relevant hit. The elements of the array are objects having the following fields:
* `type` is a string field representing the type of the search item. It can be
    - "STR" (street)
    - "POI" (point-of-interest)
    - "SHP" (shape)
    - "COS" (center-of-settlement or center-of-structure)
    - "ADR" (address)
* `address` is an object. It contains the full address of the search result as a formed text field, and the address parts of the search hit in a categorized way (e.g.: country, state, city, district...). For a full list of address parts, look up our [swagger documentation](../swagger/#/Search_APIs/get_location_search).
* `poi` in case the found item is of type _POI_, the name, OSM id (_osmidx_) and geolocation (_pos_) are given in this object.
* `geometry`: this object field contains the geometry information of the search hit. It has the following fields: _geometry_, _position_, _tl_ and _br_. Geometry is specified for street ("STR") results only. It contains the geometry of the street in GeoJSON format. Position is the center point of the object. Fields _tl_ and _br_ are representing the top left and bottom right coordinates of the bounding box of the search hit, respectively. This bounding box can be used for e.g. moving the view over the specified area.
