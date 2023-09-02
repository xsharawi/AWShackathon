#!/usr/bin/env bash

set -e

apt update -y && apt upgrade -y
apt install jq -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs curl -y

REPO='xsharawi/AWShackathon'

download_url=$(curl "https://api.github.com/repos/$REPO/releases/latest" | jq --raw-output '.assets[0].browser_download_url')

asset_name=$(curl "https://api.github.com/repos/$REPO/releases/latest" | jq --raw-output '.assets[0].name')

sudo mkdir -p /home/ubuntu/app && cd /home/ubuntu/app && sudo curl -LO $download_url && tar xzvf server.tar.gz  && npm install

sudo systemctl daemon-reload

sudo systemctl enable --now app.service