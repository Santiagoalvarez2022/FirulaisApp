//debemos importar las actions
import {NEW_ORDER,SEARCH_CREATED_RACES,GET_CREATEDRACES,CLEAR_DOGS,HANDLER_INDICE,CHANGE_PAGE,GET_DOGS, GET_BY_NAME, GET_TEMPERAMENTS, FILTER_TEMPERAMENT,DETAIL_DOG, RESET_DETAIL_DOG} from './actions'

const initialSate = {
    dogs : [],
    copy_dogs:[],
    temperaments : [],
    detaildog : {},
    page:1,
    inicio: 0,
    fin : 4 ,
    createdRaces : [],
    copy_createdRaces:[],

}
//debe ser una funcion pura

//mantener como una funcion pura, no hacer llamados  a la api aca
const rootReducer = (state = initialSate , action) =>{
    switch(action.type){
        case SEARCH_CREATED_RACES:
            return{
                ...state,
                createdRaces:action.payload
            }
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
                dogs: action.payload,
                copy_dogs:action.payload
            };
        case GET_CREATEDRACES:
            return {
                ...state,
                createdRaces: action.payload,
                copy_createdRaces: action.payload,
            };
        case CLEAR_DOGS: 
            return {
                ...state,
                dogs:action.payload
            }
        
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
           
        //caso para los ordenamientos 

        case NEW_ORDER :{
            return{
                ...state,
                dogs:action.payload
            }
        }
        default:{
            return {...state}
        }
    }
}

export default rootReducer;