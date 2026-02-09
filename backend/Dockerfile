FROM node:20-slim

WORKDIR /usr/src/app

# Install curl (needed for healthcheck)
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "index.js"]
