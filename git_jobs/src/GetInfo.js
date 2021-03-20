import React from 'react'; 
import axios from 'axios';

async function GetRequest(description , location , FT , setRL){
    var url  = 'https://spring-feather-5dc4.karthik-pasupulatei.workers.dev/?https://jobs.github.com/positions.json?' ; 
    if (description != '') url += '&description=' + description ; 
    if(location != '') url += '&location=' + location ; 
    if(FT != false) url += '&full_time=' + FT ;
    url += '&page=1' ; 
    return await axios.get(url).then(response=>{
        console.log('response',response.data)
        setRL(response.data); 
    }).catch(err=>console.log(err)) ; 
}

export default GetRequest  ; 