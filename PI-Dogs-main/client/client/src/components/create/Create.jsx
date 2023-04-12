import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'
import { useDispatch, useSelector } from "react-redux";
import { get_dogs,filter_temperament, post_dog } from "../../redux/actions";
import image from './cargando.gif'

const validate = (form, dogs) =>{
  console.log("entre a validate", form)
  let error = {};
  let{alturaMax, alturaMin, name, pesoMax, pesoMin, temperaments, vidaMax, vidaMin} = form;

  if(!name || !alturaMax || !alturaMin || !pesoMax || !pesoMin || !temperaments || !vidaMax || !vidaMin){
    error.vacio = "Todos los campos deben llenarse";
  }

  if(form.name){
    const find_dog = dogs.find((dog)=>  dog.name.trim().toLowerCase() === name.toLowerCase()  )
    if(find_dog){
      error.name = "Ya existe una raza con este nombre"
    } else if(!/^[a-zA-Z ]+$/.test(name)){
    //valido que el nombre solo contenga letras y numeros
      error.name = "El nombre no puede contener numeros o caracteres especiales"
    } 
  }



  if(parseInt(alturaMax) < 0 || parseInt(alturaMin) < 0) error.alturaNegativa = "La altura no puede ser negativa"
  if(parseInt(alturaMax) < parseInt(alturaMin) || parseInt(alturaMax) === parseInt(alturaMin) ) error.altura = "La altura maxima no puede ser igual o menor a la altura minima"
  
  if(parseInt(pesoMax) < 0 || parseInt(pesoMin) < 0) error.pesoNegativo = "El peso no puede ser negativo"
  if(parseInt(pesoMax) < parseInt(pesoMin) || parseInt(pesoMax) === parseInt(pesoMin) ) error.peso = "El peso maximo no puede ser igual o menor al peso minimo"
  
  if(parseInt(vidaMax) < 0 || parseInt(vidaMin) < 0) error.vidaNegativa = "El rango de vida no puede contener numeros negativos"
  if(parseInt(vidaMax) < parseInt(vidaMin) || parseInt(vidaMax) === parseInt(vidaMin) ) error.peso = "El peso maximo no puede ser igual o menor al peso mvidao"

  return error 
}

const Create = () =>{
  const dispatch = useDispatch()
  const selectorTemps = useSelector((state)=>state.temperaments)
  const dogs = useSelector((state)=>state.dogs)

  useEffect(()=>{
    dispatch(get_dogs())
  },[])


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
      color : ""
    }
  )   
  //estado para los temperamentos seleccionados de la lista <select /> y de los que voy a crear en el input
  const [temperaments, setTemperaments ] = useState([])
  
  //estado del input para la creacion de nuevos temperamentos 
  const [createTemperaments, setTCreateTemperaments ] = useState("")

  

  const [error,setError] = useState({}) 

  //manejador de estado del form
  const handlerForm = (event) =>{
    const {value, name} = event.target
    console.log(event.target.value);
    console.log(event.target.name);

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
    console.log("hola");
    setForm({...form, ["temperaments"] : form.temperaments + " " + value})
    setError(validate({...form, ["temperaments"] : form.temperaments + " " + value}, dogs))

    setTCreateTemperaments("")
  }
  console.log(form);
   
  const deleteTemperament = (value) =>{
   
    if(temperaments.length === 1){
      setTemperaments([])
      return 
    }
    let update_Temperaments = form.temperaments.trim().split(" ").filter(t => t !== value)
    setForm({...form,["temperaments"] : update_Temperaments.join(" ")})
    setError(validate({...form, ["temperaments"] : update_Temperaments.join(" ")}, dogs))
  }  

 
  const handlerSendData = () =>{
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
      color : ""
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
          <form  onClick={(e)=> handlerSubmit(e)} >
            <div className={style.formInfo}>
              <div className={style.campos}>
                  <label htmlFor="name">Nombre</label>
                  <input onChange={handlerForm} value={form.name} name="name"  type="text" /> 
              </div>

              <div id={style.medidas}>
                <label htmlFor="altura">Altura</label> 
                <div className={style.medidas_input} >
                  <input  type="number" placeholder="min" onChange={handlerForm}  name="alturaMin" value={form.alturaMin} />
                  <input  type="number" placeholder="max" onChange={handlerForm}  name="alturaMax" value={form.alturaMax} />
                </div> 
              </div>  

              <div id={style.medidas}>
                <label htmlFor="peso">Peso</label>
                <div className={style.medidas_input} >
                  <input  type="number" placeholder="min" onChange={handlerForm}  name="pesoMin" value={form.pesoMin} />
                  <input  type="number" placeholder="max" onChange={handlerForm}  name="pesoMax" value={form.pesoMax} />
                </div>
              </div> 
          
              <div id={style.medidas}>
                <label htmlFor="vida">Rango de vida aproximado </label>
                <div className={style.medidas_input} >
                  <input  type="number" placeholder="min" onChange={handlerForm}  name="vidaMin" value={form.vidaMin} />
                  <input  type="number" placeholder="max" onChange={handlerForm}  name="vidaMax" value={form.vidaMax} />
                </div>
              </div>

              <div id={ form.name && !Object.keys(error).length && style.button}  className={style.campos}>
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
                      <option value="lista"    >Lista de temperamentos</option>
                      {selectorTemps.length ? selectorTemps.map((temp)=>{
                        return <option
                        key={temp.id}
                       
                        value = {temp.name.trim()}
                        >{temp.name.trim()}</option>
                      }): null} 
                    </select>
                  </div>


                  <div className={style.header_input} > 
                    <div className={style.header_input_form}>
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
          </form>
        
          {
            Object.keys(error).length ? 
            <div  className={style.error}>
         
              {error.name ? <p>{error.name}</p> : null}
              {error.altura ? <p>{error.altura}</p> : null}
              {error.alturaNegativa ? <p>{error.alturaNegativa}</p> : null}

              {error.peso ? <p>{error.peso}</p> : null}
              {error.pesoNegativo ? <p>{error.pesoNegativo}</p> : null}
              

              {error.vidaNegativa ? <p>{error.vidaNegativa}</p> : null}


              {error.vacio ? <p>{error.vacio}</p> : null}

            </div>
            : null 
          }
          
        </div>
    )
  }
}  


export default Create;

