
<p align="center" style="background-color:white">
<img src="images/logo/charmlogo.png" height="105" border-radius="100">

</p>

## CHarm 
--- 

Adaptive pipeline for Correction and Harmonization of epidemic data
  
#### Why?  Let me explain! 

To make an automatic data processing pipeline transparent and easy to maintain in the long run.

The whole process can be summarized in 3 main steps  

1 - Extraction phase  
2 - Correction phase  
3 - Application of the database patch    

Each step depends on the preview. 

### 1 Extraction phase  

The first entry point Without this step, the others are meaningless. 
It involves extracting uncleaned epidemic data from the database with some errors and redundant attributes or variables. 

### 2 Correction phase  

As mentioned, this phase corrects the results of the preview stage, as you have already mentioned, they contain errors. 


### 3 Application of the database patch 
Unload the cleaned data into the database.



### How the adaptive design should work 

The adaptive design is like "plug and play". 
The service stays the same but the processing behind it can be dynamic. 
Because we can process some data that needs more or less manipulation depending on the situation.
That's why the service offers the possibility to replace the base code by another one, for example to make an adaptation to your current situation.



### Installation

To install the project 


#### docker version 

The static application is wrapped in a docker container.  

> $ docker run -d -p7000:7000 jukoo/charm:betarc.1  


> $ git clone version   

1 > Clone the repository 

2 > go to the CHarm/apps folder

3 > run npm run watch  
		(see package.json for more commands) 
		
		

___redaction on progress___...