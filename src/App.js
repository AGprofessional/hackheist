import logo from './logo.svg';
import './App.css';
import General from './Components/General';
import Finance from './Components/Finance';
import Education from './Components/Education';
import Health from './Components/Health';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [clicked, setClicked] = useState("general")
  return (
    <div className='App'> 
      
     <nav>
      <Button className="btn" style={{borderBottom: "black 3px solid"}} onClick={()=>(setClicked("general"))}>
        Home
      </Button>
      <Button className="btn" style={{borderBottom: "black 3px solid"}} onClick={()=>{setClicked("finance")}}>
        Automatic Buy/Sell Securities
      </Button>
      
        <Button className="btn" style={{borderBottom: "black 3px solid"}} onClick={()=>{setClicked("healthcare")}}>  Simulation for Medical Diagnoses and Pre-care </Button>
      
      <Button className="btn" style={{borderBottom: "black 3px solid"}} onClick={()=>{setClicked("education")}}>
        Education and Interaction
      </Button>
      {clicked=="general"?
      <General />: clicked=="finance" ? <Finance /> : clicked=="healthcare" ? <Health /> : clicked=="education" ? <Education /> : "nothing to display"}

      </nav>
      <div>
       
      </div>
    </div>
  );
}

export default App;
