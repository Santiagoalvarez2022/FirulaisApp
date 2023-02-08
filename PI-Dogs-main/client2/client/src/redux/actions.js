import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const SUMAR = "SUMAR"


export function sumar (){
    return {
        type : SUMAR,
        payload : 1
    }
}

export const  dataApi = () => async (dispatch) => {
            let result = await axios.get("https://jsonplaceholder.typicode.com/todos") 
            return dispatch({
                type : "DATA API",
                payload : result.data
            })
        }

export const get_dogs = () => async (dispatch) => {
            let result = await axios.get("http://localhost:3001/dogs") 
            return dispatch({
                type : GET_DOGS,
                payload : result.data
            })
        }
