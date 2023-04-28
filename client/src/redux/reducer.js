//debemos importar las actions
import {HANDLER_INDICE,CHANGE_PAGE,GET_DOGS, GET_BY_NAME, GET_TEMPERAMENTS, FILTER_TEMPERAMENT,DETAIL_DOG, RESET_DETAIL_DOG} from './actions'

const initialSate = {
    dogs : [],
    temperaments : [],
    detaildog : {},
    page:1,
    inicio: 0,
    fin : 4 

}
//debe ser una funcion pura

//mantener como una funcion pura, no hacer llamados  a la api aca
const rootReducer = (state = initialSate , action) =>{
    switch(action.type){
        case HANDLER_INDICE:
            return {
                ...state,
                inicio: action.payload.inicio,
                fin: action.payload.fin,
                page : action.payload.page
            }
        case CHANGE_PAGE :
            return {
                ...state,
                page:action.payload
            }
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            };
        
        case GET_BY_NAME:
            return {
                ...state,
                dogs: state.dogs.filter(dog=>dog.name === action.payload)
                
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
        case DETAIL_DOG:{
            return {
                ...state,
                detaildog: action.payload
            }
        }

        case RESET_DETAIL_DOG : {
            return {
                ...state,
                detaildog : {}
            }
        }
           
        default:{
            return {...state}
        }
    }
}

export default rootReducer;