# running
FROM node:10-alpine

# misc
ENV PORT 3000
ENV NODE_ENV production
ENV PUBLIC_API_ENDPOINT localhost:8080
ENV SERVER_API_ENDPOINT localhost:8080

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# copying in built app
COPY --from=ihsw/venture-co-next/build /srv/app/src/.next ./src/.next
COPY --from=ihsw/venture-co-next/build /srv/app/node_modules ./node_modules

CMD ["npm", "start", "-s"]
