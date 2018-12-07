import{ Config } from '../../config.js';

let config = new Config();
const API_KEY = config.getKey();


// request header and put into nav id
$.get('../../components/header.html', function(response){
  $('#nav').html(response);


});
// dont show cards untill form is submited with infrmation
$("#weather_info").css('display','none');
// write a funcrion to convert kalvin to f. should take in a single number and return a single number.
function convertKelvin(k){
  let f = (9/5)*(k - 273) + 32;
  return f.toFixed(2);

}
// hander form submition by using jQuery to listen for event
$("#search_weather").submit(event => {
event.preventDefault();

// console.log(event);

let city = $("#city").val();
console.log(city);

// create url variable to store api location
let   url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
console.log(url)
// use jquery.get to call API
$.get(url, function(response)
{
  console.log(response);

  // make cards appear
  $('#weather_info').css('display','block');

  // grab data from response and insert into correct id's
  console.log(response.main.humidity);
  $("#high").html(`${convertKelvin(response.main.temp_max)}&deg;`);
  $("#low").html(`${convertKelvin(response.main.temp_min)}&deg;`);
  $("#forecast").text(response.weather[0].main);
  $("#humidity").html(response.main.humidity);
});
});
