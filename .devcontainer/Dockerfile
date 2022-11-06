FROM --platform=linux/arm64 rust:1.64-slim-bullseye

# [Optional] Uncomment this section to install additional packages.
RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates libssl-dev wget libudev-dev pkg-config zlib1g-dev llvm clang cmake make libprotobuf-dev protobuf-compiler \
    && apt-get install -yq build-essential \
    && curl -L https://deb.nodesource.com/setup_18.x | bash \
    && apt-get update -yq \
    && apt-get install -yq nodejs \
    && npm install --global yarn \
    && npm config set cache /tmp --global

ARG SOLANA_VERSION=1.14.6

RUN wget -O /opt/solana-${SOLANA_VERSION}.tar.gz https://github.com/solana-labs/solana/archive/refs/tags/v${SOLANA_VERSION}.tar.gz \
    && cd /opt; tar -xvf solana-${SOLANA_VERSION}.tar.gz \
    && cd /opt/solana-${SOLANA_VERSION}; ./scripts/cargo-install-all.sh .

ENV PATH=/opt/solana-${SOLANA_VERSION}/bin:$PATH
RUN echo 'PATH=$PATH:/$PATH:/opt/solana-${SOLANA_VERSION}/bin' >> ~/.bashrc