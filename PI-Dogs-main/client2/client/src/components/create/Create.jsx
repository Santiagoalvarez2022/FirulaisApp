import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'
import { useDispatch, useSelector } from "react-redux";
import { get_dogs,filter_temperament, post_dog } from "../../redux/actions";
import image from './cargando.gif'

const validate = (form, dogs) =>{
  const error ={}
  const name = form.name.trim()
  //evaluar con el nombre todo el minuscula al igual que el nombre de los perros del array
  const find_dog = dogs.find((dog)=>  dog.name.trim().toLowerCase() === name.toLowerCase()  )
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
      temperaments :"",
      vidaMax : "",
      vidaMin : "",
      image : ""
    }
  )   
  
  const [temperaments, setTemperaments ] = useState([])

  const [error,setError] = useState({
    // name : "", //que no tenga caracteres especiales ni numeros o si ya existe
    // peso : "", // que el max sea menor a min  
    // altura : "",  // "  " 
    // años_de_vida : "" //no puede ser negativo
  }) 

  //manejador de estado del form
  const handlerForm = (event) =>{
    const {value, name} = event.target
    setForm({
      ...form,
      [name] : value
    })
    setError(validate({...form, [name] : value}, dogs))
  }
 
  const handlerSubmit = (event)=>{
    event.preventDefault() 
  }


  const handlerTemperaments =(event)=>{
    const value = event.target.value
    setForm({...form, ["temperaments"] : form.temperaments + " " + value}) 
   
  }
   
  const deleteTemperament = (event) =>{
    const value = event.target.innerHTML
    console.log("toque ", value);
    if(temperaments.length === 1){
      setTemperaments([])
      return 
    }
    let update_Temperaments = form.temperaments.trim().split(" ").filter(t => t !== value)
    setForm({...form,["temperaments"] : update_Temperaments.join(" ")})
  }  

 
  const handlerSendData = () =>{
    dispatch(post_dog(form))
    console.log(form);
    console.log("enviado ");
    setForm(   {
      name : "",
      alturaMax : "",
      alturaMin : "",
      pesoMax : "",
      pesoMin : "",
      temperaments :"",
      vidaMax : "",
      vidaMin : "",
      image : "" 
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

            <div className={style.formInfo} >
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


           
      
              <div id={ !Object.keys(error).length && style.button}  className={style.campos}>
                <button  disabled={ Object.keys(error).length} onClick={()=>{handlerSendData()}} type="submit">ENVIAR</button>
              </div>
            </div>
            <div className={style.formTemperaments} >

                <div className={style.header} >
                  <p>SELECCIONA LOS TEMPERAMENTO</p> 
                  <select  onChange={handlerTemperaments} className={style.select} name="" id="">
                    <option value="lista"    >Lista de temperamentos</option>
                    {selectorTemps.length ? selectorTemps.map((temp)=>{
                      return <option
                      key={temp.id}
                      value = {temp.name.trim()}
                      >{temp.name.trim()}</option>
                    }): null} 
                  </select>
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
                           onClick = {deleteTemperament}
                           >{temp}</p> 
                      </div> 
                    })}
                  </div>  
                </div>
            </div>
          </form>
          <div className={style.img}>
                  <label htmlFor="años_de_vida">Foto</label>
                  <input type="file"onChange={handlerForm}  name = "image" value={form.image} />

                </div> 
       
         


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
}  



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


/*          
<div className={style.conteiner_temperaments} >
<p>Temperamentos</p>
<div className={style.temperaments}>
  {selectorTemps.length 
  ? selectorTemps.slice(InicioPage,finalpage).map(temp =>{
    return <div
    key={temp.id}
    >{temp.name}</div>
  })  
  : null}
</div>

  <button onClick={()=> back(valuePage)} >atras</button>
  <button onClick={()=> Next(valuePage)} >adelante</button>
<div> <>pagina : {valuePage }</></div>

</div> 


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
