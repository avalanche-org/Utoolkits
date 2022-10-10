#!/usr/bin/python3 

""" 
Correction and Harmonization   
Copyright(c) 2020 2021  , Arame Thiam <arramthiamm@gmail.com> 
Copyright(c) 2022 Umar  <jUmarB@protonmail.com>  
""" 

os  = __import__("os") 
sys = __import__("sys") 
pd  = __import__("pandas")  
arg = __import__("argparse") 

#TODO  : Put this  in config file  

# Needed variables  to build  requested  data frame  

required_vars = [
            'nom_patient','date_prelevement','no_ipd',
            'no_terrain','age_annees','adresse',
            'sexe','telphone'
            ]

def __unidecode_error_hdl ( __target_F  )   : 
    
    def  code_hdl_byte  (  *args , **kwargs )  : 
        try :  
            __target_F(*args , **kwargs )
        except  UnicodeDecodeError  : 
            kwargs.__setitem__("encoding",  "unicode_escape")  
            __target_F(*args  ,**kwargs) 
        
    return code_hdl_byte


def CHARM__  ( charm  , spreadsheet  )  :
    charm._xlsx  = spreadsheet 
    charm._headers = None
    charm.automake_df()  
    
@__unidecode_error_hdl  
def automake_df(charm ,  sep=";" , low_memory =False , **kwargs )   : 
    sprdsheat_dataframe =  pd.read_csv( charm._xlsx , sep=sep , low_memory = low_memory,**kwargs)  
    charm._headers  = sprdsheat_dataframe.columns.values  
    source_file  = charm._xlsx  
    charm._xlsx =  sprdsheat_dataframe
    
@property  
def headers (charm )  : 
    return  charm._headers  

@property 
def xlsx (charm ) : 
    return  charm._xlsx

def select (charm , colname_target  : str  ,df_index_repeat_frequency_filter : int =None ,  condition  :str  = ">=") -> pd.core.frame.DataFrame: 
    """
    """
    allowed_condition_string_statement  :   list = [  ">=" ,"<" , ">" , "<=" ]  
    assert allowed_condition_string_statement.__contains__(condition)   
    
    if  not charm.headers.__contains__(colname_target)  :
        raise  ValueError(f"{colname_target} is not defined")  

    freq_frame =  charm._xlsx[colname_target].value_counts().to_frame()  
     
    if  not df_index_repeat_frequency_filter  : 
        return freq_frame  
    
    talble_index_frame =[ 
            freq_frame[freq_frame[colname_target].__ge__(df_index_repeat_frequency_filter)]  
            ,freq_frame[freq_frame[colname_target].__lt__(df_index_repeat_frequency_filter)]  
            ,freq_frame[freq_frame[colname_target].__gt__(df_index_repeat_frequency_filter)]  
            ,freq_frame[freq_frame[colname_target].__le__(df_index_repeat_frequency_filter)]  
            ]  
    cond_pos  =  allowed_condition_string_statement.index(condition)  
    index_frame = talble_index_frame[cond_pos]   

    return  pd.DataFrame( {colname_target : index_frame.index })  



def build_subdf ( charm ,  *args )  : 
    args =  set(args) 
    
    allowed_header = set (charm.headers) 
    assert  allowed_header & args
    return  charm._xlsx[list(args)]  


_Mcharm  :dict =  {  
        "__init__"  :  CHARM__ , 
        "automake_df"   :  automake_df  ,
        "headers"   :  headers, 
        "xlsx_df"   :  xlsx, 
        "select"    :  select , 
        "build_subdf" : build_subdf
        } 


CHarm =  type("charm" ,(), _Mcharm)  

def main  ()  :  

    stdarg = arg.ArgumentParser() 
    stdarg.add_argument("-f" , "--file" , help="The spreadsheet file target ")  
    #TODO  :  add  more argument  that permit to show individual column name  

    argv = stdarg.parse_args()
    
    sprdsheat  = argv.file  
    if  sprdsheat is  None :  
        sys.exit(1) 
    
    filename =  sprdsheat.split("/")[-1]  
    
    charm =  CHarm(sprdsheat) 

    epids  =  charm.select("no_terrain" ,  2  , ">=") 
    
    #epids_frequency_gt2 = epids[epids["no_terrain"].__ge__(2)]   
    #epids = pd.DataFrame({"no_terrain": epids_frequency_gt2.index } )  

    # create a new datafram based  on  @required_vars  
    df   =  charm.build_subdf(*required_vars)

    
    def build_rowless_df  ( df ,  colname , list_of_values  )  : 
        chunck  = [] 
        for index in list_of_values  :  
            row_df = df[df[colname]==index][required_vars]  
            chunck.__iadd__([row_df])  
        
        return  pd.concat(chunck, axis=0)   
        
    def CheckEpid(base_epidsdf  , worker_df , colnames ) : 
        data_list = []
        epids  = list(base_epidsdf[colnames])  
        return  build_rowless_df(worker_df , colnames , epids)  

    data  = CheckEpid(epids ,df , "no_terrain")

    ages_collection   = [] 
    for age  in data["age_annees"]  :  
        age  = str(age)
        age  =  age.replace(",",".") 
        try  :  
            age  = float(age) 
            ages_collection.__iadd__([age]) 
        except  :  ...   

    data["age_annees"] =  ages_collection 
    groupby = data.groupby('no_terrain',sort = True).std()   
    
    #ages = groupby[groupby['age_annees'].__gt__(1)]
    #ages  = charm.select("age_annees" , -1,  ">")  

    ages = groupby['age_annees'] 
    
    data_final =  build_rowless_df ( df ,"no_terrain" , list(ages.index) )  

    output_filename=f"CH@{filename[:-4]}.xlsx"
    
    data_final.to_excel(output_filename)
      
      


if __name__.__eq__("__main__")  :
    main.__call__()  
