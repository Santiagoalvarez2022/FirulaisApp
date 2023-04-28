//IMPORTO TODAS LAS FUNCTIONS HANDLERS Y LAS EXPORTO COMO UN OBJETO
const handler_getDogs = require('./dogs/handler_getDogs')
const handler_getDog_id = require('./dogs/handler_getDog_id')
const handler_postDog = require('./dogs/handler_postDog')
const handler_getDogs_api = require('./dogs/handler_getDogs_api')
//temperaments

const handler_getTemperaments = require('./temperaments/handler_getTemperaments')
module.exports = {
    handler_getDogs,
    handler_getDogs_api,
    handler_getDog_id,
    handler_postDog,
    handler_getTemperaments
}