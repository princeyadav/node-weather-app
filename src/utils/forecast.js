const request = require('request')

const forecast = (lati, long, callback) =>{
  const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lati+'&lon='+long+'&units=metric&appid=bacf485e50450d806b8404989a2393a3';
    
    request({url, json:true}, function (error, response) {
      const newdata = response.body
         

       if (error){
            callback('No Internet connection',undefined)
        }
        else{
            
            callback(undefined,{temp: newdata.main.temp,
            description:newdata.weather[0].description,
            name:newdata.name})
        }
    });
}

module.exports = forecast;
