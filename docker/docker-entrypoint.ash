#!/bin/ash

function config {
    if [ ! -z "$API_URL" ]; then
        echo "set API (host) url"
        sed -i 's/\("host": "\)[^"]*\("\)/\1'"$API_URL"'\2/g' /opt/docs/dist/swagger/swagger.json
    fi
    if [ ! -z "$SELF_URL" ]; then
        echo "set SPRITE url"
        sed -i 's#\("sprite": "\)[^"]*\("\)#\1'"$SELF_URL"'\/demo\/mapbox\/assets\/sprite\2#g' /opt/docs/dist/demo/mapbox/assets/mapcat.json
    fi
}

config
static-server -p 8080