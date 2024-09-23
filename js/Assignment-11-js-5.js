var inputSearch = document.getElementById("search")

var todaynam = document.getElementById("today")
var todayNum = document.getElementById("date-number")
var todayMonth = document.getElementById("date-month")
var todayLocation = document.getElementById("Locat")
var todayTemp = document.getElementById("today-temp")
var todayImg = document.getElementById("today-img")
var todayText = document.getElementById("weather-text")
var Humidity = document.getElementById("Humidity")
var wind = document.getElementById("wind")
var windDirection = document.getElementById("windDirection")

var nextday = document.getElementsByClassName("next-day")
var nextImg = document.getElementsByClassName("next-img")
var nextMax = document.getElementsByClassName("next-max")
var nextMin = document.getElementsByClassName("next-min")
var nextText = document.getElementsByClassName("next-weather-text")



async function dateweather(cityname){
    var weather3days = await (await fetch(`http://api.weatherapi.com/v1/forecast.json?key=caa7a0fe5b58463f880125238242309&q=${cityname}&days=3`)).json()
    return weather3days
     
}

function weathertodaydata(data){
    var datetoday = new Date()
    todaynam.innerHTML = datetoday.toLocaleDateString("en-US",{weekday:"long"})
    todayNum.innerHTML = datetoday.getDate()
    todayMonth.innerHTML = datetoday.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayText.innerHTML = data.current.condition.text
    Humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
    todayImg.setAttribute("src","https:"+data.current.condition.icon)
    
}

// current
// forecast
// location

function weathernextdaydata(data){
    for( var i = 0 ; i<2 ; i++){
        var datenextday = new Date(data.forecast.forecastday[i+1].date)        
        nextday[i].innerHTML = datenextday.toLocaleDateString("en-US",{weekday:"long"})
        nextMax[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        nextMin[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
        nextImg[i].setAttribute("src","https:"+data.forecast.forecastday[i+1].day.condition.icon)

    }
}


async function run(city="london"){
   var dateweathertoday = await dateweather(city)
   if(!dateweathertoday.error){
    weathertodaydata(dateweathertoday)
   weathernextdaydata(dateweathertoday)
   }
   
}
run()


inputSearch.addEventListener("input",function(){
    run(inputSearch.value)
})