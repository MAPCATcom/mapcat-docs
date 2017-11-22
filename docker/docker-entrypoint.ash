#!/bin/ash

function config {
    if [ ! -z "$API_URL" ]; then
        echo "set API (host) url"
        sed -i 's/\("host": "\)[^"]*\("\)/\1'"$API_URL"'\2/g' /opt/docs/dist/swagger/swagger.json
    fi
}

config
static-server -p 8080