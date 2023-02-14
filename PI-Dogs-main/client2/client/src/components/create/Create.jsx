import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'
import { useDispatch, useSelector } from "react-redux";
import { get_dogs,filter_temperament, post_dog } from "../../redux/actions";

// /^[a-zA-Z ]+$/.test("das asd ")

const validate = (form, dogs) =>{
  const error ={}
  const name = form.name.trim()

  //evaluar con el nombre todo el minuscula al igual que el nombre de los perros del array
  const find_dog = dogs.find((dog)=>  dog.name.trim().toLowerCase() === name.toLowerCase()  )
  console.log(dogs);
  console.log(find_dog);
  if(find_dog){
    error.name = "Ya existe una raza con este nombre"
  } else if(!/^[a-zA-Z ]+$/.test(name)){
  //valido que el nombre solo contenga letras y numeros
    error.name = "El nombre no puede estar vacio, tampoco contener numeros o caracteres especiales"
  } 


  if (parseInt(form.alturaMin) > parseInt(form.alturaMax) ){
    error.altura = "La altura maxima no puede ser menor a la altura minima "
  } 


  if (parseInt(form.pesoMin) > parseInt(form.pesoMax)) {
    error.altura = "El peso maximo no puede ser menor al peso minimo "
  } 
  if (form.años_de_vida < 0){
    error.años_de_vida = "Los años de vida debe ser positivo"
  } 
    
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
      temperaments : "",
      años_de_vida : "" 
    }
  )   
  
  const [error,setError] = useState({
    // name : "", //que no tenga caracteres especiales ni numeros o si ya existe
    // peso : "", // que el max sea menor a min  
    // altura : "",  // "  " 
    // años_de_vida : "" //no puede ser negativo
  }) 

  const [complete, setComplete]  = useState(false)
 

  //manejador de estado del form
  const handlerForm = (event) =>{
    const {value, name} = event.target
    setForm({
      ...form,
      [name] : value
    })
    setError(validate({...form, [name] : value}, dogs))

  }
 
 
  const selectTemperament = (event) => {
    let tempermant = event.target.value
    dispatch(filter_temperament(tempermant))
  }

  const handlerSubmit = (event)=>{
    event.preventDefault() 
    //action :
 
  }


  const handlerTemperaments = (event) =>{
    console.log(event);
  }

  const handlerSendData = ( ) =>{
    
    console.log("envio los datos");
    // dispatch(post_dog(form))
  }

  return(
      <div  className={style.conteiner}>
        <form  onClick={(e)=> handlerSubmit(e)} >
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

          <div className={style.campos}>
            <label htmlFor="años_de_vida">AÑOS DE VIDA</label>
            <input type="number" onChange={handlerForm}  name="años_de_vida" value={form.años_de_vida} />
          </div>
          {console.log(error)}
          <div id={ !Object.keys(error).length && style.button}  className={style.campos}>
          <button  disabled={ Object.keys(error).length} onClick={()=>{handlerSendData()}} type="submit">ENVIAR</button>
          </div>

        </form>
        {
          Object.keys(error).length ? 
          <div  className={style.error}>
            {error.name ? <p>{error.name}</p> : null}
            {error.altura ? <p>{error.altura}</p> : null}
            {error.peso ? <p>{error.peso}</p> : null}
            {error.años_de_vida ? <p>{error.años_de_vida}</p> : null}
          </div>
          : null
        }
        
      </div>
  )
}


/* <div className={style.campos}>
            <p>TEPERAMENTOS </p>
            <label htmlFor="">Temperamentos</label>
            <label htmlFor="">crea y luego selecionalo en la lista de arriba</label>
            <input  onChange={(e)=>handlerForm(e)}  name="temperaments" value={form.temperaments} type="text" />
        </div>

          
        <form className={style.temperaments} onChange= {(e)=>{handlerTemperaments(e)}} >
              <select multiple name="temperamentos" id="temp" >
                    <option>Elije por temperamentos</option>
                                {selectorTemps.length ? selectorTemps.map((temp)=>{
                                return <option
                                onClick={(event)=>selectTemperament(event)}
                                key={temp.id}
                                name = {temp}
                                >                    
                                {temp.name}
                                </option>
                            })  :null}
              </select>
        </form>          */ 

export default Create;


  /* Ruta de creación de raza de perro: debe contener

[ x] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida

[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro
Es requisito que el formulario de creación esté validado con JavaScript 
y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. 
Por ejemplo: Que el nombre de la raza no pueda contener números o símbolos, 
que el peso/altura mínimo no pueda ser mayor al máximo y viceversa, etc.*/ 