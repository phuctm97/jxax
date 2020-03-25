FROM ubuntu:18.04

# Install essential system packages.
RUN apt-get update -y \
 && apt-get install -y \
            sudo \
            bash \
            curl \
            git \
            build-essential \
 && apt-get autoremove -y \
 && apt-get clean -y \
 && rm -rf /var/lib/apt/lists/*

# Install NodeJS and Yarn.
RUN curl -sSL https://deb.nodesource.com/setup_10.x | bash - \
 && curl -sSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update -y \
 && apt-get install -y \
            nodejs \
            yarn \
 && apt-get autoremove -y \
 && apt-get clean -y \
 && rm -rf /var/lib/apt/lists/*

# Set up non-root user.
ARG USER=devcontainer-user
ARG UID=1000
ARG GID=$UID
RUN groupadd --gid $GID $USER \
 && useradd --gid $GID --uid $UID --shell /bin/bash --create-home $USER \
 && echo "$USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USER \
 && chmod 0440 /etc/sudoers.d/$USER
USER $USER
WORKDIR /home/$USER
