#!/bin/bash

# Get latest release from GitHub.
# See: https://gist.github.com/lukechilds/a83e1d7127b78fef38c2914c4ececc3c.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | # Get latest release from GitHub API.
    grep '"tag_name":' |                                            # Get tag line,
    sed -E 's/.*"([^"]+)".*/\1/'                                    # Pluck JSON value.
}

# Options.
JXAX_VERSION="$(get_latest_release deskp/jxax)"
INSTALLATION_DIR="/usr/local/bin"

# Make sure $INSTALLATION_DIR exists.
sudo mkdir -p $INSTALLATION_DIR

# Download jxax CLI archive and extract to $INSTALLATION_DIR.
CWD="$(pwd)"
cd "$(mktemp -d)" || exit 1
curl -o jxax.tar.gz -L \
  https://github.com/deskp/jxax/releases/download/v$JXAX_VERSION/jxax-$JXAX_VERSION.tar.gz
sudo tar -xzf jxax.tar.gz -C $INSTALLATION_DIR

# Cleanup.
TMP=$(pwd)
cd "$CWD" || exit 1
rm -rf "$TMP"
