//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//key: 553d585c0846075ef308968537c38ec7
//api.openweathermap.org/data/2.5/forecast?q=newyork&appid=553d585c0846075ef308968537c38ec7
$(".btn").click(function(event){
    event.preventDefault();
    var queryURL = inputCity();
    $.ajax({
        url: queryURL,
        method: "GET"
    }). then(paramsResponse);
})

function inputCity (){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var queryParams = {"appid":"553d585c0846075ef308968537c38ec7"};
    queryParams.q = $(".form-control").val().trim();
    queryParams.units = "imperial";
    //console.log(queryURL+$.param(queryParams));
    return queryURL+$.param(queryParams);
}



function paramsResponse (response){
var cityName = response.city.name;
var currentTemperature = response.list[0].main.temp;
var currentHumidity = response.list[0].main.humidity;
var currentWindSpeed = response.list[0].wind.speed;
console.log(response, "\n", currentWindSpeed);
}