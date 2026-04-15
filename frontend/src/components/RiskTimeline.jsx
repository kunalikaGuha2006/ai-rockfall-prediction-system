import { Line } from "react-chartjs-2"
import {
Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement,
Legend,
Tooltip
} from "chart.js"

ChartJS.register(
LineElement,
CategoryScale,
LinearScale,
PointElement,
Legend,
Tooltip
)

function RiskTimeline(){

const data = {

labels:["10:00","10:10","10:20","10:30","10:40","10:50"],

datasets:[
{
label:"Rockfall Risk Level",

data:[1,2,2,3,2,1],

borderColor:"#22c55e",
backgroundColor:"#22c55e",

pointBackgroundColor:"#22c55e",

pointRadius:4,

tension:0.4
}
]

}

const options={

responsive:true,

maintainAspectRatio:true,

plugins:{
legend:{
labels:{
color:"#64748b"   // neutral gray
}
}
},

scales:{

x:{
ticks:{
color:"#64748b"
},
grid:{
color:"#cbd5e1"
}
},

y:{
ticks:{
color:"#64748b"
},
grid:{
color:"#cbd5e1"
}
}

}

}

return(

<div className="card">

<h3>Rockfall Risk Timeline</h3>

<div style={{height:"250px"}}>

<Line data={data} options={options}/>

</div>

</div>

)

}

export default RiskTimeline