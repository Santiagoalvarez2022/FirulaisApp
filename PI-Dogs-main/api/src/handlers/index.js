//IMPORTO TODAS LAS FUNCTIONS HANDLERS Y LAS EXPORTO COMO UN OBJETO
const handler_getDogs = require('./dogs/handler_getDogs')
const handler_getDog_id = require('./dogs/handler_getDog_id')
module.exports = {
    handler_getDogs,
    handler_getDog_id,

}