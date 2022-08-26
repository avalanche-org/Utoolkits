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


def CHARM__  ( charm  , spreadsheet  )  :
    charm._xlsx  = spreadsheet 
    charm._headers = None
    charm.automake_df()  
    

def automake_df(charm ,  sep=";" , low_memory =False )   : 
    sprdsheat_dataframe =  pd.read_csv( charm._xlsx , sep=sep , low_memory = low_memory)  
    charm._headers  = sprdsheat_dataframe.columns.values 
    charm._xlsx =  sprdsheat_dataframe   

@property  
def headers (charm )  : 
    return  charm._headers  

@property 
def xlsx (charm ) : 
    return  charm._xlsx

def select (charm , colname_target  : str  , build_frame : bool = True  ) : 
    if  not charm.headers.__contains__(colname_target)  :
        raise  ValueError(f"{colname_target} is not defined")  

    return charm._xlsx[colname_target].value_counts().to_frame()  
    #return charm._xlsx[colname_target] 

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
    
    argv = stdarg.parse_args()
    
    sprdsheat  = argv.file  
    if  sprdsheat is  None :  
        sys.exit(1) 
    
    filename =  sprdsheat.split("/")[-1]  
    
    charm =  CHarm(sprdsheat) 
     
    """
    Create  a dataframe  that contain the frequency of  each epid  
    """
    epids  =  charm.select("no_terrain")  
    print(f"{epids}") 
    epids_frequency_gt2 = epids[epids["no_terrain"].__ge__(2)]    
    #epids_frequency_gt2  = epids["no_terrain"] 
    
    print(f"@--> {epids.index}") 
     
    required_vars = [
            'nom_patient','date_prelevement','no_ipd',
            'no_terrain','age_annees','adresse',
            'sexe','telphone'
            ]

    df   =  charm.build_subdf(*required_vars)
    print(f"subdata frame  -> {df}")

    def CheckEpid(base_epidsdf  , worker_df , colnames ) : 
        data_list = []
        print(f"epids index  {base_epidsdf.index}") 
        for row in list(base_epidsdf.index) : 
            df1 = worker_df[worker_df[colnames] == row][required_vars]  
            data_list.__iadd__([df1]) 
            
        return  pd.concat(data_list ,axis =0 )  

    data  = CheckEpid(epids_frequency_gt2 ,df , "no_terrain")

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
    g = groupby[groupby['age_annees'].__gt__(1)]
    data_list = []
    for ind in list(g.index):
        dat = df[df['no_terrain']==ind][required_vars]
        data_list.__iadd__([dat])
    
    data_final = pd.concat(data_list,axis = 0)
    output_filename=f"CH@{filename[:-4]}.xlsx"
    
    data_final= data_final.fillna("Missing") 
    data_final.style.applymap(lambda x: "background-color:'yellow';color: red" if pd.isna(x) else '')
    data_final.to_excel(output_filename)
      
      


if __name__.__eq__("__main__")  :
    main.__call__()  
