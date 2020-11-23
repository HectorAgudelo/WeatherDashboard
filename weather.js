//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//key: 553d585c0846075ef308968537c38ec7
//api.openweathermap.org/data/2.5/forecast?q=newyork&appid=553d585c0846075ef308968537c38ec7
//api.openweathermap.org/data/2.5/forecast/daily?q=chicago&cnt=5&appid=402816eb769161d2bf2eccbb8107f1e4
$(".btn").click(function (event) {
    event.preventDefault();
    var queryURL = inputCity();
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(paramsResponse);
})

function inputCity() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var queryParams = { "appid": "553d585c0846075ef308968537c38ec7" };
    queryParams.q = $(".form-control").val().trim();
    queryParams.units = "imperial";
    //console.log(queryURL+$.param(queryParams));
    return queryURL + $.param(queryParams);
}


function paramsResponse(response) {
   
    var list = response.list;
    console.log(list)
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

    $(".jumbotron").append(cityInfo, temp, humidity, windS);
    
    for (var i = 8; i <= 40; i=i+8){
        console.log(i);
    }
  
}

function timeConvertion(time) {
    var myDate = new Date(time * 1000);
    var fixDate = myDate.toDateString();
    return fixDate;
}