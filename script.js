
let weatherBtn = document.querySelector("#weatherBtn");
let cityName = document.querySelector("#cityName");
let countryImg = document.querySelector("#countryFlag");
let temperature = document.querySelector("#temperature");
let skyType = document.querySelector("#skyType");
let API_KEY = '14e97be1d030496ab8d9dd8e5f71fe29';
function getCurrentLocationWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async function(position){
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();
           if(data.cod === "400"){
            alert('Location Not Found!');
            return;
           }
           else{
            displayWeatherData(data);
            document.querySelector(".weatherInfo").classList.add("visible");
            document.querySelector(".inputAndBtn").classList.add("visibleCity");
            setInterval(getCurrentTime(data), 1000);
           }
        })
    }
    document.querySelector(".buttons").classList.add("visibleBtn")
}

async function getWeatherData(){

    let windSpeed = document.querySelector("#windspeed");
    const API_KEY = '14e97be1d030496ab8d9dd8e5f71fe29';
    let city = document.getElementById("inputCity").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    if(data.cod === "400"){
        alert('City not found!');
        return;
    }
    else{
        displayWeatherData(data);
        document.querySelector(".weatherInfo").classList.add("visible");
        document.querySelector(".inputAndBtn").classList.add("visibleCity");
        setInterval(getCurrentTime(data), 1000);
    }
    }
    function displayWeatherData(data){
        let weatherImg = document.querySelector("#weatherImg");
        let humidity = document.querySelector("#humidity");
        let countryCode = data.sys.country;
        let weatherImageSrc = data.weather[0].icon;
        countryImg.src = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
        weatherImg.src = `http://openweathermap.org/img/w/${weatherImageSrc}.png`
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity;
        temperature.innerText = `${data.main.temp} .C`;
        skyType.innerHTML = data.weather[0].description;
        windSpeed.innerHTML = `${data.wind.speed} m/s`;
    }
    function getCurrentTime(data){
        let printDate = document.querySelector("#date");
        let printTime = document.querySelector("#time");
        let date = new Date(data.dt * 1000);
        let currentDate = date.toLocaleDateString();
        let currentTime = date.toLocaleTimeString();
        printDate.innerHTML = currentDate;
        printTime.innerHTML = currentTime;
    }