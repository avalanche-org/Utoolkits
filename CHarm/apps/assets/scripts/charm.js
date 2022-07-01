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

__DOM_MANIPULATION__  :   
form[0].addEventListener("submit" , async evt => {
    evt.preventDefault()  
    formetadata  = form[0] 

    const payload  =  { 
        method :"POST" , 
        body:new FormData(formetadata)  
        
    } 
    const  stat  = await fetch("/", { ...payload})
     
    if ( stat.status == 200 )  
    {
        //!  send socket signal  to start processing  
        ua_socket_communication.emit("apply::autocorrection" , true ) 
        
        //! TODO :  ADD  SOME SPINER ANIMATION  ...  
    }
   
}) 

__SOCKET_COM_HANDLER__ :  
ua_socket_communication.emit("init", navigator.userAgent)  




