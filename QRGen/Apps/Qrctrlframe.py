#!/usr/bin/python3 

from  tkinter  import  *  
from  Qrmainframe import root  as mf 

def ctrl_frame_init(Qrctrlframe ,  root_container) : 
    Frame.__init__(Qrctrlframe, root_container ) 
   
    options = { "padx" :5 ,"pady": 0}   

    Qrctrlframe.label = Label(Qrctrlframe  , text="Put your string data  here ->") 
    Qrctrlframe.label.grid(column=0 , row=0 , sticky='w' , **options )  

    Qrctrlframe.input_string  = StringVar()  
    Qrctrlframe.lable_input   = Entry(Qrctrlframe, textvariable=Qrctrlframe.input_string , width=60)
    Qrctrlframe.lable_input.grid(column=1 , row=0 , sticky='w' , **options )  

    Qrctrlframe.action_btn   =Button(Qrctrlframe, text="Generate Qrcode") #NOTE  no action yet 
    Qrctrlframe.action_btn.grid(column=2 , row=0 ,sticky='w',**options)

    Qrctrlframe.grid(column=0, row=0, padx=5, pady=5, sticky="nsew")

methods  = { 
        "__init__" : ctrl_frame_init   
        } 

Qrctrlframe =  type("Qrctrlframe" , (Frame ,) ,methods)  


app=mf()   

Qrctrl = Qrctrlframe(app) 
app.mainloop() 
app.destroy()  
