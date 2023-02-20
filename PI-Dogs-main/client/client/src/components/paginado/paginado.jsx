import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from 'react-redux'
import { sumar, dataApi, get_dogs } from "../../redux/actions";
import style from './paginado.module.css'
import Pages from "./paginado";


const Paginado = (props) => {
    const selector = useSelector((state)=> state.dogs)
    const [valuePage, SetValuePage] = useState(1)
    const [finDogs, setFinDogs] = useState(8) // VALOR INCIAL DE CANTIDAD DE PERROSS
  
    const finalpage = finDogs * valuePage
    const InicioPage = finalpage - finDogs
  
    const totalPages = Math.ceil(selector.length/finDogs)
    console.log(totalPages);


    const Next = (valuePage) => {
      if(valuePage === totalPages) return
      let pag = valuePage + 1
      SetValuePage(pag)
    }
    const back = (valuePage) => {
      if(valuePage === 1 ) return
      let pag = valuePage - 1
      SetValuePage(pag)
    }

    let num_indice_total = totalPages
    
    function indice_func (num_indice_total){
        
        const indice_num = [];
        while(num_indice_total){
            indice_num.push(num_indice_total);
            num_indice_total--
        }
        return indice_num;
    }
    
    let indice = indice_func(num_indice_total)
    console.log(indice);
    return (
      <div className={style.all}>
        <div className={style.paginado}>
          <div className={style.buttons} >
            <button  className={style.button_1} onClick={() => back(valuePage)}>ATRAS</button>
            <button  className={style.button_2} onClick={() => Next(valuePage)}>SIGUIENTE</button>
          </div>
          <div className={style.paginas}>
            <p>Pagina {valuePage}</p>
          </div>
        </div>
        <div>
            <div className={style.conteiner_indice}>{
            num_indice_total
                ? indice.map(i=> {
                    return <div
                    className={style.indice}
                    key={i}
                    >
                        {i}
                    </div>
                })
                : null
            }</div>
        </div>
   
      </div>
    )
  
}

export default Paginado; 