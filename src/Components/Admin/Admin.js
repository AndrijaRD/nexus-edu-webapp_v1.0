import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function Broken(){
  return(
    <Link to="/">
      <h1>You followed a Broken Link. 404. Go back to Home Page.</h1>
    </Link>
  )
}

export default function Admin(){
  const [Ip, setIp] = useState("")
    
  useEffect(() => {
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => setIp(data.ip))
  }, [])
    
  if(localStorage.getItem("key") !== "admin" || Ip !== "178.237.222.255")
    return(<Broken />)
    
  return(
    <div>
      Wow Impressive!
    </div>
    )
}
