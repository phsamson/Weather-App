//Store the api key and base URL to the object variable named api.
const api = {
     key: "68139dfead3d5c8fb95fcb3ac5953588",
     base: "https://api.openweathermap.org/data/2.5/"
}

//When the content of the webpage is done loading, 
//run the code below to ask for the user's location
window.addEventListener('load', () => {
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
     } else {
          //Display the error message in the alert box.
          alert("Cannot get your location. Geolocation is not supported by this browser.");
     }
});

//Get the coordinates from the Geolocation and 
//pass the values of latitude and longitude to getLocation() function.
const showPosition = (position) => {
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;
     getLocation(latitude,longitude);
}

//Get the latitude and longitude of the user 
//and fetch the data from API using the latitude and longitude.
const getLocation = (lat,long) => {
     fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
     .then(weather => {
          if(weather.ok) {
               return weather.json()
          } else {
               //Display the error message in the console.
               throw Error(`Request rejected with status ${weather.status} because something went wrong...?`);
          }
     }).catch(console.error)
     .then(displayResults)
}

//Pass the value of defaultCity variable to getDefault() function 
//on load when the page is done loading its content.
window.addEventListener('load', () => {
     const defaultCity = "Manila";
     getDefault(defaultCity);
});

//Fetch the data of the default city.
const getDefault = (query) => {
     fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
     .then(weather => {
          if(weather.ok) {
               return weather.json()
          } else {
               //Display the error message in the console.
               throw Error(`Request rejected with status ${weather.status} because something went wrong...?`);
          }
     }).catch(console.error)
     .then(displayResults)
}

const searchBox = document.querySelector(".search-box");
//If user presses Enter key, run the code below.
searchBox.addEventListener('keypress', (e) => {
     if (e.keyCode == 13) {
          getResults(searchBox.value);
          console.log(searchBox.value);
          //After pressing Enter key, clear the search box.
          searchBox.value = "";
     }
});

//Gets the value of the search box and fetch the 
//data using the search box value from the API.
const getResults = (query) => {
     fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
          .then(weather => {
               if(weather.ok) {
                    return weather.json()
               } else {
                    //Display the error message in the console.
                    throw Error(`Request rejected with status ${weather.status} because you didn't type a valid country or city name you donut.`);
               }
          }).catch(console.error)
          .then(displayResults)
     }

const displayResults = (weather) => {
     console.log(weather);
     if(weather != undefined) {
          //Store the element with a specified class name to the variable city.
          let city = document.querySelector(".location__city");
          city.textContent = `${weather.name}, ${weather.sys.country}`;
          //Creates a date object and store to a variable currentDate
          let currentDate = new Date();
          let date = document.querySelector(".location__date");
          //Set the returned value to the element with a class name .location__date
          date.textContent = dateBuilder(currentDate);
          //Set the returned value to the element with a class name .current__temperature
          let currentTemperature = document.querySelector(".current__temperature");
          currentTemperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
          //Set the returned value to the element with a class name .current__weather
          let currentWeather = document.querySelector(".current__weather");
          currentWeather.textContent = `${weather.weather[0].main}`;
          //Set the returned value to the element with a class name .current__hi-low
          let currenthighLowTemp = document.querySelector(".current__hi-low");
          currenthighLowTemp.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
     }
}

//Build the dates
const dateBuilder = (currentDate) => {
     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     //.getDay() method returns a value of the day in an array and then assign the value 
     //of the variable day from days[] array using the value from .getDay() method.
     let day = days[currentDate.getDay()];
     let date = currentDate.getDate();
     //.getMonth() method returns a value of the day in an array and then assign the value 
     //of the variable month from months[] array using the value from .getMonth() method.
     let month = months[currentDate.getMonth()];
     let year = currentDate.getFullYear();
     //Return the value of variable day, date, month, and year.
     return `${day} ${date} ${month} ${year}`;
}