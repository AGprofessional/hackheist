import { Button } from "@mui/material";
import GetPred from "./GetPred";
import WatsonPredictor from "./WatsonPredictor";

export default function General(){
    return (
        <>
        <div className="main-div">
          <span className="four">4</span><span className="see">See</span> 
          </div>
        <h4 style={{color: "blue"}}>
          Our 1-year outlook is <span style={{padding: "2px", fontSize: "24px", color:"red"}}> Economic Growth </span>
        </h4>
        <div className="categories">
          <div className="box black">
              Terrorism, Conflicts
          </div>
          <div className="box green">
              Economic Growth
          </div>
          <div className="box purple">
              Economic Recession
          </div>
          <div className="box pink">
              Pandemic
          </div>
          <div className="box orange">
              Inflation
          </div><div className="box blue">
              Humanitarian Crisis
          </div>
          <div className="box red">
              Peace
          </div>
          <div className="box yellow">
              Civil War, World War
          </div>
        
          <div className="box brown">
              Climate Disaster
          </div>
          
        </div>
        <h2 style={{padding: "2px", fontSize: "24px", color:"red"}}>
          35% confidence 
        </h2>
        
      <Button style={{backgroundColor: "lightblue"}}>
        Refresh
      </Button>
      
        </>
    )
        
}