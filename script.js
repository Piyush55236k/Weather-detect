const input = document.querySelector("#input");
const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
const api_key = `1abaef6b2e5f38e5e84efb3089360aa8`;
const api_key2=`f8ed52d0278c91608390b532e30e7b63`;
let dataDiv;

const getData = async () => {
    console.log("Button clicked");

    const city = input.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const newUrl = `https://api.weatherstack.com/current?access_key=${api_key2}&query=${city}`;

    try {
        const response = await fetch(newUrl);
        const data = await response.json();

        if (!data.current || !data.location) {
            alert("Invalid city or no data found.");
            return;
        }

        if (!dataDiv) {
            dataDiv = document.createElement("div");
            dataDiv.className = "Data";
            document.body.appendChild(dataDiv);
        }

        dataDiv.innerHTML = `
            <p>The temperature in ${city} is ${data.current.temperature}°C</p>
            <p>The Wind Direction is: ${data.current.wind_dir}</p>
            <p>The Wind Speed is: ${data.current.wind_speed}</p>
            <p>The Latitude is: ${data.location.lat}</p>
            <p>The Longitude is: ${data.location.lon}</p>
            <p>The Local Time is: ${data.location.localtime}</p>
        `;
    } catch (error) {
        console.error("Error fetching or displaying data:", error);
        alert("Something went wrong. Check the console.");
    }
};

btn.addEventListener("click", (e) => {
    e.preventDefault(); // 🛑 Stop the form from reloading the page
    getData();
});
