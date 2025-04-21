#!/usr/bin/env bash
while getopts "p:" opt; do
  case $opt in
    p) PORT=$OPTARG;;
    *) echo "Usage: $0 [-p port]" >&2; exit 1;;
  esac
done
PORT=${PORT:-3000}
cd monogear.org
npm install
npm run build
npm run start -- -p "$PORT"

