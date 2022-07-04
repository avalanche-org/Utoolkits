#Dockerfile for  CHarm 
#Copyright (c) 2022, Umar <jUmarB@protonmail.com>  

FROM  node:18-bullseye
MAINTAINER  Umar  <jUmarB@protonmail.com>  

RUN apt update --assume-yes  && apt install python3 python3-pip --assume-yes  

ADD  . /CHarm
WORKDIR /CHarm 

RUN python3 -m pip install -r src/requirements.txt  

WORKDIR apps
RUN npm install  && npm install  -g pm2 
ENV PORT=7000 
EXPOSE $PORT 

CMD ["pm2-runtime" , "CHawarma.js"] 
