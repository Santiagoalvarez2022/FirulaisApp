const axios = require('axios') 

const data = async() =>{
    result = await axios('http://localhost:3001/dogs')
    return result.data
}

const func = async() => {
    const values = await data()
}

let dogs = func()

module.exports = dogs