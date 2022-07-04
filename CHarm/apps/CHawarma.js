/**  
 * copyright (c), 2022  Umar <jukoo>  jUmarB@proton.mail 
 */ 

const MAX_NMLIB= 0xf    

__nodemodules__ : 
[
    {log}= console , 
    {createServer , Server}  =  require("http"),  
    xpress      =  require("express"),  
    xpressfu    =  require("express-fileupload"), 
    io_socom    =  require("socket.io")?.Server ,  
    { sandbox , process_requestfile,  subprocess , autoclean }    =  require("./lib/utils") 
] = process.argv.splice(MAX_NMLIB)   


__app_setting__: 
app  = xpress() 
port = process.env?.PORT || 3000
filepathref =  (void function () { return }()) 


__midwarsetting__ :  
app
.set("view engine" ,  "ejs")
.set("views" ,`${__dirname}/views`)
.use(xpress.static(__dirname+"/assets")) 
.use(xpress.static(__dirname)) 
.use(xpress.json())
.use(xpress.urlencoded({ extended: true } ))
.use(xpressfu({}))


__server_instance__:  
server_handler =   Server(app)  


__root_request_handler__: 
app
["get"] ("/" , (__request , __responce) =>  {
    __responce.setHeader("Content-Type","text/html") 
    __responce.render("index.ejs")   
}) 
["post"]("/", (__request ,  __responce   , __next) => {
    const  Ufiles =  __request.files  
    filepathref = process_requestfile(Ufiles)  
    __responce.redirect("/")  
    //__responce.status(201).json( { msg : "data well received"})          
})
["get"]("/download/:dfile" , ( __request ,__responce , __next ) => {
         
    __responce.download(`${__request.params.dfile}` , __request.params.dfiles  , err  => { 
        if(err)  
        { 
            __responce.status(404).send( {  message  : `you tried to download an inexistant file `}) 
        }
    })
})
["use"]((__request , __responce , __next)   =>  tx.redirect("/"))

__server_listen__ : 
server_handler
["listen"](port  , "0.0.0.0"  ,  _=>   { 
    log (server_handler.address()) 

    //!auto generate the sandbox    
    sandbox()  
}) 

__SOCKET_XCHANGE__ :   
new io_socom(server_handler) 
["on"]("connection" ,   socket => {  
    socket.on("init"  ,  _  => log (_)) 

    socket.on("apply::autocorrection" ,   _   => { 
        subprocess(filepathref , socket)  
    }) 
    
    socket.on("charm::destroy" ,  metaObject =>  { 
        const [ generated_filename  , file_origine  ]  = metaObject  
        
        autoclean(generated_filename ,  file_origine)  
    })  
}) 



