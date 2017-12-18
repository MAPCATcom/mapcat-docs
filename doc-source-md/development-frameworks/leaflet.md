# Using MAPCAT with Leaflet

You can use <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a> services on your website with <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> which offers you a JavaScript library that renders interactive maps from raster tiles.

With Leaflet you can use MAPCAT in your browser with javascript or you can easily integrate it in your own [Angular](#using-mapcat-in-angular-5-application-with-leaflet) or [React](#using-mapcat-in-react-application-with-leaflet) application.

The following example gives you a quick start how to use MAPCAT in a single page HTML with <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>.

The steps are the following:

1. How to render raster based map tiles fetched from the MAPCAT API
2. How to query directions from the MAPCAT API
3. How to render the vector based route on the top of the map

## Get started

First get your <a href="https://pro.mapcat.com/planpricing/" target="_blank" rel="noopener">MAPCAT access token</a>.

## Step 1. Render a map

To use Leaflet JS in your website, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />

<!-- Latest compiled and minified JavaScript -->
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
```

Include <a href="https://www.npmjs.com/package/@mapcat/mapview-init" target="_blank" rel="noopener">@mapcat/mapview-init</a> in ```<head>``` part too.
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

For more complex use, refer to the documentation of <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>

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

For more complex use, refer to the documentation of <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>

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
It is easy to use <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a> in Angular 5 with <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> library.

To get started, check out our <a href="https://github.com/MAPCATcom/mapcat-angular-leaflet" target="_blank" rel="noopener">mapcat-angular-leaflet</a> example on GitHub.

## Using MAPCAT in React application with Leaflet

An easy way to use <a href="https://mapcat.com" target="_blank" rel="noopener">MAPCAT</a> with <a href="https://reactjs.org" target="_blank" rel="noopener">React</a> is using the <a href="http://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a> library via the <a href="https://github.com/PaulLeCam/react-leaflet" target="_blank" rel="noopener">react-leaflet</a> module.

To get started, check out our <a href="https://github.com/MAPCATcom/mapcat-react-leaflet" target="_blank" rel="noopener">mapcat-react-leaflet</a> example on GitHub.

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