import { useState } from "react"

function ThemeToggle(){

const [dark,setDark] = useState(true)

const toggleTheme = () => {

setDark(!dark)

document.body.style.background =
dark ? "#f1f5f9" : "#0f172a"

document.body.style.color =
dark ? "#111" : "#e2e8f0"

}

return(

<button onClick={toggleTheme}>
{dark ? "Light Mode" : "Dark Mode"}
</button>

)

}

export default ThemeToggle