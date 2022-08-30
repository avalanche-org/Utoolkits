/*
 * barcode  generator  module 
 * webpack  configuration  
 * Copyright (C) , 2022 Umar <jukoo> jUmarB@protonmail.com  
 */

const { resolve } = require("path")  

__SRC_SCIRPT__ :  
target_file = `./assets/js/bcgen.js`
bundle_directory  = `./assets/js/dist`  
output_file = "bcgen_builder.js"

module.exports =  { 

    mode   : "development" , 
    ["entry"]:
    { 
        app  : target_file 
    } , 
    ["output"]:
    { 
        filename  : output_file, 
        path :resolve(bundle_directory) 
    } , 
    ["devServer"] :  {  
        static  : {directory  : __dirname } , 
        compress: true , 
        port    : process.env?.PORT || 5000   
    }  
} 
