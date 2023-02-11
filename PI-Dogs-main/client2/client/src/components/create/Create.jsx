import React from "react";
import {Link} from "react-router-dom"
import style from './Create.module.css'

const Create = () =>{

  /* Ruta de creación de raza de perro: debe contener

[ ] Un formulario controlado con JavaScript con los siguientes campos:
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
    return(
      <div  className={style.conteiner}>
        <Link to= '/home' ><button>Ir al Home</button> </Link>
        <form>
          <div>
            <label htmlFor="">Nombre</label>
            <input type="text" />
          </div>
       
          <div>
            <p>Altura</p>

            <label htmlFor="">MAX</label>
              <input type="text" />
            <label htmlFor="">MIN</label>
              <input type="text" />
          </div>

          <div>
            <p>Peso</p>

            <label htmlFor="">MAX</label>
              <input type="text" />
            <label htmlFor="">MIN</label>
              <input type="text" />
          </div>

          <div>
            <p>TEPERMANTOS, ELEGI O ESCRIBI EL TUYO </p>
            <label htmlFor="">Temperamntos</label>
            <input type="text" />
          </div>
          
          <div>
            <label htmlFor="">AÑOS DE VIDA</label>
            <input type="text" />
          </div>

          <button type="submit">ENVIAR</button>
        </form>
      </div>
    )
}

export default Create;