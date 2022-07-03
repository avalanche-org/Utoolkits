/** 
 * Utils  for CHarm  
 * copyright(c) 2022 , Umar  <jUmarB@protonmail.com>  
 */ 

__nodemodules__: 
[  
    {log} = console,
    {access ,  constants   ,  mkdir , readdir } =  require("fs"), 
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
    
    ["process_requestfile"] : uploaded_file_metadata =>  {
        if  (! uploaded_file_metadata?.fupload )  return  

        const  {  fupload }   = uploaded_file_metadata
      
        const  filename_location  = `${sandbox_dir}/${fupload.name}`
        fupload.mv(filename_location)  
        return filename_location  
        
        //module.exports["#subprocess"](filename_location) 
    } ,  
    
    ["subprocess"] : ( filename_target ,  socket )  =>   { 
        log("scripte location " , script_loc)  
        log("file path target " ,  filename_target )
        if  ( filename_target ==  ( void function () {return}()) ) 
        {
            log("is undefined") 
            socket.emit("empty" , null) 
        }
        filename_shortcut = filename_target.split("/").at(-1)  
        log("fshc" , filename_shortcut) 

        cmdline =`python3 ${script_loc} -f ${filename_target}` 
        log(cmdline)
        cmdproc = exec(cmdline) 
        cmdproc.on( "close" ,  ( exit_code , signal ) =>  { 
            log("exit code " , exit_code )  
            //! TODO :  SEND EVENT ON FAILLURE TO ALERT USER
            if ( exit_code == 0 ) 
            {
                readdir (path.join(__dirname , "../")   , {withFileTypes  : true } , ( error ,  dirent  ) => {
                    if  (error )  reject (error )
                    let file =  dirent.filter ( dirent =>  dirent["isFile"]())
                    .filter(file =>  file.name.startsWith("CH@")) 

                    socket.emit("charm::done" , file.at(0).name )   

                })
            }
        })
        
    }  

}  
