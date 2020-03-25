#!/bin/bash

JXAX_VERSION='1.0.0-rc.1'
INSTALLATION_DIR='/usr/local/bin'

# Make sure $INSTALLATION_DIR exists.
sudo mkdir -p $INSTALLATION_DIR

# Download jxax CLI archive and extract to $INSTALLATION_DIR
CWD=$(pwd)
cd $(mktemp -d)
curl -o jxax.tar.gz -L \
  https://github.com/deskp/jxax/releases/download/v$JXAX_VERSION/jxax-$JXAX_VERSION.tar.gz
sudo tar -xzf jxax.tar.gz -C $INSTALLATION_DIR
TMP=$(pwd)
cd $CWD
rm -rf $TMP
