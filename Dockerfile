FROM node:18 as builder 

WORKDIR /vote

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . .

RUN pnpm install

RUN pnpm build

FROM node:alpine as runner

WORKDIR /vote

COPY --from=builder /vote/build ./build

COPY --from=builder /vote/package.json .

CMD [ "node", "build" ]

EXPOSE 3000