import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import style from "./FilterAndOrders.module.css"
import { get_by_name , get_temperaments, filter_temperament,  order_alfabet, order_width, order_height,handler_indices} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";




export default function FilterAndOrders({hlandlerFlag}) {
  
    const [orderAZ, setOrderAZ] = useState(true)
    // const {temperaments,dogs,copy_dogs }= useSelector((state)=>state)
    const temperaments = useSelector((state)=>state.temperaments)
    const dogs = useSelector((state)=>state.dogs)
    const copy_dogs = useSelector((state)=>state.copy_dogs)

    const [stateForm, setForm] = useState("");
    const [filterTemperaments, setFilterTemps] = useState([]);
    const [sortsChosen, setSortsChosen] = useState("")
    const dispatch = useDispatch()

    //guardar temperamentos en el localstorage
        

    useEffect(()=>{

        const handleBeforeUnload = () => {
            //antes de recargar la pagina borro el filtro porque solo quiero  mantenerlo miestras nevego en la pagina si la recargo borro todos los filtros
            localStorage.setItem('temperaments', JSON.stringify([]));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        dispatch(get_temperaments())
        const tempsLocalStorage = JSON.parse(localStorage.getItem('temperaments'));
        if (tempsLocalStorage.length) {
            
            setFilterTemps(tempsLocalStorage)
        }


    },[])

    useEffect(()=>{
        localStorage.setItem('temperaments', JSON.stringify(filterTemperaments));

    },[filterTemperaments])


    const changeHandler = ({target}) =>{
        let {value} = target; 
        setForm(value)
        let result = copy_dogs.filter(dog=> dog.name.toLowerCase().includes(value.toLowerCase()))
        if (!result.length) {
            //si no encuentra nada mando un msg
            result = [{msg:"No se encontro una raza con este nombre, revisa lso filtros que has colocado para mejorar tu busqueda"}]

        }
        dispatch(get_by_name(result))
    }
        
  
    //elimino er refresh defaull de la accion submit
    const handlerSubmit = (event) =>{
        event.preventDefault()
        // dispatch(clear_dogs())
        setForm("")
    } 
    
    const handlerHeightOrder = (event) =>{
        let {value} = event.target;
        setSortsChosen("")
        dispatch(handler_indices())
        hlandlerFlag()

        if(value==="DA" || value==="AD"){
            value === "DA" 
            ? setSortsChosen("Altura : M-m")
            : setSortsChosen("Altura : m-M")
            dispatch(order_height(value,dogs))
        }
    }


    const handlerPesoOrder =(event) =>{
        //elimino los otros orders ya que al alegir este modificare el ortden total
        let {value} = event.target;
        dispatch(handler_indices())
        setSortsChosen("")
        hlandlerFlag()

        if (value === "DA" || value==="AD") {
            value === "DA" 
                ? setSortsChosen("Peso : M-m")
                : setSortsChosen("Peso : m-M")
            dispatch(order_width(value, dogs))
            
        }
    } 
    
    



    const handlerAlfabetOrder =(event) =>{
        let {value} = event.target;
        dispatch(handler_indices())
        hlandlerFlag()
        if (value=== "ZA" || value==="AZ") {
            value === "ZA" 
                ? setSortsChosen("ZA")
                : setSortsChosen("AZ")
            dispatch(order_alfabet(value, dogs))
        }
    
    }





    const deleteOrder = () =>{
        setSortsChosen("")
        hlandlerFlag()

    }

    
    const selectTemperament = (event,dogs) => {
        //delaro una variable que contien el temperamento seleccionado
        dispatch(handler_indices())
        let temperament = event.target.value.trim()
        
        if(temperament==="TODOS LOS PERROS"){
            setFilterTemps([])
            dispatch(filter_temperament(null,copy_dogs))
        }  else if (filterTemperaments.length < 2) {
            
            //busco duplicaods para no filtrar por el mismo temperamento
            if (filterTemperaments.findIndex((temp)=> temp === temperament ) === -1) {
                setFilterTemps([...filterTemperaments, temperament])    
                //cuando agrego filtros hago un filtrado progresivo entonces paso como parametro el array ya filtrado(cuadno borro un filtro vuelvo a filtrar todo osea la copia original)
                //le envio a al aaction un array con los filtros y otro con todas las razas
                dispatch(filter_temperament(temperament,dogs))
            } 
            
        }

    
    }
    
    const deleateSelectedTemp = (e) =>{
        let value = e.target.innerHTML
        dispatch(handler_indices())

        setFilterTemps(filterTemperaments.filter(t=> t !== value));

        if (!filterTemperaments.filter(t=> t !== value).length) {
            dispatch(filter_temperament(null,copy_dogs))
            
        } else if(filterTemperaments.filter(t=> t !== value).length === 1) {
            dispatch(filter_temperament(filterTemperaments.filter(t=> t !== value)[0],copy_dogs))
            
        }


    }



  return (
    <div className={style.container}>

        <div className={style.container_filters}>
            <form  onSubmit={(e)=>{handlerSubmit(e)}}  className={style.form}>
                <label htmlFor='search' className={style.iconSearch}> 
                    <FontAwesomeIcon icon={faMagnifyingGlass} beat />
                </label>
                <input id='search' onChange={(e)=>changeHandler(e)} name="search" type="text" value={stateForm}/>
            </form>

            <form className={style.container_temperaments} action="#"> 
                <select className={style.select_temperaments} onChange = {(e)=>selectTemperament(e,dogs)}  name="temperamentos" id="temp" >
                    <option defaultValue={true} >TODOS LOS PERROS</option>
                                {temperaments.length ? temperaments.map((temp)=>{
                                    if (!temp.name.trim()) {
                                        return;
                                    }
                                return <option
                                value={temp.name}
                                key={temp.id}
                                name = {temp}
                                >                    
                                {temp.name}
                                </option>
                            })  :null}
                </select>
            </form>        
        </div>
      










        <div className={style.container_order}>
            
            <div className={style.chosenFilters}>
                {filterTemperaments.length
                    ? <div className={style.chosen}>
                        {
                            filterTemperaments.map((t)=>{
                                return <div
                                key={t}
                              
                                onClick={deleateSelectedTemp}
                                >
                                    <p className={style.temps}>{t}</p>
                                    <p className={style.delete}>  x</p>  

                                </div>
                            })
                        }
                    </div>
                    :null
                    // : <div className={style.chosenFilters_msg}><p >"Filtra y ordena las razas como quieras!. Solo puedes elegir hasta dos temperamentos por vez, puede que algunas razas contengan menos combinaciones que otras"</p></div>

                }
            </div>

            <div className={style.sortsChosen}>
                <div className={style.chosen_sorts}>
                  <div onClick={()=>deleteOrder()} > 
                    <p className={style.sort_p}> {sortsChosen} </p>
                    </div> 
                </div>
               
            </div>
            
            <div className={style.sorts}>                   
                <div className={style.order_height} >
                    <select onChange={handlerHeightOrder} name="height" id="">
                        <option >Altura</option>
                        <option name="DA" value="DA" id='DA'>Mayor a menor</option>
                        <option name="AD" value="AD" id='AD'>Menor a mayor</option>

                    </select>
                </div>
            

                <div className={style.order_width}> 
                        <select onChange={handlerPesoOrder} name="weight" id="">
                            <option >Peso</option>
                            <option name="DA" value="DA" id='DA'>Mayor a menor</option>
                            <option name="AD" value="AD" id='AD'>Menor a mayor</option>
                        </select>
                       
                </div>
            

                <div className={style.alfabeth} > 
                    <select onChange={handlerAlfabetOrder} >
                        <option   name="" id=''>Aldabeticamente</option>
                        <option value="ZA" name="ZA" id='AZ'> Z-A </option>
                        <option value="AZ" name="AZ" id='ZA'> A-Z </option>
                        
            

                    </select>

                </div>
            </div>
           
        </div>

    </div>
  )
}
