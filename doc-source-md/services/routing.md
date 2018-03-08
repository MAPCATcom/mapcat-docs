# Routing API

MAPCAT Routing API is used to plan routes between two and five waypoints. 
<!-- Height API is extremely useful for creating elevation profiles for routes. -->

You can find a detailed description of the request parameters and the response scheme of the API point in our [swagger documentation](../swagger/#/Routing_APIs/post_routing_route).

To access this API, you will need to use your **Routing API key**.

## Example
Here is a simple javascript example below showing how to use our Routing API from browser:

```js
var req = new XMLHttpRequest();

var reqListener = function(e) {
    console.log(req.response); // logging the routing response to the console
};
req.addEventListener('load', reqListener);
req.open('POST', 'https://api.mapcat.com/routing/route', true);
req.setRequestHeader('X-Api-Key', '< Your MAPCAT Routing API key >');
req.send('{"waypoints": [{"lat": 47.498247,"lon": 19.039803},{"lat": 47.498262,"lon": 19.039679}],"vtp": 6,"set": 3}');
```

## Parameters
There are no url parameters to specify. 

## POST data
The geo-coordinates of the waypoints and the other settings used in route planning should be put in the _POST_ data of the xhr request. It should have the following json format:

- `waypoints` should be an array of pairs of numbers (arrays of size 2), each pair representing the _longitude_ and _latitude_ coordinates of the geopoint used in route planning.
- `vtp` should be a numeric identifier which defines which type of transportation should be used in route planning. The possible values are: 0 = CAR, 5 = BICYCLE, 6 = FOOT. This value is optional, if not defined, CAR is used as the vehicle.
- `set` should be a vehicle setting used only with CAR vehicle, it defines the available roads and routes used in route planning. The possible values are: 0 = forbidden motorways + ferries, 1 = forbidden motorways, 2 = forbidden ferries, 3 = nothing is forbidden. This value is optional, if not defined, 3 is used as the setting.

Here is an example for POST data:

```json
{
  "waypoints": [
    {
      "lat": 47.498247,
      "lon": 19.039803
    },
    {
      "lat": 47.498262,
      "lon": 19.039679
    }
  ],
  "vtp": 6,
  "set": 3
}
```

## Response
The response is a json object. It contains `meta` and `results` fields.

The `meta` field has the following fields in it:

- `version` is a number, this represents the version of the Routing API engine
- `status_code` is a number, this is equal to the http status code of the response
- `message` is a string, that contains a detailed error message if any

When the request was processed successfully the response contains all the relevant data, but the results might be missing if no routes were found. 
When the request could not be processed, results are always missing.

The `results` field is an array the contains GeoJSON formatted objects, each object corresponding to one alternative of a route between the waypoints.

The object is always a GeoJSON FeatureCollection, which has the following fields:

- `features` is an array, that contains always exactly one GeoJSON Feature describing the route's geometry and other properties
- `properties` is an object, it has two fields `goal` and `start`, which contain the GeoJSON coordinates to the first and final waypoints
- `type` is a string, always has the value `"FeatureCollection"`

The GeoJSON Feature has the following fields:

- `geometry` is a GeoJSON LineString describing the route taken
- `properties` is an object, that has several fields:
    - `bicycle-types` is an array, which can contain array when vehicle is set to 5 = BICYCLE
        - each array describing some part of the route, which might require some special attention, the array's first element is the index in the geometry where it starts, the second is the index where it ends, the third marks the type [1: this is a bicycle track, 2: this is a bicycle lane, 3: push the bike, 4: this is a dirt road]
    - `join-points` is an array, this contains the geometry indices where the subroutes meet, when the original request contained more than two waypoints
    - `maneuvers` is an array, that describes the whole route step-by-step
        - `index` is a number, geometry index marking the location of the maneuver
        - `name` is a string, name of the next road traversed
        - `mode` is a string, mode of travel used on the next part of the route
        - `type` is a string, type of maneuver, see OSRM 5.x specification
        - `modifier` is a string, direction change of the maneuver, see OSRM 5.x specification
        - `exit` is a number, marking the roundabout / intersection exit to take
    - `profile` is a string, unique identifier for the profile used in generating this route
    - `summary` is a string, summary of most significant roads traversed in this route
    - `length` is a number, the length of the route measured along the network (in meters)
    - `time` is a number, the recalculated duration of the route (in seconds)
    - `weight` is a number, the original weight calculated for this route
- `type` is a string, always has the value `"Feature"`

Here is an example for JSON response:

```json
{
  "meta": {
    "version": 8,
    "status_code": 200,
    "message": "OK"
  },
  "results": [
    {
      "features": [
        {
          "geometry": {
            "coordinates": [
              [
                19.039696,
                47.498267
              ],
              [
                19.03974,
                47.49821
              ],
              [
                19.03981,
                47.498237
              ]
            ],
            "type": "LineString"
          },
          "properties": {
            "join-points": [],
            "maneuvers": [
              {
                "exit": 0,
                "index": 0,
                "mode": "walking",
                "modifier": "",
                "name": "Hunyadi János út",
                "type": "depart"
              },
              {
                "exit": 0,
                "index": 1,
                "mode": "walking",
                "modifier": "left",
                "name": "Clark Ádám tér",
                "type": "turn"
              },
              {
                "exit": 0,
                "index": 1,
                "mode": "walking",
                "modifier": "",
                "name": "Clark Ádám Tér",
                "type": "arrive"
              }
            ],
            "profile": "$BASELINE",
            "summary": "Hunyadi János út, Clark Ádám tér",
            "length": 13.2,
            "time": 15.84,
            "weight": 19.2
          },
          "type": "Feature"
        }
      ],
      "properties": [
        {
          "goal": [
            19.039696,
            47.498267
          ]
        },
        {
          "start": [
            19.03981,
            47.498237
          ]
        }
      ],
      "type": "FeatureCollection"
    }
  ]
}
```
