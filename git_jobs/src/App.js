import React , {useState , useEffect} from 'react';
import GetRequest from './GetInfo.js';
import logo from './logo.svg';
import './App.css';

const Light  = 'white' ; 
const Dark = 'black' ; 
function GetIcon(props){
  if(props.type === 'dark') return (<span>🌜</span>) ; 
  else return(<span>🌞</span>) ;
}

function App() {
  const [Switch , setSwitch] = useState(false) ;
  const [ResultList , setRL] = useState([])  ;  
  const [SearchLog , setSL] =useState({
    description : '' , 
    location :'', 
    Full_Time : false
  }) ; 
  const [jobDetails , setJD] = useState({
    flag : false , 
    details : 'none' 
  });
  if(ResultList.length == 0 )GetRequest('Ruby' , '' , false,setRL) ;
  function manageMode(){
    document.body.style.backgroundColor = Switch? Light : Dark ; 
    document.body.style.color = !Switch? Light : Dark ; 
    setSwitch(!Switch) ; 
  }
  
  function manageChange(event){
    var {name ,value} = event.target  ; 
    if (name == 'Full_Time'){
      if (value == 'on' )value = true; 
      else value = false; 
    } 
    setSL(preVal =>{
      return ({
        ...preVal , 
        [name] : value 

      })
    }); 
  }
  
  function manageSearch(event){
    event.preventDefault();
    console.log(SearchLog) ; 
    setJD(preVal =>({
      ...preVal ,
      flag : false
    })) ; 
    if(SearchLog.description == ''&&SearchLog.Location =='' &&SearchLog.Full_Tim == false )setRL([]) ;  
    else GetRequest(SearchLog.description , SearchLog.Location , SearchLog.Full_Time , setRL) ;  
     
  }
  return (
    <div className="App">
      <div className="row" >
      <div  className="Header" id = "col1">
        <div className= "Title">Git Jobs <br/>
          <a className = "handy" onClick ={manageMode}>
            <GetIcon type = {Switch?'dark':'light'} />
          </a>
        </div>
        <div  className="Search">
          <form onSubmit={manageSearch}>
            <div><input type = "text" className ='SearchBar' name = 'description'  onChange = {manageChange} placeholder = 'search'></input></div>
            <div><input type = "text" className ='SearchBar' name = 'location' placeholder= 'Location' onChange = {manageChange}></input></div>
            <div style = {{padding : '10px'}}><p>Full Time</p><input name = "Full_Time" type = "checkBox" onChange = {manageChange}/></div>  
            <button className ='handy' type = 'submit' style = {{margin:"10px"}} >Search</button>        
          </form>
        </div>
        
        </div>
        {!jobDetails.flag?<div className="Results col2" >
            <Tabs ResultList  = {ResultList}  setJD = {setJD}/>
        </div>:
        <div className="JobDetails col2" id = "jobDetails" style ={{padding :"10px"}}>
            <div><img className = "logo"  src = {jobDetails.details.company_logo} style  = {{height : '100px'}}></img>
            <h3>{jobDetails.details.company}</h3> 
            <p>Title: {jobDetails.details.title}</p>
            <p>type: {jobDetails.details.type}</p>
            <p>location: {jobDetails.details.location}</p>
           <p>visit our Page <a href = {jobDetails.details.company_url}>Here</a></p>
            <p>description:</p>
        <div dangerouslySetInnerHTML={{__html: jobDetails.details.description }} />

        <h2>HOW TO APPLY ?</h2>
        <div dangerouslySetInnerHTML={{__html: jobDetails.details.how_to_apply }} />
        </div>
        </div> }
        
        
      </div>
    </div>
  );
}
function DisplayJobDetails(jobDetails , setJD){
  setJD({
    flag : true , 
    details : jobDetails
  }) ; 

}
function Tabs(props){
  if(props.ResultList.length == 0 )if( props.des ==''&& props.loc =='' && props.ft == false )return <h3>Loading results</h3> ; else return <h3>No Results found..<br/>Loading recommended jobs</h3> ; 
  return (<div style = {{display :'' , color :"black"}}>
    {props.ResultList.map((each , index)=>{
      
      return (<div className = 'Tab handy' style = {{ boxShadow: "0 1px 5px rgb(138, 137, 137)" , float : 'left'}}
        onClick = {()=>{DisplayJobDetails(each , props.setJD);}}
      >
        <img className = "logo"  src= {each.company_logo} ></img>
        <h3>{each.company}</h3>
        <p>title : {each.title}</p>
        <p>locaiton : {each.location}</p>
        <p>type : {each.type}</p>
      </div>)
    })}
  </div>)
}

export default App;
