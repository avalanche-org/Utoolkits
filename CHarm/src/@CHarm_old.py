#!/usr/bin/python3 

""" 
harmonize.py  
--- 
Troubleshooting :  
    ->  python3  -m venv  dist 
    ->  source  dist/bin/activate 
    ->  python3  -m pip install --upgrade pip  
    ->  python3  -m pip install pandas  
    ->  python3  -m pip install openpyxl 
    
"""
import pandas as pd  
import sys  
from time import sleep  

spreadsheet_target =  sys.argv[1] 

#  error_bad_lines is deprecated
#  use on_bad_lines  = { 'error',  'warn', 'skip'}  by default  error is  used 

df = pd.read_csv( spreadsheet_target,sep=";"  , low_memory=False) #importer le dataset ici les parametres dans le fonction "read_csv"

epid = df['no_terrain'].value_counts().to_frame() #creer le dataframe donnant la frequence de chaque Epid
epid_to_two = epid[epid['no_terrain']>=2]  # afficher les epid dont la frequence est sur à 2

variable = ['nom_patient','date_prelevement','no_ipd','no_terrain','age_annees','adresse','sexe','telphone'] #ici c'est les variables qu'on veut afficher

df = df[variable] #ici est selectionne la data avec les variables necessaires

"""Ici en bas la fonction qui donne chaque Epid le nom ou les noms affectés, en même temps nous permet de corriger NaN, les incoherences de ces variables là haut selectionées pour ensuite faire le update sur la base de données"""

def CheckEpid(x,y,string):  # x est epid_to_two, y est le df dernierement defini et string le nom de la colonne consernée ici #c'est no_terrain
    data_list = []
    for row in list(x.index):
        df1 = y[y[string]==row][variable]
#         df1.style.set_properties(**{'background-color': col,
#                            'color': 'black',
#                            'border-color': 'white'})             # Ce code est pour mettre les resultats en couleur
        data_list.append(df1)
    data_all = pd.concat(data_list,axis = 0)
    return data_all


data = CheckEpid(epid,df,'no_terrain') #ici on affiche le resultat en utilisant la fonction

"""Plus loin! pour rendre pointu les résultats, on cherche un Epid avec carrement 2 individus differents en regardant la variance de l'âge"""

ages_collection   = [] 
for age  in data["age_annees"]  :  
   
    age  = str(age) 
    age  =  age.replace(",",".") 
    try  :  
        age  = float(age) 
        ages_collection.append(age) 
    except  :  
         ...  


#sys.__stdout__.write(f"{ages_collection}")

#sys.exit(1) 

data["age_annees"] =  ages_collection  
#data["age_annees"] = float( data["age_annees"].replace(',','.')) #.astype(float) #formatting des ages en float si nécessaire

groupby = data.groupby('no_terrain',sort = True).std() #groupage des ages pour voir la variance qui est un critere montrant nettement que la difference d'age peut entrainer une difference des individus

groupby = groupby.sort_values(by = 'age_annees', ascending=False) #ici on met les ages par ordre

g = groupby[groupby['age_annees']>1] #ici on a les epids avec dont la difference d'age est superieur à 1

data_list = []
for ind in list(g.index):
    dat = df[df['no_terrain']==ind][variable]
    data_list.append(dat)
data_final = pd.concat(data_list,axis = 0)
data_final  #Ici on est pret à afficher maintenant le fichier sorti à harmoniser :)

output_filename=f"charm_{spreadsheet_target}.xlsx"
data_final.to_excel(output_filename) # le fichier final à enregistrer et upload sur google sheet pour le nettoyage collaboratif
sys.exit(10) 


