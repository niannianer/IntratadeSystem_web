#!/usr/bin/env bash
  scp -r dist/* web@47.93.35.76:/home/web/webhive/nginx/web/dist
  scp -r html/* web@47.93.35.76:/home/web/webhive/nginx/web
