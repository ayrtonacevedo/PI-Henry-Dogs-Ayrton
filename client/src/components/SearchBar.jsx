import React, { useEffect } from "react";
import { useState,  } from "react";
import { useDispatch, } from "react-redux";
import { nameDog, obtenerDogs, } from "../redux/actions";



export default function SearchBar(){
    const dispatch=useDispatch()
    const [name,setName]=useState("")
    

  
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
            e.preventDefault() 

            dispatch(nameDog(name))
            setName("")    
    }
    useEffect(()=>{
        dispatch(obtenerDogs)
    },[dispatch])

    return(
        <div>
            <input
            type="text"
            placeholder="Buscar..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}