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
CLI_DIR="/usr/local/bin"
SCRIPTING_LIBRARIES_DIR="$HOME/Library/Script Libraries"

# Make sure $CLI_DIR and $SCRIPTING_LIBRARIES_DIR exists.
sudo mkdir -p "$CLI_DIR"
mkdir -p "$SCRIPTING_LIBRARIES_DIR"

# Download jxax CLI and JXAX scripting library archives and extract to $CLI_DIR
# and $SCRIPTING_LIBRARIES_DIR respectively.
CWD="$(pwd)"
cd "$(mktemp -d)" || exit 1
curl -o jxax-cli.tar.gz -L \
  "https://github.com/deskp/jxax/releases/download/v$JXAX_VERSION/jxax-cli-$JXAX_VERSION.tar.gz"
sudo tar -xzf jxax-cli.tar.gz -C "$CLI_DIR"
curl -o JXAX-scpt.tar.gz -L \
  "https://github.com/deskp/jxax/releases/download/v$JXAX_VERSION/JXAX.scpt-$JXAX_VERSION.tar.gz"
tar -xzf JXAX-scpt.tar.gz -C "$SCRIPTING_LIBRARIES_DIR"

# Cleanup.
TMP=$(pwd)
cd "$CWD" || exit 1
rm -rf "$TMP"
