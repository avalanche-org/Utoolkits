/*
 * \ barcode reader   (testing programme ) 
 * \ MS7120 BS METROLOGIC INSTRUMENTS   
 * \ copyright(c) , 2022  Umar <jUmarB@protonmail.com>   <github/jukoo>  
 */


#include <stdio.h>
#include <stdlib.h> 
#include <assert.h> 
#include <string.h> 

#include "bcreader.h"


static  unsigned  const char _symb[DECIMAL_BASE]  =  {
    _ZERO , _ONE , _TWO , _THREE , _FOUR ,_FIVE,
    _SIX  , _SEVEN , _EIGHT , _NINE 
} ;  

unsigned char *init (unsigned char __symb[]   , size_t  __size ) {
    
    (void ) assert(__size >=  sizeof (_symb)) ;  
    unsigned  char * symbolic  = (unsigned char *)  _symb ; 

    while(  *symbolic   != _NINE)  
       *__symb++ = *symbolic++;  
    
    return     __symb ; 
} 

static  void flush_buffer  ( )   {  
    char c  ; 
    while ( c!= 0xa  && c!=0 )  
    {
        c = getchar() ; 
    }
} 

char  * read_in (char  *restrict bc_buffer   ) { 

   if ( !fgets(bc_buffer ,  BCR_MAX_LENGHT ,  stdin )) 
   {  
       exit(EXIT_FAILURE) ; 
   } 
  
   char *jmp =  ( void *) 0  ; 
   jmp = strchr (bc_buffer ,  0xa ) ;  
   if  (!jmp) 
       exit(EXIT_FAILURE)  ;  

   *jmp = '\0' ;
   
   flush_buffer() ; 

   return   bc_buffer ;  

}  

char * translate ( const char * srcstr   , const char kbs []  ,  size_t size ) {  
   
    char  *source =  (char*) srcstr  ;  
    char  *keyboard_numpad = (char *) kbs ; 
    int   asize =  strlen(srcstr)+1 ; 
    int   *position_index  = malloc(asize  *  sizeof(char))  ;  

    int   o =  0 ; 
    int   i  = 0 ; 
            

    int  begin= 0  ; 
    while (*source) 
    {
        if ( *kbs == *source) 
        { 
            position_index[o]  =  i ;  
            o++ ; 
        }
        kbs++ ; 
        i++;  
        if (!*kbs) 
        {
            i=0  ; 
            kbs =  keyboard_numpad ;  
            source++ ;
            begin++;   
        }
    }

    source  =  (char *) source - begin ;  

    for   ( int i  = 0 ; i  < asize ; i++ )  
        fprintf(stdout , "[ %i ]" , position_index[i] ) ; 

    puts("") ;  
    free(position_index) ; 
   return  source ;  
} 
