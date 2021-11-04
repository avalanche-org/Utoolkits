#!/usr/bin/python3  

__author__= "Umar <jukoo> @github/jukoo" 

os        = __import__("os")  
sys       = __import__("sys")
argparse  = __import__("argparse")  
sbp       = __import__("subprocess")  

from   time import sleep 
from  threading import Thread , RLock  

lock = RLock()  

def py_verestric (__f__)    : 
    def passive_wrapper ()  :  
        LOOKUP_PYVER  : int   = 3   
        LOOKUP_PYVER^=sys.version_info.major  
        if LOOKUP_PYVER  : 
            sys.__stderr__.write(f"PYVER:not enable to run  {sys.argv[0] } due to incomptible  python version\n")  
            sys.exit(1)
        __f__() 
    return  passive_wrapper
     

is_dir           = lambda path: (False , True)[os.path.isdir(path)]
files_snap_shot  = lambda  path   : { _file for _file in os.listdir(path) if os.path.isfile(f"{path}/{_file}")}   


def  watcher_thread  ( path_ :  str  ) -> None  :
    sys.__stdout__.write(f"the watcher deamon is  start for {path_}\n")
    static_snap_shot  =  files_snap_shot(path_)
    while True:
        with  lock :  
            hot_snaps = files_snap_shot(path_)
            collections =  set(hot_snaps) 
            hot_snaps   ^= static_snap_shot 
            
            on_deletation  = static_snap_shot - collections  
            if  on_deletation : 
                sys.__stdout__.write(f"* deleted file -> {on_deletation}\n") 
                static_snap_shot&=collections 
                on_deleation  =  set() 
                continue 
            
            if  hot_snaps:   
                #new item detected
                #TODO : ??
                sys.__stdout__.write(f"* new file -> {hot_snaps}\n") 
               
                static_snap_shot|= hot_snaps 



def thread_manager  ( threads_pool : Thread ,  attr : str  ) : 
    for  thread in threads_pool  :  
        getattr(thread,attr).__call__()  
    

@py_verestric
def  main ()  :  
    stdargs =  argparse.ArgumentParser(prog="watcher" , description="""
    detecting  Changes inside folder   only  on new thing added 
    """) 
    stdargs.add_argument("--watch" ,"-w" , nargs="+" ,help="The  folder you want to Watch") 
    argv   = stdargs.parse_args()  
    
    path_  = argv.watch or  chr(0x2e)  
    
    for  p in  path_  :  
        assert  is_dir(p) , f"No such file(s) or  directory "   

    thread_capture  = [] 
    for p in path_ :
        print(p) 
        pool  = Thread(target=watcher_thread ,args=(p,)) 
        thread_capture.__iadd__([pool])  
        
    thread_manager (thread_capture , "start")  
    thread_manager (thread_capture , "join") 
    
    

if __name__.__eq__("__main__") : 
    try :  
        main() 
    except  KeyboardInterrupt as kbi : 
        sys.__stdout__.write("...\n") 
