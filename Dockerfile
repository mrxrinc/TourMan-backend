ARG NODE_VERSION=19.5.0

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile

# # Copy the rest of the source files into the image.
COPY . /home/app

EXPOSE 3000

CMD yarn build
