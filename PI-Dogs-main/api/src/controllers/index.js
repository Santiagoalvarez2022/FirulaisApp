//INDEX DE TODOS LOS CONTROLLERS, ACA CONVERGEN TODAS LAS FUNCIONES EN UN OBJETO QUE EXPORTO

const get_all = require('./dogs/get_all')
const post_dog = require('./dogs/post_dog')
const get_allForName = require('./dogs/get_allForName')
const get_by_Id = require('./dogs/get_by_Id')
const get_temperaments = require('./temperaments/get_temperaments')
module.exports = {
    get_all,
    post_dog,
    get_allForName,
    get_by_Id,
    get_temperaments
};
