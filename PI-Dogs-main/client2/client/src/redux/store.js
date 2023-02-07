import rootReducer from "./reducer";
import {applyMiddleware, compose,createStore} from 'redux';

//importo thunkMiffleware que se usa para ver los estados de redux en la consola
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
)

export default store


