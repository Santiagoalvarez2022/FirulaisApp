import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'
import { useDispatch, useSelector } from "react-redux";
import { get_dogs,filter_temperament, post_dog,get_createdRaces } from "../../redux/actions";
import image from './cargando.gif'


const validate = (form, dogs) =>{
  let error = {};
  let {alturaMax, alturaMin, name, pesoMax, pesoMin,  vidaMax, vidaMin} = form;

  if(!name || !alturaMax || !alturaMin || !pesoMax || !pesoMin || !vidaMax || !vidaMin){
    error.vacio = "Todos los campos deben llenarse";
  }
  if(name){
    //cambiar para que consulte directamente a la base de datos y en la api para no crear duplicados 
    const find_dog = dogs.find((dog)=>  dog.name.trim().toLowerCase() === name.toLowerCase()  )
    if(find_dog){
      error.name = "Ya existe una raza con este nombre"
    } else if(!/^[a-zA-Z ]+$/.test(name)){
    //valido que el nombre solo contenga letras y numeros
      error.name = "El nombre no puede contener numeros o caracteres especiales"
    } 
  }

  //evaluar solo si hay algo en los inputs
  if (alturaMax || alturaMin) {
    if(!/^[0-9]+$/.test(alturaMax || alturaMin)) error.altura ="Solo se aceptan numeros"
    if(parseInt(alturaMax) < parseInt(alturaMin) || parseInt(alturaMax) === parseInt(alturaMin) ) error.altura = "La altura maxima no puede ser igual o menor a la altura minima"
    if(parseInt(alturaMax) < 0 || parseInt(alturaMin) < 0) error.altura = "La altura no puede ser negativa"
  }

  if (pesoMax || pesoMin) { 
    if(!/^[0-9]+$/.test(pesoMax || pesoMin)) error.peso ="Solo se aceptan numeros"
    if(parseInt(pesoMax) < parseInt(pesoMin) || parseInt(pesoMax) === parseInt(pesoMin) ) error.peso = "El peso maximo no puede ser igual o menor al peso minimo"
    if(parseInt(pesoMax) < 0 || parseInt(pesoMin) < 0) error.peso = "El peso no puede ser negativo"
    
  }
    

  if (vidaMax || vidaMin) { 
    if(!/^[0-9]+$/.test(vidaMax || vidaMin)) error.vida ="Solo se aceptan numeros";
    if(parseInt(vidaMax) < parseInt(vidaMin) || parseInt(vidaMax) === parseInt(vidaMin) ) error.vida = "El promedio maximo no puede ser igual o menor al promedio minimo";
    if(parseInt(vidaMax) < 0 || parseInt(vidaMin) < 0) error.vida = "El rango de vida no puede ser negativo";
    
  }


  return error 
}

const Create = () =>{
  const dispatch = useDispatch()
  const selectorTemps = useSelector((state)=>state.temperaments)

  
  let  {dogs,copy_createdRaces }= useSelector((state)=>state)

  dogs = dogs.concat(copy_createdRaces)
  const [form , setForm] = useState(
    {
      name : "",
      alturaMax : "",
      alturaMin : "",
      pesoMax : "",
      pesoMin : "",
      temperaments :"",
      vidaMax : "",
      vidaMin : "",
      image : "",
     
    }
  )   

  useEffect(()=>{
    dispatch(get_dogs())
    dispatch(get_createdRaces())
    setError(validate(form, dogs))
  },[])

  const [temperaments, setTemperaments ] = useState([])
  
  console.log("array de temperamento", temperaments);
  
      
  const [error,setError] = useState({}) 
  const [errorTemps, setErrorTemps] = useState(false)

  //manejador de estado del form
  const handlerForm = (event) =>{
    const {value, name} = event.target;
    console.log("estoy en el handler form");

    if (name==="temperaments") {    
      if(temperaments.length === 3 ) return;
      if (temperaments.findIndex(temp => temp===value) === -1) {
      setTemperaments([...temperaments, value])  
      setErrorTemps(true)
    }
    
    return ;
  }

  if(!temperaments.length){
    setErrorTemps(false)
  }

    setForm({
      ...form,
      [name] : value
    })
    
    
    setError(validate({...form, [name] : value}, dogs))
  }
  const handlerSubmit = (event)=>{
    event.preventDefault() 
  }

  //agrego temperamentos
  const handlerTemperaments = ({target}) =>{ 
    // const {value} = target;
    // //si ya esta no lo agrego 
    // if(temperaments.length === 3 ) return;
    // if (temperaments.findIndex(temp => temp===value) === -1) {
    //   setTemperaments([...temperaments, value])
    //   return ;
    // }
  }

  //elimino temperamnetos
  const deleteTemperament = (temp) =>{
 

  if(temperaments.length === 1){
    setTemperaments([])
    setErrorTemps(false)
      return 
    }
    let update_Temperaments = temperaments.filter(t => t !== temp)
    setTemperaments(update_Temperaments)
  }  




 
  const handlerSendData = () =>{
    let temperaments_ = temperaments.join(" ")
    setForm(   {
      name : "",
      alturaMax : "",
      alturaMin : "",
      pesoMax : "",
      pesoMin : "",
      temperaments :temperaments_,
      vidaMax : "",
      vidaMin : "",
      image : "",
   
    })

  }




 
  if(!Object.keys(dogs).length){
    return(
      <div className={style.loading}>
        <img src={image} alt="" />
      </div>
    )
  } else {
    return(
        <div  className={style.conteiner}>
      
          <div className={style.boxOne}>
            <h1>CREA TU PROPIA RAZA</h1>
            <Link to="/createdraces">
              <button>Ver razas creadas por la comunidad</button>
            </Link>
          </div>
          <div className={style.boxTwo}>
            
            <form className={style.form} onClick={(e)=> handlerSubmit(e)} >
             
                <div className={style.header}>
                  <p>{form.name}</p>
                </div>
                

                <div className={style.inputs}>
                  <div  className={style.inputs_div}>
                    <label >Nombre</label>
                    <div className={style.container_inputs}>  
                      <input className={style.input} placeholder="Nombra a tu nueva raza como quieras" onChange={handlerForm} value={form.name} name="name"  type="text" />
                    </div>  
                    <p id={style.error}> {error.name ? <p>{error.name}</p> : null}</p>
                  </div>

                   <div className={style.inputs_div}>
                      <label htmlFor="min">Altura</label>
                      <div className={style.container_inputs}>
                        <input className={style.input} type="text" placeholder="¿Cuál su altura minimo?" onChange={handlerForm}  name="alturaMin" value={form.alturaMin} />
                        <input className={style.input} type="text" placeholder="¿Cuál es su altura maximo?" onChange={handlerForm}  name="alturaMax" value={form.alturaMax} />
                      </div>
                      <p id={style.error}> 
                      {error.altura ? <p>{error.altura}</p> : null}
                      </p>
                   </div>

                    <div className={style.inputs_div}>
                      <label htmlFor="pesoMin">Peso</label>
                      <div className={style.container_inputs}>
                        <input className={style.input} type="text" placeholder="¿Cuál es su peso minimo?" onChange={handlerForm} id="pesoMin" name="pesoMin" value={form.pesoMin} />
                        <input className={style.input} type="text" placeholder="¿Cuál es su peso maximo?" onChange={handlerForm}  name="pesoMax" value={form.pesoMax} />
                      </div>
                      <p id={style.error}> {error.peso ? <p>{error.peso}</p> : null}</p>

                    </div>

                    <div className={style.inputs_div}>
                      <label htmlFor="">Promedio de vida</label>
                      <div className={style.container_inputs}>
                        <input className={style.input} type="text" placeholder="¿Promedio de vida minimo?" onChange={handlerForm}  name="vidaMin" value={form.vidaMin} />
                        <input className={style.input} type="text" placeholder="¿Promedio de vida maximo?" onChange={handlerForm}  name="vidaMax" value={form.vidaMax} />
                      </div>
                      <p id={style.error}> {error.vida ? <p>{error.vida}</p> : null}</p>
                    </div>

                </div>

                <div className={style.temperaments}>
                      <p>Elige los temperamentos que más identifique a tu mascota.
                      Puedes poner hasta tres </p>
                  <div className={style.containerSelect} >

                      <div className={style.containerSelect_select}>

                        <select  onChange={(e)=>{
                          handlerTemperaments(e)
                          handlerForm(e)
                        } 
                        } className={style.select} name="temperaments" id="">
                          <option value="lista" disabled>Lista de temperamentos</option>
                          {selectorTemps.length ? selectorTemps.map((temp)=>{
                            return <option
                            key={temp.id}
                            value = {temp.name.trim()}
                            >{temp.name.trim()}</option>
                          }): null} 
                        </select>
                      </div>             
                    </div>
                    

                    <div className={style.seleccionados_container} >
                      <div className={style.seleccionados}>
                           
                        <p id={style.error}>{errorTemps ? errorTemps :null}  </p>
                        <div>
                          {/*aca se muestran los temperamentos selecionados */}
                          {
                            temperaments.map(temp =>{
                              let count = 0
                              return <div
                                key={++count}                              
                                onClick={()=>deleteTemperament(temp)}
                                className={style.temps_selected}
                              >
                                {temp}
                              </div>
                            })
                          }
                        </div>
                      </div>  
                    </div>

                </div>
               

                <div className={style.button} id={ form.name && !Object.keys(error).length && style.button}  >
                  <p id={style.error_button}>
                    {error.vacio ? <p>{error.vacio}</p> : null}
                  </p>
                  {console.log(Boolean(errorTemps))}
                  <button  disabled={  Object.keys(error).length || !errorTemps} onClick={()=>{handlerSendData()}} className={style.sigin_btn} type="submit">ENVIAR</button>
                </div> 
              </form>
          </div>
      </div>
    )
  }
}  


export default Create;

