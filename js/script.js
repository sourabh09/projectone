var lat = "";
var lon = "";
var fetched_location = "";
var myArray = ['#F44336', '#009688', '#3F51B5','#4CAF50','#2196F3'];    

$( document ).ready(function() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});

    function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+", "+lon+'&sensor=true&key=AIzaSyD98TIgEeJkaKcioLj-s2hgbBeWCV1tUQE', 
            success: function(data) {

                console.log(data);
                console.log(data.results[2].formatted_address);
                console.log(data.results[6].formatted_address);
                
                //fetched_location = data.results[4].formatted_address;
                fetched_location = data.plus_code.compound_code;
                
                //alert(fetched_location);
                showdata();
                //process the JSON data etc
        }

        })

        //alert(lat+", "+lon); 
}




function showdata() {

 $('.mdl-spinner').attr('style','display: block !important');

//var location = fetched_location;
var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
var method = 'GET';
var app_id = 'iWJzNd5c';
var consumer_key = 'dj0yJmk9emxBQ1FBbmV3dUtCJmQ9WVdrOWFWZEtlazVrTldNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTE2';
var consumer_secret = '6c83035a3577e52ef57017904b42583e9016991e';
var concat = '&';
var units = 'C';
var query = {'location': fetched_location, 'format': 'json','u':units};
var oauth = {
    'oauth_consumer_key': consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
};

var merged = {}; 
$.extend(merged, query, oauth);
// Note the sorting here is required
var merged_arr = Object.keys(merged).sort().map(function(k) {
  return [k + '=' + encodeURIComponent(merged[k])];
});
var signature_base_str = method
  + concat + encodeURIComponent(url)
  + concat + encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth['oauth_signature'] = signature;
var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
  return [k + '="' + oauth[k] + '"'];
}).join(',');

$.ajax({
  url: url + '?' + $.param(query),
  headers: {
    'Authorization': auth_header,
    'X-Yahoo-App-Id': app_id 
  },
  method: 'GET',
  success: function(data){
    console.log(data);


    var city = data.location.city;
    var region = data.location.region;
    var temp = data.current_observation.condition.temperature;

    var description = data.current_observation.condition.text;
    var highlow = data.forecasts[0].high+'\xB0' + units+" / "+data.forecasts[0].low+'\xB0' + units;
    var humidity = data.current_observation.atmosphere.humidity+"%";
    var wind = data.current_observation.wind.speed+"Km/h";

     var day1 = data.forecasts[0].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[0].code +"'></i>"+
  " | "+data.forecasts[0].high+'\xB0' + units+" / "+ data.forecasts[0].low+'\xB0' + units;

  var day2 = data.forecasts[1].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[1].code +"'></i>"+
  " | "+data.forecasts[1].high+'\xB0' + units+" / "+ data.forecasts[1].low+'\xB0' + units;

  var day3 = data.forecasts[2].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[2].code +"'></i>"+
  " | "+data.forecasts[2].high+'\xB0' + units+" / "+ data.forecasts[2].low+'\xB0' + units;

   var day4 = data.forecasts[3].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[3].code +"'></i>"+
  " | "+data.forecasts[3].high+'\xB0' + units+" / "+ data.forecasts[3].low+'\xB0' + units;

 var day5 = data.forecasts[4].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[4].code +"'></i>"+
  " | "+data.forecasts[4].high+'\xB0' + units+" / "+ data.forecasts[4].low+'\xB0' + units;

  var day6 = data.forecasts[5].day+" | "+"<i class='wi wi-yahoo-"+ data.forecasts[5].code +"'></i>"+
  " | "+data.forecasts[5].high+'\xB0' + units+" / "+ data.forecasts[5].low+'\xB0' + units;
    var bgcolor = myArray[Math.floor(Math.random() * myArray.length)];


 //document.getElementById("display").innerHTML += "Places: " +places[i] + "<br/>";

  $('.container').append(

    '<div class="main"><div class="place">'+'<i class="material-icons">room</i> '+ city +" | "+region+'</div><div class="icontemp">'+"<i id=mainicon class='wi wi-yahoo-"+ data.current_observation.condition.code +"'></i>"
    +" "+temp+ '\xB0' + units+'</div><div class="description">'+description+'</div><div class="highlow">'+highlow+'</div></div>'

    );

   $('.container').append(

    '<div class="main"><div class="humi_wind">'+"<i class='wi wi-raindrop'></i> "+humidity+'</div>'+" | "+'<div class="humi_wind">'+"<i class='wi wi-strong-wind'></i> "+wind+'</div></div>'

    );

   $('.container').append(

    '<div class="forecast"><div class="day1"></div><div class="day2"></div><div class="day3"></div><div class="day4"></div><div class="day5"></div><div class="day6"></div></div>'

    );

   //$('.container').append("<img src='http://ebulawaa.com/sourabh/terseweather/drop.png'>"+humidity+"%"+" | "+"<img src='http://ebulawaa.com/sourabh/terseweather/wind.png'>"+wind+"Km/h");
     $('.day2').html(day1);
 $('.day3').html(day2);
 $('.day4').html(day3);
 $('.day5').html(day4);
  $('.day6').html(day5);
  $('.day7').html(day6);

  $('#place').val("");
  $('.mdl-spinner').css("display","none");
  $('.main').fadeIn();
  $('#deletebutton').css("display","block");
  $('#splashscreen').fadeOut('fast');

    }
  
});

    }

//Code for showing date and time
$( document ).ready(function() {

  document.getElementById("datetime").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    //ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes;
}
    

});