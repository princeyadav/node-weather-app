const request = require("request");


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJpbmNlMzczOSIsImEiOiJja2ZwNHEwaTcwcjM5MnJvZXYxcDUwMG42In0.GjOBtKy0WCLNZBCZ3f0NdA';
  
    request({url, json: true},(error, {body})=>{
  
      if(error){
        callback('NO internet Connection', undefined)
      }
      else if(body.features.length==0){
         callback('No location found , Try another Search ',undefined)
      }
      else{
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitute: body.features[0].center[0],
          location : body.features[0].place_name 
        })
      }
  
    })
  }

  module.exports= geocode
  