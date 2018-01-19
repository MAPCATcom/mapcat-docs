# Using MAPCAT vector based map tiles with Mapbox GL JS

You can use [MAPCAT](http://mapcat.com) services on your website with our [Mapbox GL JS](https://www.npmjs.com/package/@mapcat/mapbox-gl) fork which offers you a JavaScript library that renders interactive maps from vector tiles using WebGL. This fork is able to use multilanguage (i18n) support over [Mapbox GL JS](https://www.mapbox.com). 
We intend to periodically update this fork from the original Mapbox GL JS repository, so if you don't want to use our multilanguage feature you can use original [Mapbox GL JS](https://www.mapbox.com).

The following example gives you a quick start how to use MAPCAT in a single page HTML with our [Mapbox GL JS](https://www.npmjs.com/package/@mapcat/mapbox-gl) fork.

The steps are the following:

1. How to render vector based map tiles fetched from the MAPCAT API
2. How to query directions from the MAPCAT API
3. How to render the vector based route on the top of the map

## Get started

First get your [MAPCAT access token](https://pro.mapcat.com/planpricing/).

## Step 1. Render a map

To use Mapbox GL JS fork in your website copy the following lines into the ```<head>``` part of your HTML page.  
Use the original `mapbox-gl.css` and our forked `mapbox-gl.js` files.

```html
<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/0.43.0/mapbox-gl.css" type="text/css">

<!-- Compiled and minified JavaScript -->
<script type="text/javascript" src=""></script>
```

Include [@mapcat/mapview-init](https://www.npmjs.com/package/@mapcat/mapview-init) in ```<head>``` part too.
```html
<!-- MAPCAT mapview init -->
<script type="text/javascript" src="mapcatview-min.js"></script>
```

Then you can embed MAPCAT in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 100%; height: 400px;'></div>
```

After that, initialize map with [@mapcat/mapview-init](https://www.npmjs.com/package/@mapcat/mapview-init).  
You can set the language of the map with ```setLanguage()``` method.
Its parameter is the ISO 639-1 language code representation of the desired language, it defaults to English (*"en"*).  
You can easily create a language selector with *jQuery* see [full code](#putting-it-together) of this example.

```html
<script type="text/javascript">
  mapcatview.initVectorView(function(error, response) {
    if (error) {
      console.log('Error while initializing map view. Message:', error);
      return;
    }
    var styleSheet = response;
    var map = new mapboxgl.Map({
      container: 'mapContainer',
      style: styleSheet,
      center: [-0.12, 51.51],
      zoom: 13
    });
    map.setLanguage('en');
    // continue here
  }, "< YOUR MAPCAT ACCESS TOKEN >");
</script>
```
Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your access token.

For more complex use, refer to the documentation of [Mapbox GL JS](https://www.mapbox.com).

## Step 2. Query directions via API

We're going to use jQuery to access the MAPCAT API, so copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- jQuery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
```

To query the server, add the following script in the ```<body>``` part of your page, below the previous one, to the comment saying "continue here".

```javascript
var body = {
  "waypoints": [
    {
      "lat": 51.5088043506309,
      "lon": -0.12522608995482187
    },
    {
      "lat": 51.51128488209977,
      "lon": -0.11203226729415405
    }
  ]
};

$.ajax({
  url: "https://api.mapcat.com/routing/route",
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
Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your access token.

For more complex use, refer to the documentation of the [MAPCAT APIs](../index.md#mapcat-service-apis).

## Step 3. Render the route on the map

Change the parameter of the method in the above script to the following:

```javascript
.done(function(data) {
  if (data.meta.status_code != 200) {
    console.log('Unable to get the route.', data.meta.message);
    return;
  }
  var feature = data.results[0].features[0];
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": feature
    },
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "red",
      "line-width": 3
    }
  });
})
```

## Putting it together

Switch map language:

<from id="languageForm">
  <input id="l1" type="radio" name="language" value="zh">
  <label for="l1">Chinese</label>
  <input id="l2" type="radio" name="language" value="en" checked>
  <label for="l2">English</label>
  <input id="l3" type="radio" name="language" value="de">
  <label for="l3">German</label>
</form>

<div id='mapContainer' style='width: 100%; height: 400px; margin-bottom: 16px'></div>

Your `index.html` file should look something similar

```html
<!doctype html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MAPCAT map</title>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/0.43.0/mapbox-gl.css" type="text/css">

    <!-- Compiled and minified JavaScript -->
    <script type="text/javascript" src="http://cdn-static.mapcat.com/npm/@mapcat/mapbox-gl@0.0.1/dist/mapbox-gl.js"></script>

    <!-- jQuery -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <!-- MAPCAT mapview init -->
    <script type="text/javascript" src="mapcatview-min.js"></script>
  </head>

  <body>
    <from id="languageForm">
      <input id="l1" type="radio" name="language" value="zh">
      <label for="l1">Chinese</label>
      <input id="l2" type="radio" name="language" value="en" checked>
      <label for="l2">English</label>
      <input id="l3" type="radio" name="language" value="de">
      <label for="l3">German</label>
    </form>

    <div id='mapContainer' style='width: 100%; height: 400px;'></div>

    <script type="text/javascript">
      var map;
      mapcatview.initVectorView(function(error, response) {
        if (error) {
          console.log('Error while initializing map view. Message:', error);
          return;
        }
        var styleSheet = response;
        map = new mapboxgl.Map({
          container: 'mapContainer',
          style: styleSheet,
          center: [-0.12, 51.51],
          zoom: 13
        });
        map.setLanguage('en');
        var body = {
          "waypoints": [
            {
              "lat": 51.5088043506309,
              "lon": -0.12522608995482187
            },
            {
              "lat": 51.51128488209977,
              "lon": -0.11203226729415405
            }
          ]
        };

        $.ajax({
          url: "https://api.mapcat.com/routing/route",
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
          if (data.meta.status_code != 200) {
            console.log('Unable to get the route.', data.meta.message);
            return;
          }
          var feature = data.results[0].features[0];
          map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
              "type": "geojson",
              "data": feature
            },
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "red",
              "line-width": 3
            }
          });
        })
        .fail(function() {
            alert("error");
        });
      }, "< YOUR MAPCAT ACCESS TOKEN >");

      $('#languageForm input').on('change', function () {
        if (map) {
          map.setLanguage($('input[name=language]:checked', '#languageForm').val());
        } else {
          console.log("Unable to set language.");
        }
    </script>
  </body>
```

<script type="text/javascript">
  var map;
  mapcatview.initVectorView(function(error, response) {
    if (error) {
      console.log('Error while initializing map view. Message:', error);
      return;
    }
    var styleSheet = response;
    map = new mapboxgl.Map({
      container: 'mapContainer',
      style: styleSheet,
      center: [-0.12, 51.51],
      zoom: 13
    });
    map.setLanguage('en');
    var body = {
      "waypoints": [
        {
          "lat": 51.5088043506309,
          "lon": -0.12522608995482187
        },
        {
          "lat": 51.51128488209977,
          "lon": -0.11203226729415405
        }
      ]
    };

    $.ajax({
      url: "https://api.mapcat.com/routing/route",
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader("X-Api-Key", token);
      },
      type: "POST",
      dataType: 'json',
      // Request body
      data: JSON.stringify(body)
    })
    .done(function(data) {
      if (data.meta.status_code != 200) {
        console.log('Unable to get the route.', data.meta.message);
        return;
      }
      var feature = data.results[0].features[0];
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": feature
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "red",
          "line-width": 3
        }
      });
    })
    .fail(function() {
        alert("error");
    });
  }, token);

  $('#languageForm input').on('change', function () {
    if (map) {
      map.setLanguage($('input[name=language]:checked', '#languageForm').val());
    } else {
      console.log("Unable to set language.");
    }
  });
</script>