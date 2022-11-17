import React, { useState,useEffect } from "react";

export default function Result(props){
    const [actor,setActor]=useState("")
    const[show,setShow]=useState("")
    useEffect(()=>{
      if(props.check==="actor" &&props.input){
        const fetchApi =async()=>{
          const url=`https://api.tvmaze.com/search/people?q=${props.input}`;
          const response=await fetch(url);
          const resJson=await response.json();
          //setActor(resJson[0].person.name)
         setActor(resJson)
          // console.log(actor)
        }
        fetchApi();
      }else{
        setActor("")
      }
      
      if(props.check==="shows" && props.input){
        const fetchApi1=async()=>{
          const url1=`https://api.tvmaze.com/search/shows?q=${props.input}`;
          const response=await fetch(url1);
          const resJson=await response.json();
          // setActor(resJson[0].person.name)
         setShow(resJson);
        //  console.log(show)
      }
      fetchApi1();
    }else{
      setShow("")
    }
     
    },[props.check && props.input])
    
    // console.log(actor)
    return <>
    { !props.check?<div><h4>No Data Found</h4></div>: (!actor&&!show?<div><p>Loading...</p></div>:actor?<div className="data">
      {actor.map((item)=>{
        return <div className="content">
          <div className="img">
        <img src={item.person.image!==null?item.person.image.original:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png" }/></div>
        <div className="details">
        <h3>{item.person.name}</h3>
        <button onClick={event =>  window.location.href=`${item.person.url}`}>Get Details</button>
        </div>
        </div>
      })}
    </div>:<div className="show">
      {show.map((item)=>{
        return <div className="host">
          <div className="pic">
            <img src={item.show.image!==null?item.show.image.original:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png" }/>
          </div>
          <div className="name">
            <h3>{item.show.name}</h3>
            <button style={{backgroundColor: "green"}} onClick={event =>  window.location.href=`${item.show.url}`}>Get Details</button>
          </div>
        </div>
      })} 
    </div>)

    }
    </>
}