/*
 * \ barcode reader   (testing programme ) 
 * \ MS7120 BS METROLOGIC INSTRUMENTS   
 * \ copyright(c) , 2022  Umar <jUmarB@protonmail.com>   <github/jukoo>  
 */

#include <stdio.h> 
#include <stdlib.h> 

#include "bcreader.h" 

int __ms7120bs__  ( int argc , char **argv )  { 

    HEADER ;   
    char kb[DECIMAL_BASE]  = {0} ; 
     
    (void)  init( kb ,  DECIMAL_BASE)  ; 
    
    fprintf (stdout , " kb -> %s \n" , kb) ;  

    char  bc[BCR_MAX_LENGHT]  ;  
    
    read_in(bc)  ; 

   fprintf (stdout , " bc -> %s \n" , bc ) ;  

   char  *s =  translate( bc , kb , DECIMAL_BASE) ; 
    
   fprintf (stdout , " s -> %s \n" ,bc ) ;  
      
    return  EXIT_SUCCESS ; 
}  
