import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'
import { useDispatch, useSelector } from "react-redux";
import { get_dogs,filter_temperament, post_dog,get_createdRaces } from "../../redux/actions";
import image from './cargando.gif'
import { Button, Modal, ModalHeader,ModalBody, ModalFooter } from "reactstrap";


const validate = (form, dogs) =>{
  let error = {};
  let{alturaMax, alturaMin, name, pesoMax, pesoMin, temperaments, vidaMax, vidaMin} = form;

  if(!name || !alturaMax || !alturaMin || !pesoMax || !pesoMin || !temperaments || !vidaMax || !vidaMin){
    error.vacio = "Todos los campos deben llenarse";
  }

  if(form.name){
    //cambiar para que consulte directamente a la base de datos y en la api para no crear duplicados 
    const find_dog = dogs.find((dog)=>  dog.name.trim().toLowerCase() === name.toLowerCase()  )
    if(find_dog){
      error.name = "Ya existe una raza con este nombre"
    } else if(!/^[a-zA-Z ]+$/.test(name)){
    //valido que el nombre solo contenga letras y numeros
      error.name = "El nombre no puede contener numeros o caracteres especiales"
    } 
  }

  if(!/^[0-9]+$/.test(alturaMax || alturaMin || pesoMax  || pesoMin || vidaMax || vidaMin)){
    error.caracteres = "El valor de la Altura, Peso y Años de vida deben ser numeros enteros, no pueden contener -,+,.,etc"
  } 

  if(parseInt(alturaMax) < parseInt(alturaMin) || parseInt(alturaMax) === parseInt(alturaMin) ) error.altura = "La altura maxima no puede ser igual o menor a la altura minima"
  if(parseInt(alturaMax) < 0 || parseInt(alturaMin) < 0) error.altura = "La altura no puede ser negativa"
  
  if(parseInt(pesoMax) < parseInt(pesoMin) || parseInt(pesoMax) === parseInt(pesoMin) ) error.peso = "El peso maximo no puede ser igual o menor al peso minimo"
  if(parseInt(pesoMax) < 0 || parseInt(pesoMin) < 0) error.peso = "El peso no puede ser negativo"
  
  if(parseInt(vidaMax) < parseInt(vidaMin) || parseInt(vidaMax) === parseInt(vidaMin) ) error.vida = "El promedio maximo no puede ser igual o menor al promedio minimo"
  if(parseInt(vidaMax) < 0 || parseInt(vidaMin) < 0) error.vida = "El rango de vida no puede ser negativo"

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

  console.log("Estos son los perros desde el create",dogs);
  useEffect(()=>{
    dispatch(get_dogs())
    dispatch(get_createdRaces())
    setError(validate(form, dogs))
  },[])


  //estado para los temperamentos seleccionados de la lista <select /> y de los que voy a crear en el input
  const [temperaments, setTemperaments ] = useState([])
  
  //estado del input para la creacion de nuevos temperamentos 
  const [createTemperaments, setTCreateTemperaments ] = useState("")

  

  const [error,setError] = useState({}) 

  //manejador de estado del form
  const handlerForm = (event) =>{
    const {value, name} = event.target

    if (name === "temperaments") {
      setForm({...form, ["temperaments"] : (form.temperaments + " " + value).trim()})
      setError(validate({...form, ["temperaments"] : form.temperaments + " " + value}, dogs))
      return
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

  const handlerCreateTemperament = (event) =>{
    let value = event.target.value
    setTCreateTemperaments(value)
  }

  const handlerTemperaments =(value)=>{
    setForm({...form, ["temperaments"] : form.temperaments + " " + value})
    setError(validate({...form, ["temperaments"] : form.temperaments + " " + value}, dogs))

    setTCreateTemperaments("")
  }
   
  const deleteTemperament = (value) =>{
   
    if(temperaments.length === 1){
      setTemperaments([])
      return 
    }
    let update_Temperaments = form.temperaments.trim().split(" ").filter(t => t !== value)
    setForm({...form,["temperaments"] : update_Temperaments.join(" ")})
    setError(validate({...form, ["temperaments"] : update_Temperaments.join(" ")}, dogs))
  }  

  const [stateModal, setStateModal] = useState(false)
 
  const handlerSendData = () =>{
    setStateModal(true)
    dispatch(post_dog(form))
    setForm(   {
      name : "",
      alturaMax : "",
      alturaMin : "",
      pesoMax : "",
      pesoMin : "",
      temperaments :"",
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
                      <p>Elige los temperamentos que más identifique a tu mascota o escribelo tú.
                      Puedes poner hasta tres </p>
                  <div className={style.containerSelect} >
                      <div className={style.containerSelect_select}>
                        <select  onChange={handlerForm} className={style.select} name="temperaments" id="">
                          <option value="lista" disabled   >Lista de temperamentos</option>
                          {selectorTemps.length ? selectorTemps.map((temp)=>{
                            return <option
                            key={temp.id}
                          
                            value = {temp.name.trim()}
                            >{temp.name.trim()}</option>
                          }): null} 
                        </select>
                      </div>
                      <div className={style.containerSelect_input}>
                       
                          <input onChange={handlerCreateTemperament}  name="search" type="text"   value={createTemperaments} /> 
                          <button onClick={()=>handlerTemperaments(createTemperaments)} >AGREGAR</button>
                       
                      </div>
                    </div>
                    

                    <div className={style.seleccionados_container} >
                      <div className={style.seleccionados}>
                        <p>SELECCIONADOS</p>
                        <div>

                          {form.temperaments.split(" ").map((temp)=>{
                            if(temp === "") return
                            return <div 
                              className={style.temps_selected}
                              key = {temp}>
                                <p
                                value ={temp}
                                onClick = {(e)=> deleteTemperament(e.target.innerHTML)}
                                >{temp}</p> 
                            </div> 
                          })}
                        </div>
                      </div>  
                    </div>

                </div>
               

                <div className={style.button} id={ form.name && !Object.keys(error).length && style.button}  >
                  <p id={style.error_button}>
                    {error.vacio ? <p>{error.vacio}</p> : null}
                  </p>
                  <button  disabled={Object.keys(error).length} onClick={()=>{handlerSendData()}} className={style.sigin_btn} type="submit">ENVIAR</button>
                </div>
              </form>
          </div>
          {/* {
            Object.keys(error).length ? 
            <div  className={style.error}>
         
             

              {error.peso ? <p>{error.peso}</p> : null}
              {error.pesoNegativo ? <p>{error.pesoNegativo}</p> : null}
              {error.caracteres ? <p>{error.caracteres}</p> : null}

              {error.vidaNegativa ? <p>{error.vidaNegativa}</p> : null}


             
            </div>
            : null 
          } */}

{/*      
<form class="form">
    <div class="header">Sign In</div>
    <div class="inputs">
        <input placeholder="Email" class="input" type="text">
        <input placeholder="Password" class="input" type="password">
        <div class="checkbox-container">
            <label class="checkbox">
            <input type="checkbox" id="checkbox">
            </label>
            <label for="checkbox" class="checkbox-text">Remember me</label>
        </div>
        <button class="sigin-btn">Submit</button>
        <a class="forget" href="#">Forget password ?</a>
        <p class="signup-link">Don't have an account? <a href="#">Sign up</a></p>
    </div>
</form>

                <div id={style.medidas}>
                  <label htmlFor="altura">Altura</label> 
                  <div className={style.medidas_input} >
                    <input  type="text" placeholder="min" onChange={handlerForm}  name="alturaMin" value={form.alturaMin} />
                    <input  type="text" placeholder="max" onChange={handlerForm}  name="alturaMax" value={form.alturaMax} />
                  </div> 
                </div>  

                <div id={style.medidas}>
                  <label htmlFor="peso">Peso</label>
                  <div className={style.medidas_input} >
                    <input  type="text" placeholder="min" onChange={handlerForm}  name="pesoMin" value={form.pesoMin} />
                    <input  type="text" placeholder="max" onChange={handlerForm}  name="pesoMax" value={form.pesoMax} />
                  </div>
                </div> 
            
                <div id={style.medidas}>
                  <label htmlFor="vida">Rango de vida aproximado </label>
                  <div className={style.medidas_input} >
                    <input  type="text" placeholder="min" onChange={handlerForm}  name="vidaMin" value={form.vidaMin} />
                    <input  type="text" placeholder="max" onChange={handlerForm}  name="vidaMax" value={form.vidaMax} />
                  </div>
                </div>

                <div id={ form.name && !Object.keys(error).length && style.button}  className={style.sigin_btn}>
                  <button  disabled={ Object.keys(error).length} onClick={()=>{handlerSendData()}} type="submit">ENVIAR</button>
                </div>

              </div>

              <div className={style.formTemperaments} >
                  <div className={style.header} >
                    <div className={style.header_p}>
                      <p>SELECCIONA LOS TEMPERAMENTO</p> 
                    </div>

                    <div className={style.header_select} >
                      <select  onChange={handlerForm} className={style.select} name="temperaments" id="">
                        <option value="lista" disabled   >Lista de temperamentos</option>
                        {selectorTemps.length ? selectorTemps.map((temp)=>{
                          return <option
                          key={temp.id}
                        
                          value = {temp.name.trim()}
                          >{temp.name.trim()}</option>
                        }): null} 
                      </select>
                    </div>


                    <div className={style.header_input} > 
                      <div className={style.inputs}>
                        <input onChange={handlerCreateTemperament}  name="search" type="text"   value={createTemperaments} /> 
                        <button onClick={()=>handlerTemperaments(createTemperaments)} >AGREGAR</button>
                      </div > 
                    </div>
                  </div>

                  <div className={style.seleccionados} >
                    <p>SELECCIONADOS</p>
                    <div>
                      {form.temperaments.split(" ").map((temp)=>{
                        if(temp === "") return
                        return <div 
                          className={style.temps_selected}
                          key = {temp}>
                            <p
                            value ={temp}
                            onClick = {(e)=> deleteTemperament(e.target.innerHTML)}
                            >{temp}</p> 
                        </div> 
                      })}
                    </div>  
                  </div>
              </div>
          



           */}
          
        </div>
    )
  }
}  


export default Create;

