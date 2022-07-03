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
    ,activeloader 
] = [
    _.querySelector(".autocorrect")   // applycharm 
    ,_.getElementsByTagName("form")       // form  
    ,_.querySelector(".active")  
]
log(activeloader) 
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
        if (!activeloader.classList.contains("dimmer")) 
            activeloader.classList.add("dimmer")
    }
  
}) 

stop_animation_loader  =  () => {  
    if (activeloader.classList.contains("dimmer")) 
        activeloader.classList.remove("dimmer") 
}

__SOCKET_COM_HANDLER__ :  
ua_socket_communication.emit("init", navigator.userAgent)  
ua_socket_communication.on("charm::done" , async assets => { 
    stop_animation_loader()
    //! todo : auto download
    const  retrive_native_url  =  await fetch(`/download/${assets}`) 
    let  hidden_link  = _.createElement('a') 
    hidden_link.href =  retrive_native_url.url   
    hidden_link.download = assets 
    _.body.appendChild(hidden_link)
    hidden_link.click() 
    hidden_link.remove() 
}) 
ua_socket_communication.on("empty" ,  ec => stop_animation_loader())



