

const _ =  document 

const  [  
    applycharm
    ,form

] = [
    _.querySelector(".autocorrect")   // applycharm  
    ,_.getElementsByTagName("form")      // form  
    ]




const   charm    = {  

    main  () {  
        applycharm.addEventListener("submit" , evt => {
            evt.preventDefault()  
            const payload  =  { 
                method :"POST" , 
                body:new FromData(form) 
            }
            const  status = fetch("/", { ...payload}) 
            console.log(status) 
        }) 
    } 
}



