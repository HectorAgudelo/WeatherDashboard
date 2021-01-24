//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//key: 553d585c0846075ef308968537c38ec7
//api.openweathermap.org/data/2.5/forecast?q=newyork&appid=553d585c0846075ef308968537c38ec7
//api.openweathermap.org/data/2.5/forecast/daily?q=chicago&cnt=5&appid=402816eb769161d2bf2eccbb8107f1e4

$(".btn").click(function (event) {

    event.preventDefault();


    var queryURL = inputCity();
console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(paramsResponse);


})

function inputCity() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var queryParams = {
        "appid": "553d585c0846075ef308968537c38ec7"
    };
    // put a city from the list when click here, give variable name queryParams.q. use a conditional if to switch between the 2 depending where the user clicks.
    queryParams.q = $(".city").html();
    console.log(queryParams.q)
    queryParams.q = $(".form-control").val().trim();
    queryParams.units = "imperial";
    //console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);

}


function paramsResponse(response) {
    cityInput(response);
   



    var icon = response.list[0].weather[0].icon;
    var iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    var time = response.list[0].dt;
    var cityName = response.city.name;
    var currentTemperature = response.list[0].main.temp;
    var currentHumidity = response.list[0].main.humidity;
    var currentWindSpeed = response.list[0].wind.speed;

    var cityInfo = $(`<h5>${cityName} (${timeConvertion(time)}) <img src = ${iconImage}></h5>`).addClass("cityInfo");
    var temp = $("<p>").html("Temperature: " + currentTemperature + "°F").addClass("temp");
    var humidity = $("<p>").html("Humidity: " + currentHumidity + "%").addClass("humidity");
    var windS = $("<p>").html("Wind Speed: " + currentWindSpeed + "MPH").addClass("windS")


    $(".jumbotron").empty(cityInfo, temp, humidity, windS);
    $(".jumbotron").append(cityInfo, temp, humidity, windS);


    $(".weatherDays").empty();
    for (var i = 7; i <= 39; i = i + 8) {
        var iconD = response.list[i].weather[0].icon;
        var iconImageD = `http://openweathermap.org/img/wn/${iconD}@2x.png`;
        var timeD = response.list[i].dt;
        var temperatureD = response.list[i].main.temp;
        var humidityD = response.list[i].main.humidity;

        $(".weatherDays").append(
            `<div class="card" style="width: 18rem;"> 
            <div class="card-body">
            <p class="card-title InfoDays">${timeConvertion(timeD)}</p>
            <img src = ${iconImageD}>
            <p class="card-subtitle mb-2 text-muted temp">Temp: ${temperatureD}°F</p>
            <p class="card-text humidity">Humidity: ${humidityD}%</p>
            </div>
            </div>`
        );

    }

}

function timeConvertion(time) {
    var myDate = new Date(time * 1000);
    var fixDate = myDate.toDateString();
    return fixDate;
}



var cities = [];

function cityInput(res) {

    var input = $(".form-control").val().trim();

    if (res) {
        cities.unshift(input);
    }
    if (cities.length > 5) {
        cities.pop();
    }
    localStorage.setItem("cities", JSON.stringify(cities));
    cities = JSON.parse(localStorage.getItem("cities"));
    $('#searched').html('');
    cities.forEach(element => {
        $('#searched').append(`<li class="city">${element}</li>`);
    });
}

cities = JSON.parse(localStorage.getItem("cities"));

cities.forEach(element => {
    $('#searched').append(`<li class="city">${element}</li>`);
});