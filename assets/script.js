var apiKey = "ea817254ecd893690e00ff895b7b9fbb";
var date = dayjs().format('dddd MMM D, YYYY');

$(document).ready(function() {
    var currentConditions = $('#current-conditions');
    var weatherForecast = $('#weather-forecast');
    var weatherIcon = $('#weather-icon');

    // on clicking search button, set entered city to var=city and set to local storage

    $('#search-button').on('click', function() {
        var city = $('#city-input').val();
        cityWeather(city);
        localStorage.setItem('city-input', city);
    })

    // function for when user hits enter key after entering city name

    $('#city-input').keypress(function(event) {
        if(event.which == 13) {
            $('#search-button').click();
        }
    })

    // useing API key to fetch data and icon for current weather and append to currentCondition

    function cityWeather(city) {
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;

        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            weatherIcon.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`);
            currentConditions.text(date);
            currentConditions.append(`<p> </p>`);
            currentConditions.append(`<i class="fa-solid fa-temperature-full"></i>`, `<p>temp: ${data.main.temp} °F</p>`);
            currentConditions.append(`<i class="fa-solid fa-droplet"></i>`, `<p>humidity: ${data.main.humidity}</p>`);
            currentConditions.append(`<i class="fa-solid fa-wind"></i>`, `<p>wind speed: ${data.wind.speed} m/h</p>`);
        })
        .then(function() {
            forecast(city);
        })
    }

    //create forecast function for 5-day forecast previously called
    
    function forecast(city) {
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

        fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            for(let i = 0; i<response.list.length; i+=8) {
                var data = response.list[i];

                var container = $("<div> </div>");

                //appended containers for 5-day weather info and icons

                container.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`);
                container.append(`<p>  </p>`);
                container.append(`<i class="fa-solid fa-temperature-full"></i>`, `<p>temp: ${data.main.temp} °F</p>`);
                container.append(`<i class="fa-solid fa-wind"></i>`, `<p>wind: ${data.wind.speed} m/h</p>`);
                container.append(`<i class="fa-solid fa-droplet"></i>`, `<p>humidity: ${data.main.humidity}</p>`);
                weatherForecast.append(container);
            }
        })
    }


});