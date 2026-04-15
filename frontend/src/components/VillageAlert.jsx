import { useEffect, useState } from "react";

function VillageAlert(){

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

  if(risk !== "High") return null

  return(

    <div style={{
      background:"#ff4444",
      color:"white",
      padding:"12px",
      marginBottom:"15px",
      fontWeight:"bold"
    }}>

      🚨 Village Safety Alert  
      Rockfall risk is HIGH near Shimla Ridge Highway.

    </div>

  )

}

export default VillageAlert