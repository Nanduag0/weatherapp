const request=require('request')

const forecast=({latitude,longitude},callback)=>
{
const url='http://api.weatherstack.com/current?access_key=3652667981571141c689c14c1f66cbb0&query='+latitude+','+longitude;
request({url : url, json: true},(error,response)=>
{
if(error)
{
    callback('Unable to connect',undefined)
    {
      callback('Unable to conect to location services',undefined)
    }
}
else
if(response.body.error)
{
callback('Unable to find loation',undefined)
}
else
{
  callback(undefined,{forecastdata : response.body.current.weather_descriptions[0]+'. degrees out there.There is a '+response.body.current.feelslike+'%  degrees out.'})
}

});
}

module.exports=forecast