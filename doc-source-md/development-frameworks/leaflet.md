# Using MAPCAT with Leaflet

You can use [MAPCAT](http://mapcat.com) services on your website with [Leaflet](http://leafletjs.com) which offers you a JavaScript library that renders interactive maps from raster tiles.

With Leaflet you can use MAPCAT in your browser with javascript or you can easily integrate it in your own [Angular](#using-mapcat-in-angular-5-application-with-leaflet) or [React](#using-mapcat-in-react-application-with-leaflet) application.

The following example gives you a quick start how to use MAPCAT in a single page HTML with [Leaflet](http://leafletjs.com).

The steps are the following:

1. How to render raster based map tiles fetched from the MAPCAT API
2. How to query directions from the MAPCAT API
3. How to render the vector based route on the top of the map

## Get started

First get your [MAPCAT access token](https://pro.mapcat.com/planpricing/).

## Step 1. Render a map

To use Leaflet JS in your website, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />

<!-- Latest compiled and minified JavaScript -->
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
```

Include [@mapcat/mapview-init](https://www.npmjs.com/package/@mapcat/mapview-init) in ```<head>``` part too.
```html
<!-- MAPCAT mapview init -->
<script type="text/javascript" src="mapcatview-min.js"></script>
```

Then you can embed a MAPCAT map in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 100%; height: 400px;'></div>
<script>
  mapcatview.initRasterView("< YOUR MAPCAT ACCESS TOKEN >", null, null, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      var map = L.map('map').setView([51.5095, -0.0595], 13);
      L.tileLayer(response, {
        attribution: 'Map data &copy; ' +
                     '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>',
        maxZoom: 18
      }).addTo(map);
    }
  // continue here
  });
</script>
```

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.com)

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
    ]
  };

  $.ajax({
      url: "https://api-dev.mapcat.com/routing/route",
      beforeSend: function(xhrObj) {
          // Request headers
          xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("X-Api-Key", "< YOUR MAPCAT ACCESS TOKEN >");
      },
      type: "POST",
      dataType: 'json',
      // Request body
      data: JSON.stringify(body)
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of the [MAPCAT API](../index.md#mapcat-service-apis)

## Step 3. Render the route on the map

Change the parameter of the method in the above script to the following:

```javascript
  .done(function(data) {
      var coordinates = [];
      var index, len;
      for (index = 0, len = data.results[0].features.length; index < len; ++index) {
        coordinates.push(data.results[0].features[index].geometry.coordinates.map(function(a){return [a[1],a[0]]}));
      }
      var polyline = L.polyline(coordinates).addTo(map);
  })
```

For more complex use, refer to the documentation of [Leaflet JS](http://leafletjs.com)

## Putting it together

<div id='map' style='width: 100%; height: 400px; margin-bottom: 16px'></div>

Your `index.html` file should look something similar:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MapCat with Leaflet</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>

    <!-- jQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

    <!-- MAPCAT mapview init -->
    <script type="text/javascript" src="mapcatview-min.js"></script>
  </head>

  <body style="margin: 0; background-color: #efefef;">
    
    <div id='map' style='width: 100%; height: 400px;'></div>
    <script>

      mapcatview.initRasterView("< YOUR MAPCAT ACCESS TOKEN >", null, null, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          var map = L.map('map').setView([51.5095, -0.0595], 13);
          L.tileLayer(response, {
            attribution: 'Map data &copy; ' +
                         '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                         'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>',
            maxZoom: 18
          }).addTo(map);
        }

        var body = {
          "waypoints": [
              {
                "lat": 51.509,
                "lon": -0.08
              },
              {
                "lat": 51.510,
                "lon": -0.047
              }
          ]
        };

        $.ajax({
          url: "https://api-dev.mapcat.com/routing/route",
          beforeSend: function(xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("X-Api-Key", "< YOUR MAPCAT ACCESS TOKEN >");
          },
          type: "POST",
          // Request body
          data: JSON.stringify(body),
        })
        .done(function(data) {
          var coordinates = [];
          var index, len;
          for (index = 0, len = data.results[0].features.length; index < len; index++) {
            coordinates.push(data.results[0].features[index].geometry.coordinates.map(function(a){return [a[1],a[0]]}));
          }
          var polyline = L.polyline(coordinates).addTo(map);
        })
        .fail(function() {
          alert("error");
        });

      });

    </script>

  </body>
</html>
```
## Using MAPCAT in Angular 5 application with Leaflet
It is easy to use [MAPCAT](https://mapcat.com) in Angular 5 with [Leaflet](http://leafletjs.com/) library.

To get started, check out our [mapcat-angular-leaflet](https://github.com/MAPCATcom/mapcat-angular-leaflet) example on GitHub.

## Using MAPCAT in React application with Leaflet

An easy way to use [MAPCAT](https://mapcat.com) with [React](https://reactjs.org) is using the [Leaflet](http://leafletjs.com/) library via the [react-leaflet](https://github.com/PaulLeCam/react-leaflet) module.

To get started, check out our [mapcat-react-leaflet](https://github.com/MAPCATcom/mapcat-react-leaflet) example on GitHub.

<script>
mapcatview.initRasterView(token, null, null, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    var map = L.map('map').setView([51.5095, -0.0595], 13);
    L.tileLayer(response, {
      attribution: 'Map data &copy; ' +
                   '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>',
      maxZoom: 18
    }).addTo(map);
  }
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
    url: "https://api-dev.mapcat.com/routing/route",
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("X-Api-Key", token);
    },
    type: "POST",
    data: JSON.stringify(body)
  })
  .done(function(data) {
    var coordinates = [];
    var index, len;
    for (index = 0, len = data.results[0].features.length; index < len; index++) {
      coordinates.push(data.results[0].features[index].geometry.coordinates.map(function(a){return [a[1],a[0]]}));
    }
    var polyline = L.polyline(coordinates).addTo(map);
  })
  .fail(function() {
    alert("error");
  });
});
</script>