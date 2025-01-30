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
    const weatherData = processWeatherData(data,location);
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function processWeatherData(data) {
  // Extract relevant weather information
  return {
    temperature: data.currentConditions.temp,
    location: data.address,
    condition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    icon: data.currentConditions.icon, // This can be used for weather icon or gif
  };
}

document
  .getElementById("weather-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents page reload

    const locationInput = document
      .getElementById("location-input")
      .value.trim();

    if (!locationInput) {
      alert("Please enter a valid location!");
      return;
    }

    const weatherData = await fetchWeather(locationInput);

    if (weatherData) {
      console.log("Weather Data:", weatherData); // For debugging
    }

    displayWeather(weatherData)
  });

function displayWeather(weather) {
  const weatherContainer = document.getElementById("weather-data");

  weatherContainer.innerHTML = "";

  const locationElement = document.createElement("h2");
  locationElement.textContent = `Weather in ${weather.location}`;

  const tempElement = document.createElement("p");
  tempElement.textContent = `Temperature: ${weather.temperature}°C`;

  const conditionElement = document.createElement("p");
  conditionElement.textContent = `Condition: ${weather.condition}`;

  const humidityElement = document.createElement("p");
  humidityElement.textContent = `Humidity: ${weather.humidity}%`;

  const windSpeedElement = document.createElement("p");
  windSpeedElement.textContent = `Wind Speed: ${weather.windSpeed} km/h`;

  const iconElement = document.createElement("img");
  iconElement.src = `https://www.visualcrossing.com/icons/${weather.icon}.png`;
  iconElement.alt = weather.condition;

  weatherContainer.appendChild(locationElement);
  weatherContainer.appendChild(tempElement);
  weatherContainer.appendChild(conditionElement);
  weatherContainer.appendChild(humidityElement);
  weatherContainer.appendChild(windSpeedElement);
  weatherContainer.appendChild(iconElement);
}

// Test the function
fetchWeather("Boston");
