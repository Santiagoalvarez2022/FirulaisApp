//debemos importar las actions
import {GET_DOGS, SUMAR} from './actions'

const initialSate = {
    dogs : [],
    numero : 0,
    data : []

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
        
        case SUMAR :{
            return{
                ...state,
                numero : state.numero + action.payload
            }
        }

        case "DATA API": {
            return{
                ...state,
                data : action.payload
            }
        }
        default:{
            return {...state}
        }
    }
}

export default rootReducer;