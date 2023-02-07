//debemos importar las actions
import {GET_DOGS} from './actions'

const initialSate = {
    dogs : [],

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

        default:{
            return {...state}
        }
    }
}

export default rootReducer;