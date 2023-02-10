//debemos importar las actions
import {GET_DOGS, GET_BY_NAME, GET_TEMPERAMENTS, FILTER_TEMPERAMENT} from './actions'

const initialSate = {
    dogs : [],
    temperaments : []
    

}
//debe ser una funcion pura

//mantener como una funcion pura, no hacer llamados  a la api aca
const rootReducer = (state = initialSate , action) =>{
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            };
        
        case GET_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            };
        
        case GET_TEMPERAMENTS:{
            return{
                ...state,
                temperaments:action.payload
            }
        }

        case FILTER_TEMPERAMENT:{
            return {
                ...state,
                dogs: action.payload
            }
        }
           
        default:{
            return {...state}
        }
    }
}

export default rootReducer;