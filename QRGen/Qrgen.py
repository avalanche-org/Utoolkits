
sys  =  __import__("sys") 
qrc  =  __import__("qrcode")
os   =  __import__("os")  
arg  =  __import__("argparse") 
from PIL import Image 

__version__  : str =  "0.1a0" 
__description__: str = f""" 
Utility tool that Generate  Qrcode  from  given entry point 
Copyright(c) 2022 , Umar <jUmarB@protonmail.com> 
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
{sys.argv[0]} v{__version__} 
""" 


QRC_DEFAULT_SETTINGS  : dict =  { 
        "version": 1 , 
        "box_size":15, 
        "border": 1  
        } 

ALLOWED_MEDIA_FORMATS :list  = ["png" , "jpg", "jpeg"] 


def  center_logo_on_qrcode (  qrcode_img , logo_image  ,  *thumbnail_size) :
    """ 
    Center the Brand logo in the middle of QRcode generated  
    """
    brand_logo = Image.open(logo_image)  
    brand_logo.thumbnail(thumbnail_size) 
    
    height  = (qrcode_img.size.__getitem__(0) -brand_logo.size.__getitem__(0)) // 2   
    width   = (qrcode_img.size.__getitem__(1) -brand_logo.size.__getitem__(1)) // 2

    qrcode_img.paste(brand_logo ,  (height , width)) 
    return qrcode_img   


    

def  __entry_point () :  
    global qrc 
    qrc  = qrc.QRCode(**QRC_DEFAULT_SETTINGS)  
    
    stdarg  = arg.ArgumentParser(description=__description__) 
    stdarg.add_argument("-i" ,"--input"    ,help="data entrypoint")  
    stdarg.add_argument("-o" ,"--output"   ,help="output file name")   
    stdarg.add_argument("-f" ,"--format"   ,help="format of output file")  
    stdarg.add_argument("-c" ,"--fg-color" ,help="set color forground")  
    stdarg.add_argument("-l" ,"--add-logo" ,help="add logo to Qrcode")  
    stdarg.add_argument("-bs","--box-size" ,help="redefine the size of  QRCode image")  
    stdarg.add_argument("-B" ,"--border"   ,help="redefine the border of QRCode image")  
    #stdarg.add_argument("-x" ,"--xtimes"   ,help="generate qrcode X times")  
    stdarg.add_argument("-b" ,"--bg-color" ,help="set backgound color")   
    stdarg.add_argument("-v" ,"--version" , action="store_true",help=f"display {sys.argv[0]} program version")  
    
    args = stdarg.parse_args() 


    if args.version  : 
        sys.__stdout__.write(f"{__description__}\n") 
        sys.exit(0) 

    if  args.box_size  :  qrc.box_size =args.box_size   
    if  args.border    :  qrc.border   =args.border 

    output_filename =  None   
    fg_color        =  "#222222" 
    bg_color        =  "whitesmoke"
     
    #NOTE:By default it use png format otherwise  the given format passed...
    _ =  args.format is not None  and ALLOWED_MEDIA_FORMATS.__contains__(str(args.format).lower()) 
    output_file_format  = ("png" , str(args.format).lower())[_] 
   
    if not args.input :
        sys.__stdout__.write("no   input  found!\n")
        sys.exit(1) 
    
         
    if args.input : 
        qrc.add_data(args.input) 
        output_filename = f"{args.input}.{output_file_format}"

    if args.output : 
        output_filename = f"{args.output}.{output_file_format}"  
        

    if args.fg_color  : fg_color =  args.fg_color 
    if args.bg_color  : fg_color =  args.bg_color  
    

    qrc.make(fit=True) 
    
    qrcode_image = qrc.make_image(fill_color= fg_color, back_color=bg_color)
    brand_logo_img =  ("teranga.png" ,args.add_logo)[args.format is not None ]   
    
    if  args.add_logo :
        qrcode_image = center_logo_on_qrcode(qrcode_image , brand_logo_img , 60,60) 
   

    qrcode_image.save(output_filename)  

if __name__.__eq__("__main__")  : 
    __entry_point.__call__()  
