import { useEffect, useState } from "react";

function MapSensorOverlay(){

const [data,setData] = useState({})

useEffect(()=>{

const fetchData = ()=>{

fetch("http://127.0.0.1:8000/sensor-data")
.then(res=>res.json())
.then(d=>setData(d))

}

fetchData()

const interval = setInterval(fetchData,5000)

return ()=>clearInterval(interval)

},[])

return(

<div style={{
position:"absolute",
top:"10px",
right:"10px",
background:"white",
padding:"10px",
borderRadius:"6px",
zIndex:1000
}}>

<b>Live Sensors</b>

<p>Rainfall: {data.rainfall}</p>
<p>Slope: {data.slope}</p>
<p>Soil: {data.soil_moisture}</p>
<p>Vibration: {data.vibration}</p>

</div>

)

}

export default MapSensorOverlay