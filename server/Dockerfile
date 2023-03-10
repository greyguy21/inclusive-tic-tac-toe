# node:alpine used as base image for Node.js application 
FROM node:alpine

# installs nodemon package globally -> monitoring and watching the backend express server
RUN npm install -g nodemon

# creating working directory named `app`
WORKDIR /app/

# copying all the tools and dependencies in package.json file to working directory `app`
COPY package.json . 

# installing all tools and dependencies in container
RUN npm install 

# copying all application source code and files to the working directory `app`
COPY . . 

# exposing the container to run on port 4000 
EXPOSE 4000 

# command to start Docker container for backend server application 
CMD ["npm", "run", "dev"]