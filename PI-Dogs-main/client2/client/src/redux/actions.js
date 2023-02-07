import axios from 'axios';
export const GET_DOGS = "GET_DOGS";


//funciones
export const get_dogs = () =>{
    try {
        return function(dispatch){
            axios('http://localhost:3001/dogs')
                .then(response => dispatch({type: GET_DOGS, payload: response.data}))
        }
    } catch (error) {
      return {error:error.message}  
    }
}