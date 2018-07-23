# A regisztrált WebHook hívások dokumentációja

A regisztrációhoz szükséges API-k swagger dokumentációja a [Mapcat Mapmatch WebAPI Development](https://dev-mapmatch.mapcat.com) oldalon érhető el, és próbálható ki (megfelelő api kulcs szükséges hozzá).

A WebHook lehetővé teszi, hogy a követési adatok beküldése közben bekövetkezett eseményekre feliratkozzon a felhasználó alkalmazás.
Amikor egy esemény bekövetkezik, a rendszer egy HTTP POST hívást küld a regisztrációkor megadott url-re. A HTTP POST hívás tartalma az alább megadott sémák alapján lesz kitöltve.
A regisztrált WebHook - ok alkalmazásszintűek, tehát appId-hoz lesznek rendelve.
### Alapvető működés, hibakezelés
Minden kimenő WebHook kérésre olyan 200 OK HTTP választ várunk, aminek a body-ja tartalmazza a kimenő WebHook kérés azonosítóját (ld. Sémák - **Response Séma**), a válaszra 25 másodperces timeout van beállítva. Ha a válasz nem 200 OK vagy a body nem tartalmazza a megfelelő azonosítót, esetleg a WebHook kérés timeoutra fut. Akkor a rendszer egy új azonosítóval egy új kérés formájában próbálja meg kiküldeni a megfelelő jegyvásárlási vagy ugrás esemény(eke)t. 
Ha a WebHook kérésre timeout időn belül (25 másodperc) nem érkezik vissza megfelelől válasz, akkor a rendszer 10 másodpercet vár majd újból megpróbálkozik az esemény kiküldésével, egy új WebHook kérésben. Ennek a kérésnek már más lesz az azonosítója. Ha az ismételt kiküldések is hibára futnak, és a hiba 15 percig fennáll, tehát nem sikerült kiküldeni az eseményt, akkor a rendszer 15 perces szünetet tart, mielőtt újra indítaná a kiküldési folyamatot. Ekkor újabb 15 percig próbálkozik az események kiküldésével a fenti várakozási sémával. A WebHook hibakezelés és esemény kiküldés MatchingSession-ként (autónként) független. Így egy autónál fennálló hiba, nincs hatással a többi autó esemény jelzéseire.
A fenti hibakezelési szabály alól egyedül a Ping kérés képez kivételt, ahol pontosan egy hívást indítunk, és bármilyen hiba esetén sikertelennek minősítjük.

Az WebHook kérésekben lévő események kiküldése során ügyelünk a FIFO kiküldésre, amíg egy adott kérésben lévő információk kiküldése nem történik meg egyértelműen (kérésre nem érkezik megfelelő válasz), addig nem próbálkozunk meg újabb esemény kiküldésével. 
A rendszer **legalább egy sikeres kiküldés garanciát vállal** minden jegytépési és ugrási eseményre. Rendszerhiba esetén előfordulhat azonban egy - egy esemény ismételt kiküldése, illetve ha egy adott eseménytípusra több WebHook is be van regisztrálva, akkor a rendszer addig próbálkozik, amíg legalább az egyik WebHook - ra ki nem küldi az eseményt.

A WebHook kérések fogadásakor lényeges, hogy az esetleges rendszerhiba miatt duplán kiküldött eseményeket a fogadó alkalmazás lenyugtázza, különben a FIFO kiküldési garancia miatt a rendszerben feltorlódhatnak az azóta újonnan létrejött események.
### WebHook nélküli működés
A felhasználó alkalmazással szemben elvárt, hogy akkor küldjön jármű adatokat, ha van aktív WebHook regisztrálva és az elérhető. Ha nincs aktív WebHook, akkor is gyűjtjük az eseményeket, ekkor viszont a fenti 10 másodperces újraküldési várakozás helyett 1 percet vár a rendszer mielőtt újra próbálkozna a kiküldéssel. Ha ez az állapot sokáig fennáll, akkor letilthatjuk a járműadatok fogadását, amíg nem lesz megfelelő WebHook regisztrálva.
### Limitációk
+ maximum 10 regisztrált WebHook lehet a redszerben egy appId-hoz

### Események

+ **ping**, ez egy teszt esemény, tesztelésre használjuk és a regisztrációkor is küldünk egy pinget az url ellenőrzésére
+ **jump**, ugrási esemény
+ **ticket**, jegytépési esemény 

### Http Header-ek leírása
+ name: **X-MapMatch-WebHook-Signature**
+ tartalma: **sha256=[signature]**

Ez a HTTP Header tartalmazni fogja a Http Post kérés tartalmának HMAC SHA256 algoritmussal készült hash-ét, a tikos kulcsot felhasználva, ami garantálja, hogy a hash csak a tikos kulcs ismeretében állítható elő.
Ha ezt a hash értéket ellenőrzik a fogadó rendszer oldalán, akkor az biztosítja, hogy a kérés mi rendszerünk küldte. Ez persze opcionális, illetve fontos, hogy a Tikos kulcs ne kerüljön ki.


További HTTP Header-eket küldünk, amit a WebHook regisztrációjánál kulcs-érték párként meg lett adva. Ez tetszőleges lehet, akár API kulcs vagy bármi más.

### Sémák

#### Response Séma
Minden webhook kérést ezzel a válaszüzenettel kell nyugtázni, különben megismételjük a kiküldést. 
A példa az alábbi Ping kérésre adott nyugtázó válasz.
```json
{
  "requestId": "4c266097-7db4-4980-bcc3-828f7c3469a6" // általánosságban a request body "Id" mezőjét kell tartalmaznia
}
```

#### Ping Séma
```json
{
  "Id": "4c266097-7db4-4980-bcc3-828f7c3469a6",
  "AppId":"8b9ff992-869a-4713-8a98-f71fa0489bb7"
  "WebHookId":"ad62e09c-65bd-4713-ba3b-68b25bd25e75"
  "SessionId":"00000000-0000-0000-0000-000000000000"
  "Attempt": 1,
  "Notifications": [
    {
      "Type": "Ping",
      "SendTime": "2017-08-07T12:21:07.4698681+00:00"
    }
  ],
  "Properties": {
    "hookId": "ad62e09c-65bd-4713-ba3b-68b25bd25e75",
    "appId": "8b9ff992-869a-4713-8a98-f71fa0489bb7"
  }
}
```

#### Event Séma 
```json
{
  "Id": "b9588ae9-69cb-43cc-ab22-7de2ad72002c", // Minden eseményre egyedi azonosító
  "Attempt": 1, // Deprecated: A próbálkozás számát mutatta, egy adott kiküldési ciklusban, de megváltoztattuk a kiküldési hibakezelést.
  "AppId":"8b9ff992-869a-4713-8a98-f71fa0489bb7"
  "WebHookId":"ad62e09c-65bd-4713-ba3b-68b25bd25e75"
  "SessionId":"8cb02405-f0df-4f3a-b983-0f862458ff32"
  "Notifications": [ // idő szerint növekvően rendezett esemény lista
    {
      "Type": "Jump",
      "SendTime": "2017-08-07T12:21:07.4698681+00:00"
	  ...Teljes séma alább
    },
	{
      "Type": "Ticket",
      "SendTime": "2017-08-07T12:21:07.4698681+00:00"
	  ...Teljes séma alább
    },
  ],
  "Properties": {
    "hookId": "ad62e09c-65bd-4713-ba3b-68b25bd25e75",
    "appId": "8b9ff992-869a-4713-8a98-f71fa0489bb7"
  }
}
```
A Properties.hookId és Properties.appId törölve lesz, mert bekerült a Body-ba.

#### Jump Notification Séma
```json
{
  "From": { // Ugrás induló pozíció
    "Longitude": 16.5850887298584,
    "Latitude": 46.50639724731445
  },
  "To": { // Leérkezési pozíció
    "Longitude": 16.52459907531738,
    "Latitude": 46.51979064941406
  },
  "FromTime": 1488770954, // ugrás kezdőidőpontja
  "ToTime": 1488985198, // leérkezés időpontja
  "LastEdid": "M70u10k380m", // utolsó megvett jegy EDID azonosítója
  "LastEdidiDirection": "Forward", // utolsó megvett jegy iránya
  "JumpType": 3, // 0 - Normál, 1 - Menetillesztés túl sok Edids szakaszt tartalmazott, 2 - Határon át beugrás MO-ra, 3 - Határon át kiugrás MO-ról
  "Time": 1488770954, // Event time, az események rendezhetősége miatt van itt, megegyezik a FromTime al.
  "Type": "Jump", // Notifikáció típusa
  "SendTime": "2017-08-10T13:20:33.9905933Z" // Notifikációs objektum létrehozásának belső rendszerideje
}
```
#### Ticket Notification Séma
```json
{
	Edid: "M7u206k50m", // EDID azonosító
	EdidDirection: "Backward", // EDIDhez tartozó irányazonosító Forward/Backward
	Fact: 1, // 0 - menetillesztett jegy, 1 - normál jegy
	Position: { // pozíció, ami alapján betéptük, vagy menetillesztés esetén a szakasz kezdő koordinátája
		Latitude: 46.47738265991211
		Longitude: 16.97397041320801
	},
	Price: 277.7799987792969, // Ár
	SendTime: "2017-08-10T13:21:09.1537981Z", // Notifikációs objektum létrehozásának belső rendszerideje
	Time: 1488990656, // Jegy időbélyegzője
	Type: "Ticket" // Notifikáció típusa
}
```
### Példa kód

#### Kliens
```js
const https = require('https');
const fs = require('fs');
const path = require('path');

const appId = '' //Your application ID
const apiKey = '' //Your apllication key
const webHookServer = '' //Your web server address

if (appId == '' || apiKey == '' || webHookServer == '') {
    console.log('Required fields: appId, apiKey, webHookId');
    return;
}

const commonHeaders = {
    'Content-Type': 'application/json',
    'X-MapMatch-ApiKey': apiKey,
    'X-MapMatch-AppId': appId
}

const postRequest = {
    host: 'dev-mapmatch.mapcat.com',
    method: 'POST',
    headers: commonHeaders
}

let matchingSessionId = '';
let webHookId = '';
let equipmentId = '';

function generateEquipmentId() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function post(postData, path) {
    return new Promise(function (resolve, reject) {
        postRequest.path = path;
        let req = https.request(postRequest, function (res) {
            let buffer = '';
            res.on('data', function (data) {
                buffer = buffer + data;
            });
            res.on('end', function () {
                if (this.statusCode == 200 || this.statusCode == 201) {
                    resolve(buffer);
                } else {
                    reject(buffer);
                }
            });
        });
        req.on('error', function (e) {
            reject(e.message);
        });
        req.write(JSON.stringify(postData));
        req.end();
    })
}

function registerMatchingSession() {
    return new Promise(function (resolve, reject) {
        equipmentId = generateEquipmentId();
        let postData = {
            'equipmentId': equipmentId,
            'registrationTimeStamp': 1488927610,
            'baseVehicleCategory': 3,
            'euroCategory': 5
        }
        post(postData, '/api/MatchingSession').then(function (data) {
            matchingSessionId = JSON.parse(data).id;
            resolve(matchingSessionId);
        }).catch(function (err) {
            reject(err);
        });
    })
}

function registerWebHook() {
    return new Promise(function (resolve, reject) {
        let postData = {
            'url': webHookServer,
            'secret': 'SigningSecret',

            'events': [
                'Jump',
                'Ticket'
            ],
            'active': true
        }
        post(postData, '/api/WebHook').then.then(function (data) {
            webHookId = JSON.parse(data).id;
            resolve(webHookId);
        }).catch(function (err) {
            reject(err);
        });
    })
}

function checkWebHook() {
    return new Promise(function (resolve, reject) {
        const getRequest = {
            host: postRequest.host,
            path: '/api/WebHook/',
            method: 'GET',
            headers: commonHeaders
        };
        let req = https.get(getRequest, function (res) {
            let buffer = '';
            res.on('data', function (data) {
                buffer = buffer + data;
            });
            res.on('end', function () {
                if (this.statusCode == 200 || this.statusCode == 201) {
                    let hooks = JSON.parse(buffer);
                    for (i in hooks) {
                        if (hooks[i].url == webHookServer) {
                            webHookId = hooks[i].id;
                            resolve(webHookId);
                        }
                    }
                    if (webHookId == '') {
                        registerWebHook().then(function (data) {
                            webHookId = JSON.parse(data).id;
                            resolve(webHookId);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                } else {
                    reject(buffer);
                }
            });
        });
        req.on('error', function (e) {
            reject(e.message);
        });
        req.end();
    })
}

function matchingTrack(matchingSessionId, track) {
    return new Promise(function (resolve, reject) {
        let rawdata = fs.readFileSync(track);
        let tracklog = JSON.parse(rawdata);
        let postData = {
            'trackings': [
                {
                    'equipmentId': equipmentId,
                    'matchingSessionId': matchingSessionId,
                    'path': tracklog
                }
            ]
        }
        post(postData, '/api/Track').then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}

// Sample session
function runTestSession() {
    // check whether webhook exists
    checkWebHook().then(function () {
        fs.readdir('./tracks', function (err, files) {
            if (err) {
                console.error('Could not list the directory.', err);
                process.exit(1);
            }
            files.forEach(function (file, index) {
                let filepath = path.join(__dirname, 'tracks', file);
                //Register matching session
                registerMatchingSession().then(function (id) {
                    //Send track data
                    matchingTrack(id, filepath).then(function (data) {
                        console.log(data);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }).catch(function (err) {
                    console.log(err);
                });
            })
        })
    }).catch(function (err) {
        console.log(err);
    });
}
runTestSession();

```

#### WebHook server
```js

let http = require('http');
let port = -1;
if (port == -1) {
    console.log('Required field: port');
    return;
}
console.log('\033c')
console.log("Server port: " + port);
let server = http.createServer().listen(port);

server.on('request', function (req, res) {
  let body = ''

  req.on('data', function (data) {
    body += data;
  });

  req.on('end', function () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (!body) {
      res.setHeader('Content-Type', 'text/html');
      res.end("");
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    let data = JSON.parse(body);
    if (data) {
      let id = { RequestId: data.Id };
      res.end(JSON.stringify(id));
      return;
    }
    res.end("Error");
  });
});

```