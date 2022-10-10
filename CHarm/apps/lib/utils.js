/** 
 * Utils  for CHarm  
 * copyright(c) 2022 , Umar  <jUmarB@protonmail.com>  
 */ 

__nodemodules__: 
[  
    {log} = console,
    {access ,  constants   ,  mkdir , readdir  ,rm} =  require("fs"), 
    path =  require("path") , 
    {exec} = require("child_process")
]=  process.argv.splice(0xf) 

//! NOTE : Static  configuration  
__base_root_sandbox__ : 
sandbox_dir=`${path.join(__dirname , '..')}/sandbox` 
script_loc  = path.join(__dirname , "../../src/CHarm.py")


module
["exports"] =  {  
    /**  
     * sandbox  : create  sandbox folder ! store uploaded  files 
     * @param  string - sandbox  : folder name   by default is sandbox  
     * @return 
     **/
    ["sandbox"]  : (sandbox="sandbox")  => { 
        access(sandbox , constants.F_OK  , e_no_accss => { 
            if ( e_no_accss ) 
            {
                //!  create the directory
                mkdir(sandbox_dir  , constants["S_IRWXU"] ,mkderr =>   { 
                    if (mkderr) 
                    {
                        process.stderr.write(`not enable to create sandbox directory\n`) 
                    }
                    process.stdout.write(`Creating sandbox directory  -> ${sandbox_dir} \n`) 
                })
            }
        })

    } ,  
    
    /** 
     * process_requestfile : move  uploaded file  to  sandbox directory 
     * @param  Object  uploaded_file_metadata  -  global object  that contain  all information about  the  file  
     * @return string - location  path where  the file  is  stored  
     */
    ["process_requestfile"] : uploaded_file_metadata =>  {
        if  (! uploaded_file_metadata?.fupload )  return  

        const  {  fupload }   = uploaded_file_metadata
      
        const  filename_location  = `${sandbox_dir}/${fupload.name}`
        fupload.mv(filename_location)  
        return filename_location  
        
    } ,  
    
    /** 
     * subprocess  :  processing  upload  file   
     * @param  string  :  filename_target  -  the target file 
     * @param  object <socket>  - socket  handler  to  emit  event  
     */  
    ["subprocess"] : ( filename_target ,  socket )  =>   { 
        
        if  ( filename_target ==  ( void function () {return}()) ) 
        {
            socket.emit("charm::empty" , null) 
        }
        
        filename_shortcut = filename_target.split("/").at(-1)  

        cmdline =`python3 ${script_loc} -f ${filename_target}` 
        cmdproc = exec(cmdline) 
        cmdproc.on( "close" ,  ( exit_code , signal ) =>  { 
            
            log("exit code " , exit_code )  
           
            switch  (exit_code) 
            {
                case  0  : //!  on success   
                    readdir (path.join(__dirname , "../")   , {withFileTypes  : true } , ( error ,  dirent  ) => {
                        if  (error)  throw  error  
                        let corrected_file   =  dirent.filter ( dirent =>  dirent["isFile"]())
                            .filter(file =>  file.name.startsWith("CH@")) 
                        
                        // that trigger automaticly  the download  event  ! 
                        socket.emit("charm::done" ,  [ corrected_file.at(0).name , filename_target] )    
                }) 
                    break 
               default  : 
                    socket.emit("charm::error" ,   {  exit_code ,  signal  } )  
                    break 
            }

        })
        
    }, 
    
    /*  autoclean : clean  automaticly the uploaded file  and  generated file  
     *              when the is downloaded  
     *  @param   string  :  generated file  come from the  python script 
     *  @param   string  :  file origine uploaded  by the user end point used to generate 
     *                      <generated_file>  
     */
    ["autoclean"]  :   (  generated_file  , origne )  => {
        
        const destroy  = [  generated_file , origne ]  
        for (let  file   of destroy )  
        {
            rm(file , destroy_error =>  {  if (destroy_error) throw destroy_error })  
        }
    }  
}  
