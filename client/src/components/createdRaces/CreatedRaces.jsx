import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_createdRaces } from '../../redux/actions'
import Card from '../card/Card'
import style from "../card/Card.module.css"




export default function CreatedRaces() {
    const dogs = useSelector(state=> state.createdRaces)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_createdRaces())
    },[])

    console.log(dogs);
  return (
    <div>
        <h1>hola</h1>

        { dogs.length 
            ?  dogs.map(dog=>{
                const { name, id,  image, temperament, max ,min,type } = dog
                return <div>
                    <h1>{name}</h1>
                    <img src={image} alt="" />
                </div>        
                    })
            : null 
            } 
    </div>
  )
}

