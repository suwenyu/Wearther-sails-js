$( document ).ready(function() {

  getLocation(result).then(function(result){
    
    return getWeather(result);
  }).then(function(result){
    
    return getAQI(result);
  }).then(function(result){
    
    console.log(result);
    return appendData(result);
  }).then(function(result){
    
    return deliverData(result);
  }).then(function(result){
    
    console.log(result);
    return appendClothes(result);
  }).then(function(result){
    console.log('success');
  });
});

function appendClothes(result){
  return new Promise(function(resolve, reject){
    $('#recom_body > div').remove();
    $('#recom_foot > div').remove();

    result.recom_body.forEach(function(data){
      $('#recom_body').append('<div>'+ data +'</div>');
    });
    result.recom_foot.forEach(function(data){
      $('#recom_foot').append('<div>'+ data +'</div>');
    });


    resolve(result);
  });
}


function deliverData(result){
  return new Promise(function(resolve, reject){
    $.ajax({
      method:'POST',
      url:'/weather/clothes',
      data:result
    }).done(function(result){
      console.log(result);
      resolve(result);
    });
  });
}

function appendData(result){
  return new Promise(function(resolve, reject){
    result.weather_data.temp = Math.round(result.weather_data.temp);
    $('#countryName').hide().html(result.weather_data.countryname).fadeIn(2000);
    $('#temp').hide().html(result.weather_data.temp).fadeIn(3000);
    $('#description').hide().html(result.weather_data.description).fadeIn(4000);
    $('#aqi').hide().html(result.aqi.country_aqi).fadeIn(5000);
    resolve(result);
  });
}


function getAQI(result){
  return new Promise(function(resolve, reject){
    $.ajax({
      method:'GET',
      url:'https://api.breezometer.com/baqi/?lat='+result.location.lat+'&lon='+result.location.lng+'&key=48146dcc571e4588b368d2531eac97f0&fields=country_aqi,country_color'
    }).done(function(data){
      result['aqi'] = data;
      resolve(result);
    });
  });
}


function getWeather(result){
  return new Promise(function(resolve , reject){
    $.ajax({
      method:'GET',
      url:"http://api.openweathermap.org/data/2.5/weather?lat="+result.location.lat+"&lon="+result.location.lng+"&APPID=ed87a12dc271a93d5f2d75fa2e4f426b"
    }).done(function(data){
      var weather_data = {}
      weather_data['countryname'] = data.name;
      weather_data['temp'] = data.main.temp/10;
      weather_data['humidity'] = data.main.humidity;
      weather_data['wind'] = data.wind.speed;
      weather_data['description'] = data.weather[0].description;
      weather_data['condition'] = data.weather[0].main
      weather_data['rain'] = data.weather[0].rain

      result['weather_data'] = weather_data;
      resolve(result);
    })
  });
}


function getLocation(){
  return new Promise(function(resolve, reject){

    <% if (session.location) { %>
      var lat = "<%- session.location.lat %>";
      var lng = "<%- session.location.lng %>";
    <% } else{ %>
      var lat = undefined;
      var lng = undefined;
    <% } %>
    console.log(lat , lng);

    // console.log('test1');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location_data){
        // console.log(location.coords.latitude);
        // console.log(location.coords.longitude);
        var loca_data = {};
        var location = {};
        location['lat'] = location_data.coords.latitude;
        location['lng'] = location_data.coords.longitude;
        loca_data['location'] = location;
        console.log(loca_data);

        resolve(loca_data);
      });
    }


  });
}