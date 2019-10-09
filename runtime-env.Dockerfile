# running
FROM node:10-alpine

# misc
ENV PORT 8080
ENV NODE_ENV=production

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# copying in built app
COPY --from=ihsw/venture-co-next/build /srv/app/src/.next ./src/.next
COPY --from=ihsw/venture-co-next/build /srv/app/node_modules ./node_modules

CMD ["npm", "run", "-s", "start-dev"]
