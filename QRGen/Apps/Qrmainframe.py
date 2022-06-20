#!/usr/bin/python3  

""" 
QRgentoolkit  :  Live editing Qrcode  ... 
copyright(c) , 2022  Umar <jUmarB@protonmail.com>  
LICENCE : ??  
"""
from  tkinter import *  
from  enum  import Enum  ,  unique 

Qrgentk_logical_map  : dict =  {}  

@unique  
class  MainFrame_DEFCONF(Enum): 
    TITLE : str =  "QR Code Generator"
    XYDIM : str =  "800x600" 
    RESIZABLE   : tuple =  ( False ,False )  


def main_frame_init(root_mf) : 
    Tk.__init__(root_mf) 
    #! Initialize  enum configuration  
    for  mfdef_enumerate_property  , value in root_mf.ld_mfconfig.items()  : 
        setattr(root_mf,  mfdef_enumerate_property  , value)
    
    #!AUTO LOAD CONFIG  
    root_mf.title(root_mf.TITLE)  
    root_mf.geometry(root_mf.XYDIM) 
    root_mf.resizable(*root_mf.RESIZABLE)  

@property 
def load_mfconfig(root_mf)  :  
    
    property_members  , values  = MainFrame_DEFCONF._member_names_ , MainFrame_DEFCONF._value2member_map_.keys() 
    return  dict(zip(property_members , values ))   



Qrgentk_logical_map["main"] = {  
            "__init__":main_frame_init , 
            "ld_mfconfig" :load_mfconfig
            } 

root  =  type("root_mf" ,(Tk,),Qrgentk_logical_map["main"])  

