# Using MAPCAT with OpenLayers

You can use [MAPCAT](http://mapcat.com) services on your website with [OpenLayers](http://openlayers.org) which offers you a JavaScript library that renders interactive maps from raster tiles using WebGL.

With OpenLayers you can use MAPCAT in your browser with javascript or you can easily integrate it in your own [Angular](#using-mapcat-in-angular-5-application-with-openlayers) application.

The following example gives you a quick start how to use MAPCAT in a single page HTML with [OpenLayers](http://openlayers.org).

The steps are the following:

1. How to render raster based map tiles fetched from the MAPCAT API
2. How to query directions from the MAPCAT API
3. How to render the vector based route on the top of the map

## Get started

First get your [MAPCAT access token](https://pro.mapcat.com/planpricing/).

## Step 1. Render a map

To use OpenLayers in your website, copy these lines into the ```<head>``` part of your HTML page.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://openlayers.org/en/v4.5.0/css/ol.css" type="text/css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://openlayers.org/en/v4.5.0/build/ol.js" type="text/javascript"></script>
```

Include [@mapcat/mapview-init](https://www.npmjs.com/package/@mapcat/mapview-init) in ```<head>``` part too.
```html
<!-- MAPCAT mapview init -->
<script type="text/javascript" src="mapcatview-min.js"></script>
```

Then you can embed MAPCAT in the ```<body>``` part of your page in a div that has its size specified.

```html
<div id='map' style='width: 100%; height: 400px;'></div>

<script type="text/javascript">
  mapcatview.initRasterView("< YOUR MAPCAT ACCESS TOKEN >", null, null, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: response,
              projection: 'EPSG:3857',
              attributions: [
                new ol.Attribution({
                  html: 'Map data &copy; ' +
                        '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>'
                })
              ]
            })
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-0.0595, 51.5095]),
          zoom: 13
        })
      });
    }
  // continue here
  });
</script>
```

Substitute ```< YOUR MAPCAT ACCESS TOKEN >``` with your acceess token.

For more complex use, refer to the documentation of [OpenLayers](http://openlayers.org)

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
    var features = [];
    var index, len;
    for (index = 0, len = data.results[0].features.length; index < len; index++) {
      var i;
      var coordinates = [];
      for (i=0; i<data.results[0].features[index].geometry.coordinates.length; i++) {
        coordinates.push(ol.proj.fromLonLat(data.results[0].features[index].geometry.coordinates[i]));
      }
      features[index] = new ol.Feature({
        'geometry': new ol.geom.LineString(coordinates)
      });
    }
    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: features,
        wrapX: false
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ff0000',
          width: 2
        })
      })
    });
    map.addLayer(vector);
  })
```


## Putting it together

<div id='map' style='width: 100%; height: 400px; margin-bottom: 16px'></div>

Your `index.html` file should look something similar

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MapCat with OpenLayers</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://openlayers.org/en/v4.5.0/css/ol.css" type="text/css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://openlayers.org/en/v4.5.0/build/ol.js" type="text/javascript"></script>

    <!-- jQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

    <!-- MAPCAT mapview init -->
    <script type="text/javascript" src="mapcatview-min.js"></script>
  </head>

  <body style="margin: 0; background-color: #efefef;">
    
    <div id='map' style='width: 400px; height: 300px;'></div>

    <script>
      mapcatview.initRasterView("< YOUR MAPCAT ACCESS TOKEN >", null, null, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          var map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.XYZ({
                  url: response,
                  projection: 'EPSG:3857',
                    attributions: [
                      new ol.Attribution({
                        html: 'Map data &copy; ' +
                              '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                              'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>'
                      })
                    ]
                })
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([-0.0595, 51.5095]),
              zoom: 13
            })
          });
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
          ]
        };
        $.ajax({
          url: "https://api-dev.mapcat.com/routing/route",
          beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("X-Api-Key", "< YOUR MAPCAT ACCESS TOKEN >");
          },
          type: "POST",
          dataType: 'json',
          data: JSON.stringify(body)
        })
        .done(function(data) {
          var features = [];
          var index, len;
          for (index = 0, len = data.results[0].features.length; index < len; index++) {
            var i;
            var coordinates = [];
            for (i=0; i<data.results[0].features[index].geometry.coordinates.length; i++) {
              coordinates.push(ol.proj.fromLonLat(data.results[0].features[index].geometry.coordinates[i]));
            }
            features[index] = new ol.Feature({
              'geometry': new ol.geom.LineString(coordinates)
            });
          }
          var vector = new ol.layer.Vector({
            source: new ol.source.Vector({
              features: features,
              wrapX: false
            }),
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2
              })
            })
          });
          map.addLayer(vector);
        })
        .fail(function() {
          alert("error");
        });
      });
    </script>
  </body>
</html>
```

## Using MAPCAT in Angular 5 application with OpenLayers
There is an easy way to use [MAPCAT](https://mapcat.com) in Angular 5 with [OpenLayers](http://openlayers.org) library and [mangol](https://github.com/fegyi001/mangol) module.

To get started, check out our [mapcat-angular-openlayers](https://github.com/MAPCATcom/mapcat-angular-openlayers) example on GitHub.

<script>
mapcatview.initRasterView(token, null, null, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: response,
            projection: 'EPSG:3857',
            attributions: [
              new ol.Attribution({
                html: 'Map data &copy; ' +
                      '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                      'Imagery &copy; <a href="http://mapcat.com">MAPCAT</a>'
              })
            ]
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-0.0595, 51.5095]),
        zoom: 13
      })
    });
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
    ]
  };
  $.ajax({
    url: "https://api-dev.mapcat.com/routing/route",
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("X-Api-Key", token);
    },
    type: "POST",
    dataType: 'json',
    data: JSON.stringify(body),
  })
  .done(function(data) {
    var features = [];
    var index, len;
    for (index = 0, len = data.results[0].features.length; index < len; index++) {
      var i;
      var coordinates = [];
      for (i=0; i<data.results[0].features[index].geometry.coordinates.length; i++) {
        coordinates.push(ol.proj.fromLonLat(data.results[0].features[index].geometry.coordinates[i]));
      }
      features[index] = new ol.Feature({
        'geometry': new ol.geom.LineString(coordinates)
      });
    }
    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: features,
        wrapX: false
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ff0000',
          width: 2
        })
      })
    });
    map.addLayer(vector);
  })
  .fail(function() {
    alert("error");
  });
});
</script>