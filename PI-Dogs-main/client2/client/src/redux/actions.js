import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export const get_dogs = () => async (dispatch) => {
    let result = await axios.get("http://localhost:3001/dogs") 
    return dispatch({
        type : GET_DOGS,
        payload : result.data
    })
}

export const get_temperaments = () => async (dispatch) =>{
    let result = await axios.get(`http://localhost:3001/temperaments`) 
    return dispatch({
        type : GET_TEMPERAMENTS ,
        payload : result.data
    })
}

export const get_by_name = (name) => async (dispatch) => {
    let result = await axios.get(`http://localhost:3001/dogs?name=${name}`) 
    return dispatch({
        type : GET_BY_NAME ,
        payload : result.data
    })
}


