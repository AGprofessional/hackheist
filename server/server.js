const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 5000;

const API_KEY = "cpd-apikey-IBMid-694000AZBP-2024-11-10T06:23:30Z"; // Replace with your actual IBM Cloud API key
const scoringUrl = "https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/uniquename0/predictions?version=2021-05-01";

// Enable CORS for all origins or specify only your React app's origin
app.use(cors({
  origin: 'http://localhost:3000', // Only allow requests from this origin
}));

app.use(bodyParser.json());

app.post('/get-prediction', async (req, res) => {
  try {
    // Get IAM token
    const tokenResponse = await axios.post(
      'https://iam.cloud.ibm.com/identity/token',
      'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' + API_KEY,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    );

    const token = tokenResponse.data.access_token;
    const payload = req.body; // The payload sent from the frontend

    // Call the scoring endpoint
    const scoringResponse = await axios.post(scoringUrl, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    res.json(scoringResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error processing prediction request" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
