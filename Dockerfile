
FROM node:12-buster as install

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

COPY package.json .
COPY yarn.lock .

RUN yarn install --force --ignore-scripts --frozen-lockfile --ignore-optional

FROM node:12-buster as build

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG PORT=3000
ENV PORT ${PORT}

ARG API_URL=http://localhost:8000
ARG WEB_URL=http://localhost:3000
ARG CMS_URL=http://localhost:1337
ARG FIREBASE_API_KEY=
ARG FIREBASE_PROJECT_ID=
ARG FIREBASE_DATABASE_URL=
ARG GOOGLE_ANALYTICS_TAG=
ENV API_URL ${API_URL}
ENV WEB_URL ${WEB_URL}
ENV CMS_URL ${CMS_URL}
ENV FIREBASE_API_KEY ${FIREBASE_API_KEY}
ENV FIREBASE_PROJECT_ID ${FIREBASE_PROJECT_ID}
ENV FIREBASE_DATABASE_URL ${FIREBASE_DATABASE_URL}
ENV GOOGLE_ANALYTICS_TAG ${GOOGLE_ANALYTICS_TAG}

COPY --from=install node_modules node_modules
COPY . .

RUN yarn build

FROM node:12-buster as run

WORKDIR /usr/src/app
COPY --from=install node_modules node_modules
COPY --from=build .next .next
COPY . .

EXPOSE ${PORT}

CMD ["yarn", "start"]