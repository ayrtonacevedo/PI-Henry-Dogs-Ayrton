import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../redux/actions";
import { cleanStatus } from "../redux/actions";
import { useEffect } from "react";
import  s from'./dogDetail.module.css'

export default function Detail(props){

    const dispatch=useDispatch()
    let id=props.match.params.id;
    
    function handleCleanStatus(e){
        dispatch(cleanStatus)
    }

  

    useEffect(()=>{
        dispatch(dogDetail(id))
    },[dispatch, id])

    const myDog=useSelector((state)=>state.dogDetail)
    return(
        <div className={s.todo}>
        <div className={s.contenedor}>
            {
                myDog.length>0?
                <div className={s.hola} >
                    <h3 className={s.titulo}>{myDog[0].name}</h3>
                    <img style={{width: "190px", height: "190px"}} src={myDog[0].image} alt="not found"></img>
                    <h4 className={s.titulo}>Height:</h4>
                    <h5>{myDog[0].height}</h5>
                    <h4 className={s.titulo}>Weight:</h4>
                    <h5>{myDog[0].weight}</h5>
                    <h4 className={s.titulo}>Life Span:</h4>
                    <h5>{myDog[0].life_span}</h5>
                    <h4 className={s.titulo}>Temperaments:</h4>
                    <h5>{myDog[0].temperament}</h5>

                </div>:<p>Cargando...</p>
            }

        </div> 
        <Link to='/home'>
               
               <button value="volver" className={s.btn} onClick={e=>{handleCleanStatus(e)}}>Volver</button>
           </Link>
        </div>
    )
}