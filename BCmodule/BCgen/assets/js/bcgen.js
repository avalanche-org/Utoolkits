/**
 * barcode  generator  module  
 * Authors  :  Mamadou Diop   2020-2021 
 *             Mame Astou Gassama  2022   
 *             Umar  Ba            2022  
 * copyright (C) 2022, Avanlanche BioSoftware Corporation   
 */


let {log} = console  
log("js bc ->" ,JsBarcode)  
const  _=document   

let  { 
    masks, paragraph_advice , n_min , prefix , npages ,  
    bcgenbtn , bctable , suggest , header_title_applied_mask,bcprinter} = htmlVirtual_DOM_select  = { 
    masks  :  [..._.querySelectorAll("div > a.item")].splice(-3) , 
    paragraph_advice  :  _.querySelectorAll("p")[0] ,  
    n_min  : _.querySelector("#n_min") , prefix  : _.querySelector("#prefix") , npages:_.querySelector("#npages") ,
    bcgenbtn :_.querySelector("#btn_generer_codebar") , 
    bctable  :_.querySelector("#tbl_barcode") , 
    suggest  :_.querySelector("#suggested") , 
    header_title_applied_mask  : _.querySelectorAll("h1")[0],  
    bcprinter: _.querySelector("#print") 
} 

const  JBC_SETTING = { 
    //format:"code128",
    width : 1.3,
    height: 29.1,
    fontSize:15,
    margin:10,
    textPosition:"top" 
} 
let height = 0 
let width  = 0 


const bcgen_logical  = { 

    paragraph_advice_change  : data  => { 
        const lookup_patern = /\d+/g 
        let  text = paragraph_advice.textContent 
        data = data.split("x") 
        const [ h , w ]  =data  
        let  digit_match  =  text.match(lookup_patern) 
        text = text.replace(digit_match[0],h) 
        text = text.replace(digit_match[1],w) 
        height = parseInt(h) 
        width  = parseInt(w) 
        log ("applyed  mask " ,  height  , width )  
        header_title_applied_mask.textContent= `${height}x${width}` 
        paragraph_advice.textContent = text  
    } , 
    
    "#_active_mask" : () =>   masks.filter(mask =>  mask.classList.contains("active")).at(0) ,  
    masks_apply :() => {  
        
        masks.map(mask =>  { 
            mask.addEventListener("click" , evt  => { 
                evt.preventDefault()  
                if ( !mask.classList.contains("active")) 
                {
                    bcgen_logical["#_active_mask"]().classList.remove("active") 
                    mask.classList.add("active")  
                    const  mask_params  =  mask.attributes.alt.nodeValue  
                    bcgen_logical.paragraph_advice_change(mask_params)  
                }
            }) 
        })
    },  
    
    /**
     * calculate_total_page  : 
     * depending  on used mask  it calcute how many page  it should generate  
     * @param  {string  or  integer }  - number of page requested     
     * @return { integer }             - number of total pages  needed   
     */
    calculate_total_page :  npages_requested =>  height * parseInt(npages_requested) ,  

    bcmatrix_customizer  : id => {  
        const td   = _.createElement("td")
        td.style.maginTop = "10px"  
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

        svg.setAttribute("stroke", "rgba(107, 119, 230, 1)")
        svg.setAttribute("id" , `barcode${id}`)   
        td.appendChild(svg)  
        
        return td ; 
    }, 
    
    build_bcmatrix    :  ( height ,  width )  =>  {

        let tr_construction  =  "" 
        for (let row = 0;  row < height  ; row++) 
        {
            table_row = _.createElement("tr")  
            for (let column= 0 ; column <  width ;  column++ )  
            {
                let identifier  = column.toString() + row.toString()  
                table_row.appendChild(bcgen_logical.bcmatrix_customizer(identifier)) 

            }
    
            bctable.appendChild(table_row)  
        } 
         
         
    } ,   
    
    bcmatrix_inscribe_barcode  : ( height , width ,  customizable_logic_callback )  => {

        nmin = parseInt(n_min.value.trim())
        log("nmin" ,  nmin ) 
        
        for (let row = 0;  row < height  ; row++) 
        {
            for (let column= 0 ; column <  width ;  column++ )  
            {
                let identifier  = column.toString() + row.toString() 
                JsBarcode("#barcode"+identifier ,  prefix.value+nmin.toString()   , JBC_SETTING)  
            } 
            /*
            if  (customizable_logic_callback)  
            {
                customizable_logic_callback(nmin)  
            }else*/   
            nmin =  nmin +1  

        }  
        
        if  (nmin) 
        {
            if ( bcgen_logical.startwith(nmin)) 
            {
                 log ("true") 
                _.querySelector("#btnFillNext").addEventListener("click" ,  evt => {  
                    n_min.value =  nmin  
                })
            }
        }
    },

    startwith :  new_nmin_serie  => { 
        if   ( [...suggest.childNodes].length == 1 )  
        {
             suggest.removeChild([...suggest.childNodes].at(0))   
        }

        let btn_suggest  =  _.createElement("button") 
        btn_suggest.setAttribute("id" , "btnFillNext") 
        btn_suggest.style.fontSize="1.5em"
        btn_suggest.style.fontWeight=400
        btn_suggest.style.color="#4183c4!important"
        btn_suggest.style.maginBottom="10px"
        btn_suggest.setAttribute("class" , "ui basic button")  

        btn_suggest.innerHTML = `next<i class="right arrow icon"> </i> &nbsp;${new_nmin_serie}`
        
        suggest.appendChild(btn_suggest)   
        return  true  
    } , 

    barcode_generator :  () => { 
        bcgenbtn.addEventListener("click", evt =>   {
            bctable.innertHTML=""  
            tpages  = bcgen_logical.calculate_total_page(npages.value) 
            
            bcgen_logical.build_bcmatrix(height, width)   
            
            bcgen_logical.bcmatrix_inscribe_barcode(height ,  width ,  false )  
        }) 
    }  , 

    preload : ()  =>  {   
        const dimension_property =  bcgen_logical["#_active_mask"]() 
        bcgen_logical.paragraph_advice_change(dimension_property.attributes.alt.nodeValue) 
        
    } , 

    bcgen_printer  :   () => {  

        bcprinter.addEventListener("click", evt  =>{ 
            $("#tbl_barcode").printElement({ 
                overrideElementCSS:[
                    "assets/style/barcode.css?3.0",
                    {
                        href:"assets/style/barcode.css?3.0", 
                        media:"print"
                    }
                ]
            })
        }) 

    } ,  
    main : () =>  { 
        
        bcgen_logical.preload()  
        bcgen_logical.masks_apply()  
        bcgen_logical.barcode_generator()
        bcgen_logical.bcgen_printer() 
        

    } 

}


bcgen_logical.main() 
