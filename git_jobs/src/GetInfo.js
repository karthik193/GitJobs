import React from 'react'; 
import axios from 'axios';

async function GetRequest(description , Loc , FT , setRL){
    return await axios.get('https://spring-feather-5dc4.karthik-pasupulatei.workers.dev/?https://jobs.github.com/positions.json?description=ruby&page=1').then(response=>{
        console.log('response',response.data)
        setRL(response.data); 
    }).catch(err=>console.log(err)) ; 
}

export default GetRequest  ; 