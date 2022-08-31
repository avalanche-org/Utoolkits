# Dockerfile  for Barcode  Generator    
# copyright  (c) 2022 , Umar <jUmarB@protonmail.com>  
# -----------------------------------------------------------------
# Barcode Generator   

FROM  node:18-alpine3.15   

MAINTAINER  Umar  jUmarB@protonmail.com <github/Jukoo>  

WORKDIR   / 

ADD  . /BarcodeGenerator

WORKDIR /BarcodeGenerator 

RUN npm install && npm install -g  pm2
RUN npm audit  fix --force   

ENV PORT=5000   

EXPOSE $PORT 

CMD  ["pm2-runtime" , "bcgen_server.js"] 
