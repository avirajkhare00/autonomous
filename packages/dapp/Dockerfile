FROM node:8

COPY ./packages/dapp /monorepo/packages/dapp
COPY ./packages/typings /monorepo/packages/typings
COPY package.json /monorepo
COPY tsconfig.json /monorepo
COPY tslint.json /monorepo
COPY .yarnrc /monorepo

WORKDIR /monorepo/packages/dapp

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]
