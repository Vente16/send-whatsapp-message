FROM node:18-alpine

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium


WORKDIR /home/node/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY yarn.lock .

RUN npm install -g typescript
RUN yarn install

COPY . .

EXPOSE 3001
ENV NODE_ENV production
CMD tsc && node dist/app.js