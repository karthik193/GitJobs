import React , {useState , useEffect} from 'react';
import GetRequest from './GetInfo.js';
import logo from './logo.svg';
import './App.css';

const Light  = 'white' ; 
const Dark = 'black' ; 
function GetIcon(props){
  console.log(props); 
  if(props.type === 'dark') return (<span>🌜</span>) ; 
  else return(<span>🌞</span>) ;
}

function App() {
  const [Switch , setSwitch] = useState(false) ;
  const [ResultList , setRL] = useState([])  ;  
  const [SearchLog , setSL] =useState({
    description : '' , 
    Location :'', 
    Full_Time : false
  }) ; 
  function manageMode(){
    document.body.style.backgroundColor = Switch? Light : Dark ; 
    document.body.style.color = !Switch? Light : Dark ; 
    setSwitch(!Switch) ; 
  }
  
  function manageChange(event){
    var {name ,value} = event.target  ;  
    setSL(preVal =>{
      return ({
        ...preVal , 
        [name] : value 

      })
    }); 
  }
  
  function manageSearch(event){
    event.preventDefault();
    console.log(event) ; 
    GetRequest(SearchLog.description , SearchLog.Location , SearchLog.Full_Tim , setRL) ;  
     
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
            <div><input type = "text" className ='SearchBar' name = 'description'  onChange = {manageChange}></input></div>
            <div><input type = "text" className ='SearchBar' name = 'location' placeholder= 'Location' onChange = {manageChange}></input></div>
            <div style = {{padding : '10px'}}><p>Full Time</p><input type = "checkBox" onChange = {manageChange}/></div>  
            <button className ='handy' type = 'submit' style = {{margin:"10px"}} >Search</button>        
          </form>
        </div>
        
        </div>

        <div className="Results" id = "col2" >
            <Tabs ResultList  = {ResultList}/>
        </div>
      </div>
    </div>
  );
}
function Tabs(props){
  return (<div style = {{display :'' , color :"black"}}>
    {props.ResultList.map((each , index)=>{
      return (<div className = 'Tab' style = {{ boxShadow: "0 1px 5px rgb(138, 137, 137)" , float : 'left'}}>
        <p>name: {each.company}</p>
      </div>)
    })}
  </div>)
}

export default App;
