/**  
 * copyright (c), 2022  Umar <jukoo>  jUmarB@proton.mail 
 */ 


__nodemodules__ : 
[ 
    {createServer , Server}  =  require("http"),  
    xpress      =  require("express")  
] = process.argv.splice(0xf)   



__app_setting__:

app  = xpress() 
port = process.env?.PORT || 3000   


__midwarsetting__ :  
app
.set("view engine" ,  "ejs")
.set("views" ,`${__dirname}/views`)
.use(xpress.static(__dirname+"/assets")) 
.use(xpress.static(__dirname)) 
.use(xpress.json())
.use(xpress.urlencoded({ extended: true } ))
//.use(xpressfu({}))


__server_instance__:  
server_handler =   Server(app)  

__root_handler__: 
app
["get"] ("/" , (__request , __responce) =>  {
    __responce.setHeader("Content-Type","text/html") 
    __responce.render("index.ejs")   
})
["post"]("/", (__request ,  __responce   , __next) => {
    group(__request.body)    
    __responce.status(201).json( { msg : "data well received"})          
})



__server_listen__ : 
server_handler
["listen"](port  , "0.0.0.0")



