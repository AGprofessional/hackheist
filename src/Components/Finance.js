import { Button } from "@mui/material";
import { useState } from "react";

export default function Finance(){
    return (
        <>
        <h1>
          Finance Prediction: <span style={{color: "red"}}> Economic Growth </span>
        </h1>
        <h3>
        Transactions done by 4See Broker
        <ViewPL />
      </h3>
      
      <Button>
Refresh
     {/**when you click demo, then in general also updates with the finance prediction, but on this tab, it shows that x bitcoin was sold or bought or stock was bought or sold as an entry on table and verbwire wallet gets updated to reflect change */}
      {/**coinbase wallet is cassandra exchange wallet - buy eth == transfer 0.0001 eth to verbwire wallet  */}
      </Button>
       <ViewWallet />
        </>
    )
}
//coinbase account: api key name: organizations/033f6b6f-3547-4488-aaec-c864f5fb3f44/apiKeys/234531bb-4007-4d69-a461-fb2ef55b44d5
//coinbase account private key: -----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIJqVh253vf9c1rK/UHQQLdFLcw36gcDIq3y3gCpUtKeioAoGCCqGSM49\nAwEHoUQDQgAExm9jmJz5DPOr1HeyfGFldwPsPZiOzM1QsYoFNrL8AYknskCOFeq0\nbhuTLDxcXd68HgZtwcADLl40Xn+O51dqmw==\n-----END EC PRIVATE KEY-----\n
//ibm watson api: cpd-apikey-IBMid-694000AZBP-2024-10-01T22:47:42Z
//public api key for verbwire api: pk_live_43b17a70-002f-42b5-90d3-58ee05b06d56
//verbwire wallet password: hackHeist1@
//i created a wallet using my email: gopalkrishnana@rider.edu
//deployed wallet application id: WMyyqyOh_FKGKr8teSGMi
//wallet link: https://wallet.verbwire.com/WMyyqyOh_FKGKr8teSGMi
//eth address: 0x682934bFf2649Cda156Fc28720352B81d4B98E5c
//alchemy api key: 7snPOyyk1LkPDggLFKQ_t9RC2NF3zqUM

//simulate bank account with a supabase database and display that as my wallet.
//need to display number of tokens in my verbwire wallet.

function ViewPL(){
  return(
   <div style={{color: "orange", paddingLeft: "400px"}}>
     <table>
      <tbody>
  <tr>
    <th className="th">Date</th>
    <th className="th">Coin/Stock</th>
    <th className="th">Bought/Sold Amount</th>
  </tr>
  <tr>
    <td>11/9/2024</td>
    <td>Bitcoin</td>
    <td>+0.001</td>
  </tr>
  <tr>
    <td>10/8/2024</td>
    <td>S&P 500</td>
    <td>-$100</td>
  </tr>

  <tr>
    <td>9/8/2024 </td>
    <td>TSLA</td>
    <td>+$59</td>
  </tr>
  </tbody>
</table> 
    
   </div>
  )}

  //during the demo, buy == send tokens to the verbwire wallet to simulate buying the coins
function ViewWallet(){
  const [cassandraWallet, setWallet] = useState(0.00);
  return(
    <div className="finance-wallet">
      <h2>
        You have <span style={{color: "blue"}}>${cassandraWallet}</span> funds available to purchase securities.
      </h2>
    
    <div >
    <Button className="btn-finance" onClick={()=>(setWallet(cassandraWallet+100))}>
      $100 Instant Deposit
    </Button>

    <Button className="btn-finance" onClick={()=>(setWallet(0))}>
      WITHDRAW
    </Button>
    </div>
    </div>
  )
}