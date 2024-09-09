FROM node:gallium-alpine

WORKDIR /app

COPY ./package.json ./
#! rm
run ls

RUN npm install -f

COPY . .

ENV NEXT_PUBLIC_ORPHANAGE_BACKEND_KEY="09773711f3cd4a50803d85bca6a11ccc"
ENV ORPHANAGE_BACKEND_KEY="09773711f3cd4a50803d85bca6a11ccc"
ENV NEXT_PUBLIC_ORPHANAGE_BACKEND_HOST=https://account-server.gocharity.com.ng
ENV ORPHANAGE_BACKEND_HOST=https://account-server.gocharity.com.ng
ENV NEXT_PUBLIC_GOCHARITY_API_DOMAIN=https://account.gocharity.com.ng
ENV GOCHARITY_API_DOMAIN=https://account-server.gocharity.com.ng
ENV API_DOMAIN=account.gocharity.com.ng

EXPOSE 3000

CMD ["npm", "run", "docker:start"]