const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab45f2391320b7a2c6ad41d2b850f7b3&query='+ latitude + ',' + longitude 

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback("unable to connect to weather service!",undefined)
        
        } else if(body.error){
            callback("unable to find location",undefined)

        } else{
            callback(undefined,"it is currently " + body.current.temperature)
        }
    })
}

module.exports = forecast