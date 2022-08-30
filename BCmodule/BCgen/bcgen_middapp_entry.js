/*
 * barcode  generator module
 * This  module  handle  middleware  call  
 * and process  incomming request  
 * Copyright (C) , 2022 Umar <jukoo> jUmarB@protonmail.com    
 */

const LIMIT_MODCALL =  process.argv[1]  | 0b0101   
const  [  
    xpress  = require("express")
] = process.argv.splice( LIMIT_MODCALL )  

const  { log } = console  
const bcgen_app  = xpress() 
const bcgen_midctlr   = {  
    
    process_user_agent_request  : ( _request  , _respond  , _next ) => { 
        const   origin_request  = _request.rawHeaders.at(3)  
        const   [user_agent , version ] = origin_request.split("/")  
        log(`User agent ${user_agent} version ${version}`) 
        _next() ;  
    } ,  
    
    stack_middleware_setting  :  () =>  {  
        
        bcgen_app  
        ["use"](xpress.json()) 
        ["use"](xpress.urlencoded({extended:true}))
        ["set"]("view engine" , "ejs") 
        ["set"]("views" ,__dirname)  
        ["set"]("views" ,`${__dirname}/view`)  
        ["use"](xpress.static(`${__dirname}/assets`)) 
        ["use"](xpress.static(__dirname)) 
        ["use"](bcgen_midctlr.process_user_agent_request)   

    } 
}  

module.exports =   {  bcgen_midctlr , bcgen_app }   
