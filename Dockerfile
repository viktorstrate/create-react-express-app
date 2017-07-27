FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "build" ]

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
