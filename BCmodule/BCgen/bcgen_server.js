/* 
 * barcode generator module  
 * server module 
 * 
 * Copyrith  (C)  ,2022 Umar <jukoo> jUmarB@protonmail.com  
 */ 


const   [  
    http_demon  = require ("http")  ,
    bcmidentry  = require ("./bcgen_middapp_entry") 
] =process.argv.splice(3)  

const  { createServer  , Server  }  = http_demon  , 
       { bcgen_midctlr  ,bcgen_app } = bcmidentry ,
       port = process.env?.PORT  ||  5000

__BCMIDCTLER_H :bcgen_midctlr.stack_middleware_setting() 

const  bcserver   =  {  
    
    server_start : () =>  Server(bcgen_app)  , 

    route : server_instance   => {

        bcgen_app 
        ["get"]("/",(request , response ) => {
            response.setHeader("Content-Type", "text/html") 
            response.render("index.ejs")  
        })
       
        ["listen"](port ,  _=> {process.stdout.write(`server running  on ::${port}\n`)})  
    }
} 

Object.freeze(bcserver)  
bcserver.route(bcserver.server_start()) 


    
