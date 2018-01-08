# Overview

The vector tile schema describes how the vector data is organized into different thematic layers and which fields and values each layer contains. MAPCAT scheme is built upon OpenMapTiles [schema](https://github.com/openmaptiles/openmaptiles) BSD license.

## OpenStreetMap

Vector tiles of MAPCAT is based on OpenStreetMap data, a free &amp; global source of geographic data built by a community of map editors. Knowledge of OSM data specification is not necessary to utilise MAPCAT.

## Geometry

MAPCAT vector tiles support the following multiple geometry types in the same layer:

- Point
- Linestring / multilinestring
- Polygon / multipolygon

## OSM IDs

OSM id and OSMtype are stored as field of object in every layers, except for &#39;highway&#39;-s and &#39;boundaries&#39;.

OpenStreetMap Ids are unique within object type (node, way, and relation), but not across types. MAPCAT stores OSM IDs as is, customers are able to use it.

- node: n2314352
- way: w2314352
- relation: r2314352

In order to better, faster service with less storage needs MAPCAT generalizes mulitple objects. Due to this combine method the osm\_id will be one of the input IDs chosen at random.

# Layers

## aeroway

Aeroway polygons and lines based of OpenStreetMap [aeroways](https://wiki.openstreetmap.org/wiki/Aeroways). Airport buildings which are not related to these tags are contained in the building layer.

The original value of the [aeroway](https://wiki.openstreetmap.org/wiki/Key:aeroway) tag.

| Field | Description |
| --- | --- |
| **runway** | Where planes take off &amp; land |
| **taxiway** | Where planes move between runways, gates, and hangars |
| **apron** | Where planes park, refuel, load |
| **hangar** | A large airport building with extensive floor areas for housing aircraft or spacecraft |

## boundary

Administrative boundary lines as linestrings.There are no overlapping lines where multiple boundary areas meet.

| Field | Value | Description |
| --- | --- | --- |
| **admin\_level** | OSM data contains all admin\_level but for most styles it makes sense to just style admin\_level=2 and admin\_level=4 | OSM admin\_level indicating the level of importance of this boundary. The admin\_level corresponds to the lowest admin\_level the line participates in. Separates different levels of boundaries, using a similar numbering scheme to OpenStreetMap |
| **disputed** | 0 – Not disputed <br>1 – Disputed | The disputed field should be used to apply a dashed or otherwise distinct style to disputed boundaries |
| **maritime** | 0 – Not maritime <br> 1 – Maritime | National borders at sea of non-landlocked countries. |

## building

All [OSM Buildings](https://wiki.openstreetmap.org/wiki/Buildings) are included and all tags are imported ( [building=\*](https://wiki.openstreetmap.org/wiki/Key:building)) except render\_min\_height and render\_height fields which are not in the scheme. Large buildings appear at zoom level 13, and all buildings are included in zoom level 14 and up. The type field lets you differentiate building parts from building outlines

| Field | Description |
| --- | --- |
| [**building=\***](https://wiki.openstreetmap.org/wiki/Key:building) | The building key is used to mark areas as a building. |

## housenumber

All objects where [addr:housenumber](https://wiki.openstreetmap.org/wiki/Key:addr) tag is filled are utilizied for labelling housenumbers on a map. It appears in _z16_ level.

| Field | Description |
| --- | --- |
| **housenumber** | This layer contains points used to label the street number parts of specific addresses.  |

## landcover

[Landcover](https://wiki.openstreetmap.org/wiki/Landcover) is used to describe the physical material at the surface of the earth.

| Field | Value | Description |
| --- | --- | --- |
| **class** | farmland | Various types of crop and farmland |
| | ice | Glaciers or permanent ice/snow |
| |wood | Woods and forestry areas |
| |grass | An area of mown and managed grass. |
| |wetland | Main wetland types include swamps, marshes, bogs and fens |
| **subclass** | sand | Sand, beaches, dunes |
| |scrub | Bushes, scrub, heaths |
| |flat | Main wetland without greenery. |

## landuse

Landuse is used to describe use of land by humans.

| Field | Value | Description |
| --- | --- | --- |
| **class** | school | Primary, secondary, post-secondary school grounds |
| |hospital | Hospital grounds |
| |railway | rea for railway use |
| |cemetery | Place for burials |
| |residential | Predominantly houses or apartment buildings |
| |industrial | Predominantly workshops, factories or warehouses |
| |pedestrian\_area | Pedestrian areas are formed closed-way and tagged with highway=pedestrian and area=yes |
| |pitch | Sports fields &amp; courts of all types |
| |park | City parks, village greens, playgrounds, national parks, nature reserves, etc |
| |parking | Car park |
| |playground | Playground for little children |

## place

The place layer consists out of [countries](https://wiki.openstreetmap.org/wiki/Tag:place%3Dcountry), [states](https://wiki.openstreetmap.org/wiki/Tag:place%3Dstate) and [cities](https://wiki.openstreetmap.org/wiki/Key:place).

| Field | Value | Description |
| --- | --- | --- |
| **name\_\***|   | MAPCAT provides all the language variants from OSM |
| **name** |   | The OSM [name](https://wiki.openstreetmap.org/wiki/Key:name) value of the POI. |
| **capital** |   | Marks the [admin\_level](https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level) of the boundary the place is a capital of |
| **class** | country | A nation state or other high-level national administrative area |
| |state | A large sub-national political / administrative area |
| |city | The largest urban settlement or settlements within the territory |
| |town | An important urban centre, between a village and a city in size |
| |village | A smaller distinct settlement, smaller than a town with few facilities available |
| |hamlet | A smaller rural community, typically with fewer than 100-200 inhabitants |
| |suburb | A part of a town or city with a well-known name and often a distinct identity |
| |neighbourhood | A neighbourhood is a smaller named, geographically localised place within a suburb of a larger city or within a town or village |
| **rank** |   | Countries, states and the most important cities all have a rank to boost their importance on the map. The rank field for counries and states ranges from 1 to 6 while the rank field for cities ranges from 1 to 10 |

## poi

[Points of interests](https://wiki.openstreetmap.org/wiki/Points_of_interest) containing a of a variety of OpenStreetMap tags. Mostly contains amenities, sport, shop and tourist POIs.

| Field | Description |
| --- | --- |
| **name\_\*** | MAPCAT provides all the language variants from OSM |
| **name** | The OSM [name](https://wiki.openstreetmap.org/wiki/Key:name) value of the POI. |
| **maincat** | Value (number), which classifies POIs into general classes. |
| **rank** | The POIs are ranked ascending according to their importance within a grid |
| **subcat** | Original value of either the [amenity](https://wiki.openstreetmap.org/wiki/Key:amenity), [leisure](https://wiki.openstreetmap.org/wiki/Key:leisure), [landuse](https://wiki.openstreetmap.org/wiki/Key:landuse), [sport](https://wiki.openstreetmap.org/wiki/Key:sport), [tourism](https://wiki.openstreetmap.org/wiki/Key:tourism) or [shop](https://wiki.openstreetmap.org/wiki/Key:shop) tag. It gives a more detailed classification. |
| **brand** | Used to describe either the principle brand of goods or services |
| **cuisine** | For describing the type of food served at an eating place |
| **wikipedia** | [http://wiki.openstreetmap.org/wiki/Key:wikipedia](https://www.google.com/url?q=http://wiki.openstreetmap.org/wiki/Key:wikipedia&amp;sa=D&amp;ust=1515143071452000&amp;usg=AFQjCNHY_J6V1IA83CsoRxmWnqZZr3__vA) |
| **wikidata** | [http://wiki.openstreetmap.org/wiki/Key:wikidata](https://www.google.com/url?q=http://wiki.openstreetmap.org/wiki/Key:wikidata&amp;sa=D&amp;ust=1515143071445000&amp;usg=AFQjCNGmFCWayYABBi_E5ltAW4FdEEj5ig) |
| **maki** | Icon value |

## transportation

Transportation contains roads and railways. This layer is directly derived from the OSM road hierarchy.

| Field | Value | Description |
| --- | --- | --- |
| **brunnel** | bridge | Mark whether way is a tunnel or bridge. |
| |tunnel |
| **class:** Distinguish between more and less important roads or railways. Class is derived from the value of the highway or railway tag | motorway | High-speed, grade-separated highways |
| |trunk | Important roads that are not motorways. |
| |primary | A major highway linking large towns. |
| |secondary | A highway linking large towns. |
| |tertiary | A road linking small settlements, or the local centres of a large town or city. |
| |minor | The least most important through roads in a country&#39;s system |
| |track | Roads mostly for agricultural and forestry use etc. |
| |path | Foot paths, cycle paths, ski trails. |
| |rail | Railways, including mainline, commuter rail, and rapid transit. |
| |motorway\_link | nterchanges / on &amp; off ramps |
| |link | Contains link roads |
| |street | Standard unclassified, residential, road, and living\_street road types |
| |street\_limited | Streets that may have limited or no access for motor vehicles. |
| |living\_street | Residential streets where pedestrians have legal priority over cars |
| |pedestrian | Includes pedestrian streets, plazas, and public transportation platforms. |
| **type** | motorway | High-speed, grade-separated highways |
| |motorway\_link | Interchanges / on &amp; off ramps |
| |trunk | Important roads that are not motorways. |
| |primary | A major highway linking large towns. |
| |secondary | A highway linking large towns. |
| |tertiary | A road linking small settlements, or the local centres of a large town or city. |
| |link | Contains link roads |
| |street | Standard unclassified, residential, road, and living\_street road types |
| |street\_limited | Streets that may have limited or no access for motor vehicles. |
| |residential | Roads which serve as an access to housing, without function of connecting settlements |
| |living\_street | Residential streets where pedestrians have legal priority over cars |
| |pedestrian | Includes pedestrian streets, plazas, and public transportation platforms. |
| |construction | Includes motor roads under construction (but not service roads, paths, etc). |
| |track | Roads mostly for agricultural and forestry use etc. |
| |golf | The approximate centerline of a golf course hole |
| |platform | A small bus stop |
| |steps | For flights of steps (stairs) on footways |
| **oneway** |   | Mark with 1 whether way is a oneway (in the direction of the way) or not with 0. |
| **zoomfrom** |   | Roads are rendered from the given zoom level. |
| **shield** |   | Icon name of the shield |
| **ref** |   | The OSM [ref](https://wiki.openstreetmap.org/wiki/Key:ref) tag of the motorway or its network |
| **ref\_length** |   | Length of the ref field. Useful for having a shield icon as background for labeling motorways. |

## water

Water polygons representing oceans and lakes. Covered watered areas are excluded. All water polygons from  [OpenStreetMapData](http://openstreetmapdata.com/) have the class ocean. Water bodies are classified as lake or river for water bodies with the  [waterway](https://wiki.openstreetmap.org/wiki/Key:waterway) tag.

| Field | Value | Description |
| --- | --- | --- |
| **class** | lake | A body of relatively still fresh or salt water of considerable size, localized in a basin that is surrounded by land |
| |River not included | MAPCAT treats river bodies as lakes. |

## water\_name

Lake center lines for labelling lake bodies.

| Field | Description |
| --- | --- |
| **name\_\*** | MAPCAT provides all the language variants from OSM |
| **name** | The OSM [name](https://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the lake |
| **class** | At the moment only lake since no ocean parts are labelled |

## waterway

OpenStreetMap  [waterways](https://wiki.openstreetmap.org/wiki/Waterways)

| Field | Description |
| --- | --- |
| **name\_\*** | MAPCAT provides all the language variants from OSM |
| **name** | The OSM [name](https://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the waterways |
| **class** | The original value of the  [waterway](https://wiki.openstreetmap.org/wiki/Key:waterway) tag. |

## shape\_label

Layer for visualize the name of shape objects on the map

| Field | Value | Description |
| --- | --- | --- |
| **area** |   | Closed polygon object with name |
| **class** | 1 - ocean | Ocean |
| |2 - sea | A large body of marine water and part of an ocean: seas |
| |3 - continent | Continent |
| |4 - arcipelago | Is a chain, cluster or collection of islands |
| |5 - bay | An area of water mostly surrounded by land but with level connection to the ocean or a lake |
| |6 - strait | A strait is a naturally formed, narrow, typically navigable waterway that connects two larger bodies of water |
| |7 - cape | piece of elevated land sticking out into the sea or large lake |
| |8 - mountain\_range | A mountain range or hill range is a series of mountains or hills ranged in a line and connected by high ground |
| |9- peninsula | A natural headland or point on land |
| |10 - island | An island or isle is any piece of sub-continental land that is surrounded by water |
| **name** |   | The OSM [name](https://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the shape |
| **name\_\*** |   | MAPCAT provides all the language variants from OSM |

## road (cycle.road)

Distinguish road network elements based on cycle attributes

| Field | Value | Description |
| --- | --- | --- |
| **class** | 1 - cycle track | A cycle track is separated from the road by curbs, parking lots, grass verges, trees or another physical barrier, but is running parallel and next to the road. |
| |2 - cyclable walkway | Pedestrian roads where cyclist are allowed |
| |3 - bike lane | Is used to tag two-way streets where there are cycle lanes on both sides of the road, or one-way streets where there is a lane operating in the direction of main traffic flow |
| |4 - shared lane | Cyclists share a lane with motor vehicles, and there are markings indicating that motorists and cyclists should share this lane. |
| |5 - preferred road | Preferred route for cyclist |

## route (cycle.route)

Predefined network for cyclist

| Field | Value | Description |
| --- | --- | --- |
| **network** | ncn | national cycle network |
| | rcn | regional cycle network |
| **shield** |   | The shield field indicates the style of shield needed for the route |
| **ref** |   | Holds any reference codes or route numbers a road may have |
| **ref\_length** |   | Length of ref |

## building\_label

| Field | Description |
| --- | --- |
| **name\_\*** | MAPCAT provides all the language variants from OSM |
| **name** | The OSM [name](https://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the buildings |

# Changelog

Actual MAPCAT vector tile specification is 1.0. Updates in specification will be described in the changelog section

## Proposals for 2.0

Render landuse and landcover subclasses
