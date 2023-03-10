# node:alpine used as base image for Node.js application 
FROM node:alpine

# creating working directory named `app`
WORKDIR /app/

# copying all the tools and dependencies in package.json file to working directory `app`
COPY package.json . 

# installing all tools and dependencies in container
RUN npm install 

# copying all application source code and files to the working directory `app`
COPY . . 

# exposing the container to run on port 3000, 3001 
EXPOSE 3000 3001 

# command to start Docker container for backend server application 
CMD ["npm", "start"]