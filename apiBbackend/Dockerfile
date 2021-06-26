FROM node:12.16.3-slim
WORKDIR /code
COPY package.json ./
RUN npm install
COPY . .
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh
CMD npm start
