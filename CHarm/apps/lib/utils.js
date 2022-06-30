
__nodemodules__: 
[  
    {log} = console,
    {access ,  constants   ,  mkdir} =  require("fs"), 
    path =  require("path") 
]=  process.argv.splice(0xf) 

__base_root_sandbox__ : 
sandbox_dir=`${path.join(__dirname , '..')}/sandbox` 

module
["exports"] =  {  
    //! Create sandbox 
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

    }
}  
