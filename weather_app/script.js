// 

// Function to fetch weather data
async function fetchWeather(location) {
    const apiKey = 'DYYAYEJ6D5277HRU8RDCN8A8H'; // Replace with your Visual Crossing API key
    const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;

    try {
        const response = await fetch(endpoint); // Make the API request
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the data for now
    } catch (error) {
        console.error('Failed to fetch weather data:', error); // Handle errors
    }
}

// Test the function
fetchWeather('London');
