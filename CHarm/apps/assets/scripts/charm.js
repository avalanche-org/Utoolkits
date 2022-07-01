/**
 * charm  for CHarm  
 * copyright(c) , 2022 , Umar <jUmarB@protonmail.com  
 */


__WEB_SOCKET_USER_AGENT__ :  
ua_socket_communication  =  io()  

const _ =  document ,  {log} =  console , 
[  
    applycharm
    ,form 
] = [
    _.querySelector(".autocorrect")   // applycharm 
    ,_.getElementsByTagName("form")       // form  
]

log(form)  
__DOM_MANIPULATION__  :   

form[0].addEventListener("submit" , evt => {
    evt.preventDefault()  
    formetadata  = form[0]  
    const payload  =  { 
        method :"POST" , 
        body:new FormData(formetadata)  
        
    } 
    log(payload) 
    const  status = fetch("/", { ...payload}) 
    console.log(status) 
    
}) 

__SOCKET_COM_HANDLER__ :  
ua_socket_communication.emit("init", navigator.userAgent)  




