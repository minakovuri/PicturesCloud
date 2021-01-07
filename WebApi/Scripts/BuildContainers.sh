#!/usr/bin/env bash
echo " ------ Create WebApi build container ------ "
docker build --rm --target pictures_cloud_build -t webapi/pictures_cloud_build:latest -f ../Dockerfile ../

echo " ------ Create WebApi runtime container ------ "
docker build --rm --target pictures_cloud_runtime -t webapi/pictures_cloud_runtime:latest -f ../Dockerfile ../