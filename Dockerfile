# base
ARG NODE_VERSION=22.8.0
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
WORKDIR /src

# build
FROM base as build
ARG NUXT_EVRIM_API_URL
ARG NUXT_STRIPE_PUBLISHABLE_KEY
ARG NUXT_STRIPE_MANAGEMENT_URL
COPY --link ./evrim-ui/package.json ./evrim-ui/package-lock.json ./
RUN npm install
COPY --link ./evrim-ui ./
ENV NUXT_EVRIM_API_URL=${NUXT_EVRIM_API_URL}
ENV NUXT_STRIPE_PUBLISHABLE_KEY=${NUXT_STRIPE_PUBLISHABLE_KEY}
ENV NUXT_STRIPE_MANAGEMENT_URL=${NUXT_STRIPE_MANAGEMENT_URL}
# run build commands
RUN npm run build
RUN npm prune


FROM base

ENV PORT=$PORT

# install curl
RUN apt-get update && apt-get install -y curl
COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
