import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const ORDER_RACE= "ORDER_RACE";
export const DETAIL_DOG= "DETAIL_DOG";
export const RESET_DETAIL_DOG= "RESET_DETAIL_DOG";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const HANDLER_INDICE = "HANDLER_INDICE";
export const CLEAR_DOGS = "CLEAR_DOGS";
export const GET_CREATEDRACES = "GET_CREATEDRACES";
export const SEARCH_CREATED_RACES =  "SEARCH_CREATED_RACES" ;
export const NEW_ORDER =  "NEW_ORDER" ;


export const search_created_races = (result) =>{
    return{
        type: SEARCH_CREATED_RACES,
        payload: result
    }
}




export const change_page = (value) =>{
    if(value){
        return{
            type :   CHANGE_PAGE,
            payload : value
        }
    } else {
        return{
            type :   CHANGE_PAGE,
            payload : 1
        }
    }
}


export const handler_indices = (value) => {

    if(!value){
        return {
            type : HANDLER_INDICE,
            payload : {
                page : 1,
                inicio : 0,
                fin : 4
            }
        }
    }

    //despacho action que cambia la pagina
    let start = (value - 1 ) * 4 
    let end = (value * 4 )

    return {
        type : HANDLER_INDICE,
        payload : {
            page : value,
            inicio : start,
            fin : end
        }
    }
  }


export const get_dogs = (dogs=undefined) => async (dispatch) => {
 

    let result = await axios.get("/dogs") 
    return dispatch({
        type : GET_DOGS,
        payload : result.data
    })
}


export const get_createdRaces = () => async (dispatch) => {
    //trae todos los datos de la api

    let result = await axios.get("/dogs") 
    return dispatch({
        type : GET_CREATEDRACES,
        payload : result.data
    })
}



export const get_by_name  = (result) =>{
    return{
        type: GET_BY_NAME,
        payload: result
    }
}




export const post_dog = (data) =>async () => {
    let newdog =  await axios.post("/dogs", data)
    return newdog
} 



export const detail_dog = (id) => { 
    return async (dispatch, getState) => {
        //estado global actual
        const currentState = getState();
    
        // Verifica si el array dogs está cargado
        if (!currentState.copy_dogs.length) {
         // Si no está cargado, realizo una petición a la API para obtener todos los perros
            try {
                const {data} = await axios.get("/dogs");
                // Despacha una acción para actualizar el estado con la información de los perros
                dispatch({ type: GET_DOGS, payload: data });
                //busco en la repuesta de la api por el id recibido
                const dogDetail = data.find((dog) => dog.id === id);
        
                // // Despacha una acción para actualizar el estado con el detalle del perro
                return dispatch({ type: DETAIL_DOG, payload: dogDetail });

            } catch (error) {
            /// Manejo de errores
            console.error('Error al obtener la lista de perros', error);
            }
        }
    
        const dogDetail = currentState.copy_dogs.find((dog) => dog.id === id);
        
        // Despacha una acción para actualizar el estado con el detalle del perro
       return dispatch({ type: DETAIL_DOG, payload: dogDetail });
      };
    };


    

export const reset_detail_dog = () => async (dispatch) => {
    return dispatch({
        type : RESET_DETAIL_DOG,
    })
}




export const get_temperaments = () => async (dispatch) =>{
    let result = await axios.get(`/temperaments`) 
    return dispatch({
        type : GET_TEMPERAMENTS ,
        payload : result.data
    })
}


export const  filter_temperament = (temp,dogs) => async (dispatch) =>{
    //evaluar si la conbinacion de filtros devultve por lo menos un perrro si no es asi debe retornar un mensaje

    let coincidencias = []
    if (!temp) {
       
        coincidencias = dogs;
    } else {
        coincidencias = dogs.filter((dog)=>{
            if (dog.temperaments) {
                if(dog.temperaments.includes(temp)){
                    return dog;
                }
            }
        })
    }
    

    if (!coincidencias.length) {
        return dispatch({
            type : FILTER_TEMPERAMENT,
            payload : [{msg:"No se han encontrada razas de perros con esa conbinacion de filtros"}]
        })
    } 

    return dispatch({
        type : FILTER_TEMPERAMENT,
        payload : coincidencias
    })
}




export const order_height = (order, dogs) => async (dispatch) => {
    let filter = []
    //de menor a mayor

    if(order === "AD"){
        filter = dogs.sort(function (a, b) {

            let A  =  parseInt(a.alturaMin) 
            //para que no aparezcan los que no tienen datos primero 
            if(!A ){
                A = 10000
            }
            let  B = parseInt(b.alturaMin) 
            if(!B ){
                B = 10000
            }
            return A - B
        })
    } else if(order === "DA"){
        filter = dogs.sort(function (a, b) {
            let  A = parseInt(a.alturaMax) ; 
            let  B = parseInt(b.alturaMax) ;
            return B - A
        })
    }
    
    return dispatch({
        type : NEW_ORDER,
        payload : dogs
    })
}

export const order_width = (order, dogs) => async (dispatch) => {
    let filter = []
    //de menor a mayor

    if(order === "AD"){
        filter = dogs.sort(function (a, b) {

            let A  =  parseInt(a.pesoMin) 
            //para que no aparezcan los que no tienen datos primero 
            if(!A ){
                A = 10000
            }
            let  B = parseInt(b.pesoMin) 
            if(!B ){
                B = 10000
            }
            return A - B
        })
    } else if(order === "DA"){
        filter = dogs.sort(function (a, b) {
            let  A = parseInt(a.pesoMax) ; 
            let  B = parseInt(b.pesoMax) ;
            return B - A
        })
    }
    
    return dispatch({
        type : NEW_ORDER,
        payload : dogs
    })
}














export const order_alfabet = (type,dogs) => async (dispatch) =>{
    
    let filter = []
    //VER EL ID DE CADA UNO Y SI ES UN NUM == API, STRING === DATABASE

   if( type === "ZA"){
        filter = dogs.sort(function (a, b) {
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
        filter = dogs.sort(function (a, b) {
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
        filter = dogs
    }
    return dispatch({
        type :  NEW_ORDER,
        payload : filter
    })

}

