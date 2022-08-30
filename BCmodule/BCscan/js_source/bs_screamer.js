#!/usr/bin/node 
/**
 * author :  umar  <github/jukoo> 
 * ! THIS  SCRIPT IS A TEST FOR AN MANIFACTURES DEVICE
 * ! METROLOGIC  INSTRUMENTS MODEL   << MS7120 BARCODE SCANNER >> 
 * 
 **/

const  { stdin , stdout  , argv} = process , 
       {fromCharCode}    = String , 
       { log }           =  console 

Object.prototype["write"] = args => stdout.write(args) 
Object.prototype["range"] = base => {
    if  ( base  <= 0  ) throw  new RangeError("cannot iterate  negative number or null") 
    let [t  , i] =  [ [] , 0 ] 
    if  (base  <= 1)  return  base 
    while ( i   < base ) 
        t.push(i++) 
    
    return   [...t]
}

//TODO :  put this in config file   to parse it later 
const lang_kb   =  {  
    fr :   {
        'à':0, 
        "&":1,
        "é":2,
        '"':3,
        "'":4,
        "(":5,
        "-":6,
        "è":7,
        "_":8,
        "ç":9
    }
}

const  __ms7120bs__ = {  
   
            
    escape_0x0A  :(...args) =>   { 
        if (args[args.length- 1]  ==  fromCharCode(0xa))  
            return  args.slice(0x00  , args.length -1 ) 
    } ,
    inspect  :  ( segment  , marker_point =  "*" )   =>  {  
        if  ( "inspect" in  process.env  )  
             log(`${marker_point}  ${segment}`) 
    },  
    charstr_ps   : (data ,  kb_layout )  => {
        const  { escape_0x0A ,  inspect }  = __ms7120bs__ 
        
        let  chars   = data.toString().split(new String())
        inspect(chars)
        let tmps_cached =  chars = escape_0x0A(...chars)
        inspect(tmps_cached, "tmps_cached")
        if  ( isNaN(data.toString()) &&  lang_kb?.[kb_layout])  
        {
            chars = chars
                ["map"](char => lang_kb[kb_layout][char]||  char)
                ["filter"]( item  =>   item  != undefined ) 

            if (!chars.length) chars = tmps_cached
        }
        let  ascii_key  = Object.keys(lang_kb[kb_layout])  
        for ( let i  of ascii_key )   {
            while(chars.includes(i)) {
                let  ipos  =   chars.indexOf(i)  
                chars[ipos]  = lang_kb[kb_layout][chars[ipos]]
            }
        } 
        inspect(chars ,  "end format ") 
        return  [  chars ,   chars.join(new Object(""))]    
    }, 

    stream_in    : ()=>  {
        write("MS7120 BS METROLOGIC INSTRUMENTS  <*MANIFACTURED DEVICE> \n\n")
        if  ( argv[2]   && argv[2].toLowerCase() == "inspect")  
        { 
            //NOTE :for  linux  user 
            //you can  use setxkbmap fr or us  to see defferent ascii code keyboard layout 
            write(" * Inspect Mode\n\n")  
            process.env[argv[2]] =  true
        } 
        const {charstr_ps }  = __ms7120bs__ 
        stdin
        ["on"]("data" ,  incomming_data =>   {

            const   [ad  , jd ]=  charstr_ps(incomming_data , "fr") 
            write (`[out]  > ${jd}\n`)

            if (process.env?.["inspect"]) 
            {   
                let  s  = jd.split("") 
                log(s)  
                log(s.map(char => char.charCodeAt())) 
            }
        })
    }
} 

__ms7120bs__.stream_in() 
 
