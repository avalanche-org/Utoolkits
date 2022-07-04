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
    ,errmsg 
] = [
    _.querySelector(".autocorrect")   // applycharm 
    ,_.getElementsByTagName("form")       // form  
    ,_.querySelector(".active") 
    ,_.querySelector(".error") 
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
        ua_socket_communication.emit("apply::autocorrection" , true ) 
        
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

ua_socket_communication.on("charm::done" , async  metaObject   => { 
    stop_animation_loader()
    if  ( !errmsg.classList.contains("hidden")) 
    { 
        errmsg.classList.add("hidden") 
        //! get back default  linera gradien 
        _.body.style.backgroundImage="linear-gradient(to bottom right , teal, yellow)"
    }
    const assets  =  metaObject.at(0)   
    const  retrive_native_url  =  await fetch(`/download/${assets}`) 
    let  hidden_link  = _.createElement('a') 
    hidden_link.href =  retrive_native_url.url   
    hidden_link.download = assets 
    _.body.appendChild(hidden_link)
    hidden_link.click() 
    hidden_link.remove()  
    setTimeout ( _=>  { ua_socket_communication.emit("charm::destroy" ,  metaObject) }  ,2000)  
}) 

ua_socket_communication.on("charm::empty" ,  _ => stop_animation_loader())
ua_socket_communication.on("charm::error" ,  trace_error  =>  { 
    const { exit_code  , signal }  = trace_error   
    if  (errmsg.classList.contains("hidden"))  
    {
        errmsg.classList.remove("hidden") 
        errmsg.textContent=`Un Probleme a ete detecte ! \ncode d'echec : ${exit_code}\n signal :  ${signal}`
        
    }
    stop_animation_loader() 
    _.body.style.backgroundImage="linear-gradient(to top left , red , yellow)"
})

