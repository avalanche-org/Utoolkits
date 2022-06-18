#!/usr/bin/make 

cc = cc 
cflags =  -Wall  -D__ms7120bs__=main -DFR_KB=1
src = $(wildcard *.c) 
obj = $(src:.c=.o) 
exec= barcode_scanner 

all : $(exec) 
   


$(exec)  : $(obj)  
	@echo -e "\t [ LD ]  $^ "
	$(cc) -o $@  $^ $(cflags) 

%.o : %.c  
	@echo -e "\t [ CC ] $< " 
	$(cc) -o $@ -c $<  $(cflags)  


.PHONY  :clean mpoper  

clean :  
	rm *.o 
	
mproper : clean 
	rm  $(exec)  
