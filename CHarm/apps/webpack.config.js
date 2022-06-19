/** 
 * default  configuration of webpack   
 */ 

const  { resolve }  = require("path")  

const  initial_script  =  `./assets/scripts/charm.js`
const  bundle_dir      =  `./assets/scripts/dist`

module.exports =   {  
    mode : "development", 
    
    entry : {
        app : initial_script 
    } , 
    output : {
        filename   :  "charmain_build.js", 
        path       :  resolve(__dirname  ,  bundle_dir)  
    }, 
    devServer :   { 
        static   :  { directory : __dirname  } , 
        compress : true , 
        port : process.env?.PORT ||  3000 
    } 
}    

