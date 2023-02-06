FROM node:13.8.0-alpine

#Set working directory to /app
WORKDIR /app


#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

#Copy .env_qa as .env
COPY .env_qa /app/.env

#Copy package.json in the image
COPY package.json ./

#Run npm install command
RUN npm install


#Copy the app
COPY . ./

EXPOSE 8895

#Start the app
CMD ["node", "./src/server.js"]
