//

// Function to fetch weather data
async function fetchWeather(location) {
  const apiKey = "DYYAYEJ6D5277HRU8RDCN8A8H"; // Replace with your Visual Crossing API key
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`http req: ${res.status}`);
    }
    const data = await res.json();
    const weather = processWeatherData(data);
    console.log(weather);
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function processWeatherData(data) {
  // Extract relevant weather information
  return {
    temperature: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    icon: data.currentConditions.icon, // This can be used for weather icon or gif
  };
}

// Test the function
fetchWeather("London");
