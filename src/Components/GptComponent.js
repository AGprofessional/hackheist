import { useState } from "react";



// Add your IBM Cloud API key here
const API_KEY = "cpd-apikey-IBMid-694000AZBP-2024-10-01T22:47:42Z";
const TOKEN_URL = "https://iam.cloud.ibm.com/identity/token";
const SCORING_URL = "https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/uniquename0/predictions?version=2021-05-01";
// Function to get the Bearer token
async function getToken() {
    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${API_KEY}`,
    });

    if (!response.ok) {
        throw new Error("Failed to get token: " + response.statusText);
    }

    const data = await response.json();
    return data.access_token;
}

// Function to send data to the Watson ML model and get predictions
async function getPrediction(inputFields, inputValues) {
    try {
        const token = await getToken();

        const payload = {
            input_data: [
                {
                    fields: inputFields, // e.g., ["field1", "field2"]
                    values: [inputValues], // e.g., [["value1", "value2"]]
                },
            ],
        };

        const response = await fetch(SCORING_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to get prediction: " + response.statusText);
        }

        const predictionData = await response.json();
        console.log("Prediction:", predictionData);
        return predictionData;
    } catch (error) {
        console.error("Error in prediction request:", error);
        throw error;
    }
}

// Usage example in a React component
export default function GptComponent() {
    const [prediction, setPrediction] = useState("");
    const inputFields = [
        "Date",
        "S&P 500 Close",
        "Average Price: Flour, White, All Purpose (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Rice, White, Long Grain, Precooked (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Spaghetti and Macaroni (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bread, White, Pan (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bread, French (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bread, Whole Wheat, Pan (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cupcakes, Chocolate (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cookies, Chocolate Chip (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Crackers, Soda, Salted (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ground Chuck, 100% Beef (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ground Beef, 100% Beef (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Chuck Roast, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Round Roast, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Rib Roast, USDA Choice, Bone-In (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, Rib Eye, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Beef for Stew, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, Round, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, Sirloin, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bacon, Sliced (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ham, Boneless, Excluding Canned (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bologna, All Beef or Mixed (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Beef Liver (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Lamb and Mutton, Bone-In (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Chicken Legs, Bone-In (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Turkey, Frozen, Whole (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Tuna, Light, Chunk (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Milk, Fresh, Skim (Cost per One-Half Gallon/1.9 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Milk, Fresh, Low Fat, per One-Half Gallon (1.9 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: American Processed Cheese (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cheddar Cheese, Natural (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ice Cream, Prepackaged, Bulk, Regular, per One-Half Gallon (1.9 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Apples, Red Delicious (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Lemons (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Strawberries, Dry Pint (Cost per 12 Ounces/340.2 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Grapes, Thompson Seedless (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Potatoes, White (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Lettuce, Iceberg (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Tomatoes, Field Grown (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cabbage (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Carrots, Short Trimmed and Topped (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Onions, Dry Yellow (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Onions, Green Scallions (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Peppers, Sweet (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cucumbers (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Beans, Green, Snap (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Mushrooms (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Orange Juice, Frozen Concentrate, 12 Ounce Can (Cost per 16 Ounces/473.2 Milliliters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Potatoes, Frozen, French Fried (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Corn, Canned, Any Style, All Sizes (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Beans, Dried, Any Type, All Sizes (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Hard Candy, Solid (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Jelly (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Margarine, Soft, Tubs (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Peanut Butter, Creamy, All Sizes (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cola, Nondiet (Cost per 2 Liters/67.6 Ounces) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Coffee, 100%, Ground Roast, All Sizes (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Potato Chips (Cost per 16 Ounces) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Pork and Beans, Canned (Cost per 16 Ounces/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Malt Beverages, All Types, All Sizes, Any Origin (Cost per 16 Ounces/473.2 Milliliters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bourbon Whiskey, 375 Milliliters-1.75 Liters (Cost per 25.4 Ounces/750 Milliliters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Vodka, All Types, All Sizes, Any Origin (Cost per 1 Liter/33.8 Ounces) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Wine, Red and White Table, All Sizes, Any Origin (Cost per 1 Liter/33.8 Ounces) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Fuel Oil #2 per Gallon (3.785 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Automotive Diesel Fuel (Cost per Gallon/3.785 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, All Types (Cost per Gallon/3.785 Liters) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Uncooked Ground Beef (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Uncooked Beef Roasts (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Ham (Excluding Canned Ham and Luncheon Slices) (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Pork Chops (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Other Pork (Excluding Canned Ham and Luncheon Slices) (Cost per Pound/453.6 Grams) in U.S. City Average, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, Rib Eye, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bacon, Sliced (Cost per Pound/453.6 Grams) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Eggs, Grade A, Large (Cost per Dozen) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Milk, Fresh, Low Fat, per One-Half Gallon (1.9 Liters) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Apples, Red Delicious (Cost per Pound/453.6 Grams) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Sugar, White, 33-80 Ounce Package (Cost per Pound/453.6 Grams) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Shortening, Vegetable Oil Blends (Cost per Pound/453.6 Grams) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Cola, Non-Diet, Return Bottles, 6 or 8 Pack (Cost per 16 Ounces/473.2 Milliliters) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Automotive Diesel Fuel (Cost per Gallon/3.785 Liters) in the Northeast Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bread, White, Pan (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ground Beef, 100% Beef (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, T-Bone, USDA Choice, Bone-In (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Eggs, Grade A, Large (Cost per Dozen) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Oranges, Navel (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Tomatoes, Field Grown (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Uncooked Ground Beef (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: All Ham (Excluding Canned Ham and Luncheon Slices) (Cost per Pound/453.6 Grams) in the Midwest Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Rice, White, Long Grain, Uncooked (Cost per Pound/453.6 Grams) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ground Beef, 100% Beef (Cost per Pound/453.6 Grams) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Bologna, All Beef or Mixed (Cost per Pound/453.6 Grams) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Ice Cream, Prepackaged, Bulk, Regular, per One-Half Gallon (1.9 Liters) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Lettuce, Iceberg (Cost per Pound/453.6 Grams) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Beans, Dried, Any Type, All Sizes (Cost per Pound/453.6 Grams) in the South Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, T-Bone, USDA Choice, Bone-In (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Steak, Sirloin, USDA Choice, Boneless (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Chicken, Fresh, Whole (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Eggs, Grade AA, Large (Cost per Dozen) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Lemons (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Strawberries, Dry Pint (Cost per 12 Ounces/340.2 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Potatoes, White (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Tomatoes, Field Grown (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Mushrooms (Cost per Pound/453.6 Grams) in the West Census Region - Urban, U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Boston-Cambridge-Newton, MA-NH (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Boston-Cambridge-Newton, MA-NH (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in New York-Newark-Jersey City, NY-NJ-PA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in New York-Newark-Jersey City, NY-NJ-PA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Philadelphia-Camden-Wilmington, PA-NJ-DE-MD (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, All Types (Cost per Gallon/3.785 Liters) in Philadelphia-Camden-Wilmington, PA-NJ-DE-MD (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Chicago-Naperville-Elgin, IL-IN-WI (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Chicago-Naperville-Elgin, IL-IN-WI (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, Unleaded Regular (Cost per Gallon/3.785 Liters) in Chicago-Naperville-Elgin, IL-IN-WI (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, All Types (Cost per Gallon/3.785 Liters) in Chicago-Naperville-Elgin, IL-IN-WI (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, Unleaded Premium (Cost per Gallon/3.785 Liters) in Detroit-Warren-Dearborn, MI (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Miami-Fort Lauderdale-West Palm Beach, FL (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, All Types (Cost per Gallon/3.785 Liters) in Atlanta-Sandy Springs-Roswell, GA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, Unleaded Premium (Cost per Gallon/3.785 Liters) in Dallas-Fort Worth-Arlington, TX (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Houston-The Woodlands-Sugar Land, TX (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Houston-The Woodlands-Sugar Land, TX (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, Unleaded Regular (Cost per Gallon/3.785 Liters) in Houston-The Woodlands-Sugar Land, TX (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Los Angeles-Long Beach-Anaheim, CA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Los Angeles-Long Beach-Anaheim, CA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in San Francisco-Oakland-Hayward, CA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in San Francisco-Oakland-Hayward, CA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Gasoline, Unleaded Regular (Cost per Gallon/3.785 Liters) in San Francisco-Oakland-Hayward, CA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Electricity per Kilowatt-Hour in Seattle-Tacoma-Bellevue WA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Average Price: Utility (Piped) Gas per Therm in Seattle-Tacoma-Bellevue WA (CBSA), U.S. Dollars, Monthly, Not Seasonally Adjusted",
        "Crude Oil Prices: West Texas Intermediate (WTI) - Cushing, Oklahoma, Dollars per Barrel, Daily, Not Seasonally Adjusted",
        "Conventional Gasoline Prices: New York Harbor, Regular, Dollars per Gallon, Daily, Not Seasonally Adjusted",
        "Conventional Gasoline Prices: U.S. Gulf Coast, Regular, Dollars per Gallon, Daily, Not Seasonally Adjusted",
        "Henry Hub Natural Gas Spot Price, Dollars per Million BTU, Daily, Not Seasonally Adjusted",
        "Propane Prices: Mont Belvieu, Texas, Dollars per Gallon, Daily, Not Seasonally Adjusted",
        "US All Grades All Formulations Gas Price, Dollars per Gallon, Monthly, Not Seasonally Adjusted",
        "PADD III (Gulf Coast District) Diesel Sales Price, Dollars per Gallon, Weekly, Not Seasonally Adjusted",
        "PADD II (Midwest District) Diesel Sales Price, Dollars per Gallon, Weekly, Not Seasonally Adjusted",
        "US Diesel Sales Price, Dollars per Gallon, Weekly, Not Seasonally Adjusted",
        "Spot Oil Price: West Texas Intermediate (DISCONTINUED), Dollars per Barrel, Monthly, Not Seasonally Adjusted",
        "Global price of Aluminum, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Bananas, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Barley, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Beef, U.S. Cents per Pound, Quarterly, Not Seasonally Adjusted",
        "Global price of Coal, Australia, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Cocoa, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Coffee, Other Mild Arabica, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Coffee, Robustas, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Copper, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Cotton, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Food and beverage index, Index 2016 = 100, Quarterly, Not Seasonally Adjusted",
        "Global price of Fish Meal, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Fish Meal, U.S. Dollars per Metric Ton, Quarterly, Not Seasonally Adjusted",
        "Global price of Food index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of Groundnuts, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Hides, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Industrial Materials index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of Iron Ore, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Lamb, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Lead, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Corn, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Metal index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of Natural gas, EU, U.S. Dollars per Million Metric British Thermal Unit, Monthly, Not Seasonally Adjusted",
        "Global price of LNG, Asia, U.S. Dollars per Million Metric British Thermal Unit, Monthly, Not Seasonally Adjusted",
        "Global price of Natural Gas, US Henry Hub Gas, U.S. Dollars per Million Metric British Thermal Unit, Monthly, Not Seasonally Adjusted",
        "Global price of Nickel, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Energy index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of APSP crude oil index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of APSP crude oil, U.S. Dollars per Barrel, Monthly, Not Seasonally Adjusted",
        "Global price of Brent Crude, U.S. Dollars per Barrel, Quarterly, Not Seasonally Adjusted",
        "Global price of Dubai Crude, U.S. Dollars per Barrel, Monthly, Not Seasonally Adjusted",
        "Global price of WTI Crude, U.S. Dollars per Barrel, Monthly, Not Seasonally Adjusted",
        "Global price of Olive Oil, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Orange, U.S. Dollars per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Palm Oil, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Poultry, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Agr. Raw Material Index, Index 2016 = 100, Monthly, Not Seasonally Adjusted",
        "Global price of Rice, Thailand, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Rapeseed Oil, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Rubber, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Fish, U.S. Dollars per Metric Ton, Annual, Not Seasonally Adjusted",
        "Global price of Hard Sawnwood, Dark Red Meranti, U.S. Dollars per Cubic Meter, Monthly, Not Seasonally Adjusted",
        "Global price of Soft Sawnwood, Average of Softwoods,, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Shrimp, U.S. Dollars per Kilogram, Monthly, Not Seasonally Adjusted",
        "Global price of Soybean Meal, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Soybeans Oil, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Soybeans, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Sugar, EU, U.S. Cents per Pound, Quarterly, Not Seasonally Adjusted",
        "Global price of Sugar, No. 11, World, U.S. Cents per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Sugar, No. 16, US, U.S. Cents per Pound, Quarterly, Not Seasonally Adjusted",
        "Global price of Sunflower Oil, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Tea, Kenyan, U.S. Cents per Kilogram, Monthly, Not Seasonally Adjusted",
        "Global price of Tin, U.S. Dollars per Metric Ton, Quarterly, Not Seasonally Adjusted",
        "Global price of Uranium, U.S. Dollars per Pound, Monthly, Not Seasonally Adjusted",
        "Global price of Wheat, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Global price of Wool, Coarse, U.S. Cents per Kilogram, Monthly, Not Seasonally Adjusted",
        "Global price of Wool, Fine, U.S. Cents per Kilogram, Monthly, Not Seasonally Adjusted",
        "Global price of Zinc, U.S. Dollars per Metric Ton, Monthly, Not Seasonally Adjusted",
        "Kerosene-Type Jet Fuel Prices: U.S. Gulf Coast, Dollars per Gallon, Weekly, Not Seasonally Adjusted"
]; // Define your fields
    
    const stringof = "5633.09	0.57	1.35	1.42	1.98	1.84	2.67	2.36	5.05	1.63	5.64	5.50	7.69	7.16	5.21	8.07	7.30	8.23	11.54	6.88	5.63	2.79	0.99	3.31	1.84	1.64	3.17	3.98	1.01	1.38	4.84	5.76	6.36	1.32	1.96	2.17	2.36	1.01	1.52	1.95	0.70	0.76	0.46	1.29	2.44	0.99	0.98	1.99	4.27	0.90	1.31	1.71	2.01	0.93	1.73	2.48	1.31	6.31	6.32	0.43	1.79	7.42	12.50	13.96	3.55	0.18	1.40	3.77	3.65	5.87	7.63	4.69	4.40	3.69	6.21	7.71	3.55	4.49	1.34	1.39	0.46	1.01	0.35	3.98	3.80	2.05	5.74	6.68	3.17	1.63	1.93	6.03	5.10	1.20	5.10	2.42	6.49	1.23	1.61	4.09	13.11	2.15	3.04	1.84	2.79	0.93	2.00	1.91	0.31	1.56	0.28	1.56	1.39	3.50	0.17	4.09	4.67	1.06	1.51	0.14	3.35	0.18	1.48	2.97	0.18	2.50	3.60	0.16	0.28	1.63	0.38	2.46	4.70	0.26	1.55	0.14	1.74	0.42	1.93	0.42	80.34	69.65	2.12	2.08	2.04	1.94	1.91	0.78	2.38	15936.11	564805851.07	3.51	3.56	3.53	3.63	6.80	104.61	168.62	2349.13	1042.52	139.84	267.74	141.99	7164.63	257.10	214.70	9385.31	81.38	140.98	1404.86	1430.72	129.45	2497.33	60.22	156.11	107.39	122.10	1999.11	177.77	183.43	156.71	10.23	12.00	2.10	16334.88	185.92	188.59	78.60	84.98	85.20	81.95	8856.58	4.55	860.59	162.56	101.97	566.39	1040.52	94.75	8.96	704.79	309.26	7.08	355.48	912.56	411.08	21.27	19.35	38.25	1287.89	323.45	32168.78	68.25	219.53	877.45	913.63	2777.27	2.13"
// Split the string by spaces to get each number
const numbersArray = stringof.split(" ");

// Wrap each number in quotes
const formattedArray = numbersArray.map(num => `"${num}"`);

// Create an array variable and insert the formatted values
const inputValues = [`${formattedArray.join(", ")}`];   

// const inputFields = ["field1", "field2"]; // Define your fields
   // const inputValues = ["value1", "value2"]; // Define your values
/*

const inputValues = ["9/16/2024", "5633.09", "0.57", "1.35", "1.42","1.98",	"1.84",	"2.67",	"2.36",	"5.05",	"1.63",	"5.64",	"5.50", 
        	"7.69",	"7.16",	"5.21",	"8.07",	"7.30",	"8.23",	"11.54",	"6.88",	"5.63",	"2.79",	"0.99",	"3.31",	"1.84",	"1.64",	"3.17",	"3.98",	"1.01",
            	"1.38",	"4.84",	"5.76",	"6.36",	"1.32",	"1.96",	"2.17",	"2.36",	"1.01",	"1.52",	"1.95",	"0.70"	,"0.76",	"0.46",	"1.29",	"2.44",	
                "0.99",	"0.98"	,"1.99"	,"4.27",	"0.90",	"1.31",	"1.71",	"2.01",	"0.93"	,"1.73",	"2.48",	"1.31",	"6.31", "6.32",
                	"0.43",	"1.79",	"7.42",	"12.50",	"13.96",	"3.55",	"0.18",	"1.40",	"3.77",	"3.65",	"5.87",	"7.63",	"4.69",	"4.40",	"3.69",	"6.21",
                    	"7.71",	"3.55",	"4.49"	,"1.34",	"1.39"	,"0.46",	"1.01",	"0.35",	"3.98",	"3.80",	"2.05",	"5.74", "6.68",	"3.17",	"1.63",	"1.93",
                        	"6.03"	,"5.10"	,"1.20",	"5.10",	"2.42",	"6.49"	,"1.23",	"1.61",	"4.09",	"13.11",	"2.15"	,"3.04",	"1.84",	"2.79",	"0.93",	"2.00",
                            	"1.91",	"0.31",	"1.56",	"0.28",	"1.56",	"1.39","	3.50",	"0.17",	"4.09",	"4.67",	"1.06",	"1.51",	"0.14",	"3.35",	"0.18",	"1.48",
                                "2.97",	"0.18",	"2.50",	"3.60"	,"0.16",	"0.28",	"1.63",	"0.38"	,"2.46",	"4.70",	"0.26",	"1.55"	,"0.14",	"1.74"	, "0.42",	
                                "1.93",	"0.42",
                                	"80.34",	"69.65",	"	2.08"	"2.04"	"1.94"	"1.91"	"0.78"	"2.38"	"15936.11"	"564805851.07"	"3.51"	"3.56"	"3.53"	"3.63"
                                    	6.80	104.61	168.62	2349.13	1042.52	139.84	267.74	141.99	7164.63	257.10	"214.70"	"9385.31"	"81.38"	"140.98"	"1404.86"	"1430.72"
                                        	129.45	2497.33	60.22	156.11	107.39	122.10	1999.11	177.77	"183.43"	"156.71"	"10.23"	"12.00"	"2.10"	"16334.88"	"185.92"
                                            	188.59	78.60	84.98	85.20	81.95	8856.58	"4.55"	"860.59	""162.56"	"101.97"	"566.39"	"1040.52"	"94.75"	"8.96"	"704.79"	
                                                309.26	7.08	355.48	912.56	411.08	"21.27"	"19.35"	"38.25"	"1287.89"	'323.45'	"32168.78"	"68.25"	"219.53"	"877.45"	"913.63"	2777.27	2.13
    ]; // Define your values

*/
    const handleGetPrediction = async () => {
        try {
            const predictionW = await getPrediction(inputFields, inputValues);
            setPrediction(predictionW)
            console.log("Prediction result:", prediction);
        } catch (error) {
            console.error("Error getting prediction:", error);
        }
    };

    return (
        <div>
            <h1>Watson ML Prediction</h1>
            <button onClick={handleGetPrediction}>Get Prediction</button>
            <h1> Finance: {prediction} </h1>
        </div>
    );
}

