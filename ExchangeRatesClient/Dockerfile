FROM node:alpine

WORKDIR /ExchangeRatesClient/src/app

COPY . /ExchangeRatesClient/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]