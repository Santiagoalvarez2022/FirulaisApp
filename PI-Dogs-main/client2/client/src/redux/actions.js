import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const ORDER_RACE= "ORDER_RACE";
export const DETAIL_DOG= "DETAIL_DOG";
export const RESET_DETAIL_DOG= "RESET_DETAIL_DOG";



export const get_dogs = () => async (dispatch) => {
    let result = await axios.get("http://localhost:3001/dogs") 
    return dispatch({
        type : GET_DOGS,
        payload : result.data
    })
}

export const post_dog = (data) =>async () => {
    let newdog =  await axios.post("http://localhost:3001/dogs", data)
    return newdog
} 

export const detail_dog = (id) => async (dispatch) => {
    let result = await axios.get(`http://localhost:3001/dogs/${id}`) 
    return dispatch({
        type : DETAIL_DOG,
        payload : result.data
    })
}
export const reset_detail_dog = () => async (dispatch) => {
    return dispatch({
        type : RESET_DETAIL_DOG,
    })
}
export const get_temperaments = () => async (dispatch) =>{
    let result = await axios.get(`http://localhost:3001/temperaments`) 
    return dispatch({
        type : GET_TEMPERAMENTS ,
        payload : result.data
    })
}

export const  filter_temperament = (temperament) => async (dispatch) =>{
    let result = await axios.get(`http://localhost:3001/dogs`) 
    let filter = [{name:"santiago"}]
    return dispatch({
        type : FILTER_TEMPERAMENT,
        payload : filter
    })
}


export const get_by_name = (name) => async (dispatch) => {
    let result = await axios.get(`http://localhost:3001/dogs?name=${name}`) 
    return dispatch({
        type : GET_BY_NAME ,
        payload : result.data
    })
}


export const order_peso = (order) => async (dispatch) => {
    let result = await axios.get(`http://localhost:3001/dogs`) 
    let filter = []
    //de menor a mayor

    if(order === "AD"){
        filter = result.data.sort(function (a, b) {
            let A  =  a.min; // ignore upper and lowercase
            //para que no aparezcan los que no tienen dato minimo primero 
            if(!A ){
                A = 10000
            }
            let  B = b.min; // ignore upper and lowercase
            if(!B ){
                B = 10000
            }
            return A - B
        })
    } else if(order === "DA"){
        filter = result.data.sort(function (a, b) {
            let  A = a.max; // ignore upper and lowercase
            let  B = b.max; // ignore upper and lowercase
            return B - A
        })
    }
    
    return dispatch({
        type : GET_DOGS,
        payload : result.data
    })
}

export const order_races = (type) => async (dispatch) =>{
    let result = await axios.get(`http://localhost:3001/dogs`) 
    let filter = []
    //VER EL ID DE CADA UNO Y SI ES UN NUM == API, STRING === DATABASE
    if(type === "ALL"){
        filter = result.data
    }
    if(type === "API"){
        filter = result.data.filter((dog) => typeof(dog.id) === "number" )
    } else if( type === "BDD"){
        filter = result.data.filter((dog) => typeof(dog.id) === "string" )
    } else {
        filter = result.data
    }
    return dispatch({
        type : GET_DOGS ,
        payload : filter
    })

}


export const order_alfabet = (type) => async (dispatch) =>{
    let result = await axios.get(`http://localhost:3001/dogs`) 
    let filter = []
    //VER EL ID DE CADA UNO Y SI ES UN NUM == API, STRING === DATABASE

   if( type === "ZA"){
        filter = result.data.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
          
            // names must be equal
            return 0;
        })
    } else if (type === "AZ"){
        filter = result.data.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        })
    } else {
        filter = result.data
    }
    return dispatch({
        type : GET_DOGS ,
        payload : filter
    })

}

