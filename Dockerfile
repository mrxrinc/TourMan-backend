ARG NODE_VERSION=19.5.0

# Stage 1: Build
FROM node:${NODE_VERSION}-alpine AS build

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# # Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them
# # into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile

COPY . /home/app

# Stage 2: Development
FROM build AS development

RUN yarn global add nodemon

CMD ["nodemon", "server.js"]

# Stage 3: Production
FROM build AS production

CMD ["node", "server.js"]