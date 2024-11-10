import { Button } from "@mui/material";

export default function Health(){
    return (
        <>
        <h3>
        Health Diagnostic and Simulation
      </h3>

      <h4 style={{color: "blue"}}>
          Our 1-year outlook is <span style={{padding: "2px", fontSize: "24px", color:"red"}}> Obesity </span> caused by stress
        </h4>
      <Button style={{backgroundColor: "lightblue"}}>
        Refresh
      </Button>

      
        </>
    )
}