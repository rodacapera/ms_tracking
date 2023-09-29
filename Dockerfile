FROM node:16
WORKDIR /app
COPY package*.json ./
RUN yarn install 
COPY . . 
RUN yarn build
# Expose the port that the application listens on.
EXPOSE 3002

# Run the application.
CMD yarn start:dev
