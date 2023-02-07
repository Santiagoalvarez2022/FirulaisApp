import axios from 'axios';
export const GET_DOGS = "GET_DOGS";


//funciones
export const get_dogs = () =>{
    try {
        return async function(dispatch){
            let result = await axios('http://localhost:3001/dogs')
            dispatch({type : GET_DOGS , payload: result.data})
        }
    } catch (error) {
      return {error:error.message}  
    }
}