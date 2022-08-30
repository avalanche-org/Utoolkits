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

let  { masks, paragraph_advice , n_min , prefix , npages ,  bcgenbtn , bctable , suggest}   = htmlVirtual_DOM_select  = { 
    masks  :  [..._.querySelectorAll("div > a.item")].splice(-3) , 
    paragraph_advice  :  _.querySelectorAll("p")[0] ,  
    n_nim  : _.querySelector("#n_min") , prefix  : _.querySelector("prefix") , npages:_.querySelector("#npages") ,
    bcgenbtn :_.querySelector("#btn_generer_codebar") , 
    bctable  :_.querySelector("#tbl_barcode") , 
    suggest  :_.querySelector("#suggested")  
} 

const  JBC_SETTING = {  
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
    
    calculate_total_page :  npages_requested =>   height * parseInt(npages_requested) ,   
    
    bcmatrix_customizer  : id  => { //,  style_string)  => { 
       return  `<tr> <td style="margin-top:10px"> <svg id="barcode${id}"></svg></td>` 
    }, 
    
    build_bcmatrix    :  ( height ,  width )  =>  { 
        let table_row ="<tr>"
        for (let row = 0;  row < height  ; row++) 
        {
            for (let column= 0 ; column <  width ;  column++ )  
            {
                let identifier  = column.toString() + row.toString()  
                table_row +=bcgen_logical.bcmatrix_customizer(identifier)  
            }
            table_row+="</tr>"
        } 
        bctable.innexHtml = table_row  
    } ,   
    
    bcmatrix_inscribe_barcode  : ( height , width ,  customizable_logic_callback )  => {

        nmin = parseInt(n_min.value.trim()) 
        prefix= prefix.value.trim()  
        
        for (let row = 0;  row < height  ; row++) 
        {
            for (let column= 0 ; column <  width ;  column++ )  
            {
                let identifier  = column.toString() + row.toString()  
                JsBarcode(`#barcode${identifier}` ,  prefix +nmin.toString()  , { ...JBC_SETTING})  
            } 

            if  (customizable_logic_callback)  
            {
                customizable_logic_callback(nmin)  
            }else  
            nmin =  nmin +1  

        }  
        
        if  (nmin) 
        {
            bcgen_logical.startwith(nmin)  
            _.querySelector("#btnFillNext").addEventListener("click" ,  evt => {  
                n_min.value =  nmin  
            }) 
        }
    },

    startwith :  new_nmin_serie  => {  
        let suggest_content = `<button id="btnFillNext" style="font-size:1.5em; font-weight:400; color:#4183c4!important; margin-bottom:10px;" 
        class="ui basic button" >'+'Commencez la prochaine impression avec le numero'+'<i class="right arrow icon">'+'</i>&nbsp;'+thatNumber+'</button>`
        suggest.innertHtml=suggest_content  

    } , 

    barcode_generator :  () => { 
        bcgenbtn.addEventListener("click", evt =>   {
            bctable.innertHtml="" 
            tpages  = bcgen_logical.calculate_total_page(npages)  
            bcgen_logical.build_bcmatrix(height, width)   
            bcgen_logical.bcmatrix_inscribe_barcode(height ,  width ,  false )  
        }) 
    }  , 


    main : () =>  { 
         
        bcgen_logical.masks_apply()  
        //bcgen_logical.barcode_generator()
        //bcgen_logical.bcgen_printer() 
        

    } 

}


bcgen_logical.main() 
