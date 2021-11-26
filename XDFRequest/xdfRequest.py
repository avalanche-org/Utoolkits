#!/usr/bin/python3 
""" 
author  :  Umar  aka  Jukoo  <github.com > 
version : 0.1 
description  :  Make  request  on xlsx datasheet   

"""
from typing  import TypeVar ,  List
from  collections import namedtuple 

module  =  TypeVar("module")  

os : module  = __import__("os") 
sys: module  = __import__("sys")  
pip: module  = __import__("pip")

#TODO :  Auto  install pendas  
pd : module  = __import__("pandas")  
#NOTE  :   xlrd   not working ... e  
xlrd:module  = __import__("xlrd") 
ap  :module  = __import__("argparse")


file :str  =  "sample" 
vector     = List[str]  
#
NATIVE_HEADERS_LINE  :vector  = []  

def reformat_string  (  list_collection  : list   ,replace_sym : str =  chr(0x5f)) -> None  :
    for  i in   list_collection  :
        NATIVE_HEADERS_LINE.__iadd__([i]) 
        i = i.replace(" ",replace_sym)  
        yield i.lower.__call__()   
        

def  main ()->  None  : 
    assert os.path.exists( file )  , f"{file} :  is undefined"  
    
    xlsx_global_data_sheet  :   pd   = pd.read_excel(file) 
    xlsx_global_data_sheet.fillna(0)  
    headers_line            :   pd   = xlsx_global_data_sheet.columns.tolist() 
    reformat_string(headers_line) 
    headers_line = [  header for header in reformat_string(headers_line)] 
    xlsx_head_map  : namedtuple   = namedtuple('xlsx_head_map' ,  headers_line )
    
    cols_map   = xlsx_head_map(*NATIVE_HEADERS_LINE)  
    
    stdargs  = ap.ArgumentParser() 
    for index  , col  in  enumerate (headers_line)   :
        # each  column  of the xlsx sheet   is an argument  
        stdargs.add_argument(f"-{col}",f"--{col}"  , action='store_true'  , help=f"show  << { NATIVE_HEADERS_LINE.__getitem__(index)} >> column")   

    args  = stdargs.parse_args()
    match_arg  :vector = []  
    argv_collection   =  sys.argv[1:]  
    for  argv  in argv_collection   : 
        arg  : str  =  argv[1:] 
        if headers_line.__contains__(arg) : 
           index_of_arg  =  headers_line.index(arg) 
           match_arg.__iadd__([NATIVE_HEADERS_LINE.__getitem__(index_of_arg)])  
           
    print(xlsx_global_data_sheet[match_arg])
    pbeauty  : str  = str()   
    for index  ,  requested_column   in xlsx_global_data_sheet[match_arg].iterrows() :  
        for  i  in  range(0 , match_arg.__len__() )  :  
            pbeauty+=f"{requested_column[match_arg[i]]} "
            #print(requested_column[match_arg[i]] ,  end=" ")  
        print (pbeauty) 
        pbeauty = str() 

if  __name__.__eq__("__main__") :  
    main.__call__() 
