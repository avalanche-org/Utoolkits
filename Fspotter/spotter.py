#!/usr/bin/python3  

__author__ :str = "Umar <jukoo> @github.com/jukoo"  

import  os  ,sys, subprocess , argparse , logging as log  
from typing    import TypeVar , List , Tuple  , Any , Set 
from time      import sleep
from enum      import Enum  , unique  
from threading import Thread , RLock
from inspect   import getmembers , isfunction
from configparser  import ConfigParser  

@unique  
class  ConStatic  ( Enum ) : 
    REQUIRE_PYVERS  : int   = 3 
    THREAD_LOCK     : RLock = RLock() 
    INI_CFG_FILE    : str   = "config.ini"
    DEF_DIR_WATCH   : str   = chr(0x2e) 


def  Const ( member_attr  : str  )->  Any :  
    if  not ConStatic.__contains__(getattr(ConStatic , member_attr))  :  
        sys.__stderr__.write(f"{member_attr} not  on ConStatic\n")
        sys.exit(1)  
        
    return  getattr(ConStatic ,  member_attr).value


func = TypeVar("function") 
Vec  = List[Any] 


class Spotter() : 
    
    """ if  the  ini config file was set the attributes  will be filled """  
    MODULE          :str = None 
    BEHAVIOR        :str = None 
    DEF_DIR_WATCHER :str = Const("DEF_DIR_WATCH")

    MODULE_EXT      :List[str] =["py"] 

    def __init__ (self ,  *argv  )  : 

        self._path_of_directories= list( *argv )  
        self.is_directory()  
     

    @classmethod  
    def py_version_restric ( cls  , start_up_definition : func   ) : 
        """ wrapper fpython  version  restrict 
            check python  version  on start up  
            start_up_definition  :function  definition  
        """
        def py_version_ctrl ()  :

            py_version_isoutofdate  =  Const("REQUIRE_PYVERS") ^  sys.version_info.major

            if  py_version_isoutofdate: 
                raise  RuntimeError(f"not  enable to run {sys.argv.__getitem__(0)[2:]}  due to incompatible python version ")

            start_up_definition.__call__() 

        return py_version_ctrl


    @property
    def  path_of_directories   ( self ) -> Vec  : 
         """ collection  of  directories path  """

         return  self._path_of_directories


    @path_of_directories.setter 
    def path_of_directories ( self ,  *argv )->  None  :

        self._path_of_directories  = list(argv)  


    def is_directory (self) ->  bool : 
        """  is a directory  
        check if is a  valid directroy"  
        return  : boolean  
        """

        for  directory in self._path_of_directories  : 

            if  not  os.path.isdir(directory) :
                raise IsADirectoryError(f"{directory} : is not a directory ")  
            
        return  True  


    @classmethod
    def load_default_configuration  ( cls,   config_ini_file  :str   = Const("INI_CFG_FILE") )  -> None :
        """ load  ini configuration file
            to help  the script start processing  without   using  extra args  ...  
        """

        config_ini  : ConfigParser  =  ConfigParser()
        config_ini.read(config_ini_file)
        cls.MODULE , cls.BEHAVIOR , cls.DEF_DIR_WATCHER = _ = ( config_ini["Entry"][attr]   for attr  in  config_ini["Entry"])  
        

    @classmethod 
    def call_module_to_set_behavior  ( cls   , *args , **kwargs ) -> None or  func  : 
        """  
        load an existant module  form config file ini 
        and call  the behavior method  to  do treatment  
        """

        if   not  cls.MODULE   or  not os.path.exists(cls.MODULE)  : 
             return None 

        explode  =  cls.MODULE.split("/") 
        path , module  =  explode[:-1],*explode[-1:] 
        path =  "/".join(path)  
        sys.path.append(path) 
        module_extention  =  module.partition(".")[-1] 
            
        if  cls.MODULE_EXT.__contains__(module_extention): 
            sys.__stdout__.write(f"Python script load \n") 
            module = module[:-(1+module_extention.__len__())]  
            
        mod__  =  __import__(module)
            
        definition_functions   =  [  f[0] for f in  getmembers(mod__) if isfunction(f[1]) ] 
            
        if  definition_functions.__contains__(cls.BEHAVIOR):
            return  getattr(mod__ , cls.BEHAVIOR) 
    

    def directory_snapshot ( self   , single_directory_path : str )  -> Set[str] :
        """ 
        take a snapshot of the current  directory 
        single_directory_path : str     path of the directory 
        return  Set[str] 
        """
        return  { file  for file in os.listdir(single_directory_path) if os.path.isfile(f"{single_directory_path}/{file}")}

    def spotter_process ( self   ,directory_path  :str , behavior : func = None,   *argv , **kwargs)  -> None : 
        """ 
        watch  inside directory  and look for  add or delete  event  on files   
        directory_path  : str    path of the directory  
        extra  args <*argv & **kwargs ) it's for the alghorithme behavior  that you want to  
        make process on event trigger  
        retrun None  
        """ 

        sys.__stdout__.write(f"Spotter  Demon  running for {directory_path}\n")  
        init_directroy_snapshot  : Set[str]  = self.directory_snapshot(directory_path) 
        
        while True  : 

            with  Const("THREAD_LOCK"):

                hot_snaphot         = self.directory_snapshot(directory_path)  
                files_collections   = set( hot_snaphot )  
                hot_snaphot ^=init_directroy_snapshot
               
                file_deleted   = init_directroy_snapshot - files_collections  
                if  file_deleted: 
                    sys.__stdout__.write(f"{list(file_deleted)[0]} > deleted from  {directory_path}\n")
                    sys.__stdout__.flush()  
                    init_directroy_snapshot ^= file_deleted  
                    
                    behavior(file_deleted ,*argv ,  **kwargs)
                    
                    file_deleted  =  None   
                    continue 

                if  hot_snaphot:
                    new_file          : str  = list( hot_snaphot).__getitem__(0)
                    new_file_location : str = f"{directory_path}/{new_file}"  
                    sys.__stdout__.write(f"new file detected {new_file} on  {directory_path} \n")
                    sys.__stdout__.flush()
                    
                    behavior(new_file_location  , *argv , **kwargs )  
                    
                    #NOTE : update the init snapshot  
                    init_directroy_snapshot |= hot_snaphot   


    def thread_manager  ( self ,  thread_queues : Vec ,  attr  : str  ) -> None :
        """
        start  and join thread  using string through attribute  of Thread  
        """

        for  thread_queue in thread_queues  :
            getattr(thread_queue,attr).__call__()  
        
    def run ( self ,  behavior:  func=None)  -> None  :   
        """ run  Spotter 
            each   directory  path is  puted in single thread 
            to  watch each directory independently  
            return  None  
        """ 

        thread_queues  : Vec  = [] 
        
        for each_directory_path in self.path_of_directories : 
            thread=  Thread(target=self.spotter_process , args=(each_directory_path, behavior))  
            thread_queues.__iadd__([thread])  
            
        self.thread_manager(thread_queues,  "start")  
        self.thread_manager(thread_queues,  "join")  



@Spotter.py_version_restric
def main  ()  :

    Spotter.load_default_configuration()
    define_behavior  =  Spotter.call_module_to_set_behavior() 

    stdargs  = argparse.ArgumentParser(prog=sys.argv[0][2:] , description= "detecting  files  <add | delete> inside  directory ") 
    stdargs.add_argument("--watch" , "-w"  , nargs="+" , help="Watch  the folder (s)") 

    args  =  stdargs.parse_args()
    
    watched_dirs =  args.watch  or   [Spotter.DEF_DIR_WATCHER]

    print(watched_dirs) 
    spotter  :  Spotter   = Spotter(watched_dirs)   
    
    spotter.run( define_behavior )   
    

if __name__.__eq__("__main__") :  
    main.__call__()  
