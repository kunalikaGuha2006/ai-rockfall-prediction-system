import { useEffect, useState } from "react";

function RiskLocations(){

const [risk,setRisk] = useState("Low")

useEffect(()=>{

const fetchData = ()=>{

fetch("http://127.0.0.1:8000/sensor-data")
.then(res=>res.json())
.then(data=>setRisk(data["Predicted Risk"]))

}

fetchData()

const interval = setInterval(fetchData,5000)

return ()=>clearInterval(interval)

},[])

return(

<div style={{marginTop:"20px"}}>

<h3>Active Risk Locations</h3>

<table style={{borderCollapse:"collapse",width:"400px"}}>

<tr style={{background:"#eee"}}>
<th style={{padding:"8px"}}>Location</th>
<th style={{padding:"8px"}}>Risk</th>
</tr>

<tr>
<td style={{padding:"8px"}}>Shimla Ridge Highway</td>
<td style={{padding:"8px"}}>{risk}</td>
</tr>

<tr>
<td style={{padding:"8px"}}>Aravalli Hills Road</td>
<td style={{padding:"8px"}}>Medium</td>
</tr>

<tr>
<td style={{padding:"8px"}}>Nilgiri Mountain Pass</td>
<td style={{padding:"8px"}}>Low</td>
</tr>

</table>

</div>

)

}

export default RiskLocations