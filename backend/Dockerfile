FROM node:18-alpine
WORKDIR /app [cite: 148, 153]
COPY package.json package-lock.json ./
RUN npm install --production
COPY src/. ./src/ [cite: 156]
EXPOSE 3000
CMD [ "npm", "start" ]

