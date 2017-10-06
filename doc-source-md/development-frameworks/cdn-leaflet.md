# Using MAPCAT from CDN

You can use [Leaflet JS](http://leafletjs.org) to use [MAPCAT](http://mapcat.com) services on your website.

Leaflet JS is a JavaScript library that renders interactive maps from raster tiles using WebGL. 

[MAPCAT](https://mapcat.com) is an [OpenStreetMap](http://openstreetmap.org-based) world map service offering routing for cars, bicycles and pedestrians, plus real-time map editing and business services.

The following example gives you a quick start:

1. how to render raster based map tiles fetched from the MAPCAT API
2. how to query directions from the MAPCAT API
3. how to render the vector based route on the top of the map

## Get started

First >get your MAPCAT access token< .

## Step 1. Render a map

To use Leaflet JS in your webste, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />

<!-- Latest compiled and minified JavaScript -->
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
```

Then you can embed a MAPCAT cat in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 400px; height: 300px;'></div>
<script>

  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>',
    maxZoom: 18
  }).addTo(map);

  // continue here
</script>
```

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)

## Step 2. Query directions via API

We're going to use jQuery to access the MAPCAT API, so copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
```

To query the server, add the following script in the ```<body>``` part of your page, below the previous one, to the comment saying "continue here".

```javascript

  var body = {
    "waypoints": [
        {
          "lat": 51.509,
          "lon": -0.08
        },
        {
          "lat": 51.51,
          "lon": -0.047
        }
    ],
  };

  $.ajax({
      url: "https://api.mapcat.com/routing/route",
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");
      },
      type: "POST",
      dataType: 'json',
      // Request body
      data: JSON.stringify(body),
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of the [MAPCAT API](https://portal.mapcat.com)

## Step 3. Render the route on the map

Change the parameter of the method in the above script to the following:

```javascript
  .done(function(data) {
      var coordinates = [];
      var index, len;
      for (index = 0, len = data.results.features.length; index < len; ++index) {
        coordinates.push(data.results.features[index].geometry.coordinates.map(function(a){return [a[1],a[0]]}));
      }
      var polyline = L.polyline(coordinates).addTo(map);
  })
```

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.org)

## Putting it together

Your file should look something similar:

`index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MapCat with Leaflet</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>

    <!-- jQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
  </head>

  <body style="margin: 0; background-color: #efefef;">
    
    <div id='map' style='width: 400px; height: 300px;'></div>
    <script>

      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png?base&landcover&ocean&relief&labels=en&scale=1&styleId=default', {
        attribution: 'Imagery &copy; 2017 <a href="http://mapcat.com">MAPCAT</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors',
        maxZoom: 18
      }).addTo(map);

      var body = {
        "waypoints": [
            {
              "lat": 51.509,
              "lon": -0.08
            },
            {
              "lat": 51.51,
              "lon": -0.047
            }
        ],
      };

      $.ajax({
        url: "https://api.mapcat.com/routing/route",
        beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","");
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","< YOUR MAPCAT ACCESS TOKEN >");
        },
        type: "POST",
        // Request body
        data: JSON.stringify(body),
      })
      .done(function(data) {
        var coordinates = [];
        var index, len;
        for (index = 0, len = data.results.features.length; index < len; ++index) {
          coordinates.push(data.results[0].features[index].geometry.coordinates.map(function(a){return [a[1],a[0]]}));
        }
        var polyline = L.polyline(coordinates).addTo(map);
      })
      .fail(function() {
        alert("error");
      });

    </script>

  </body>
</html>
```
