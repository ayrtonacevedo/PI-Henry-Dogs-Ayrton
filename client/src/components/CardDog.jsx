import React from "react";
import s from './CardDog.module.css';

 export default function CardDog({name,image,temperament,weight}) {
    return(
        <div className={s.contenedor}>
            <div>
                <h3>{name}</h3>
            </div>
            <div>
                <h4>weight: {weight}</h4>
            </div>
            <div>
                <img src={image} alt="not"  style={{width: "190px", height: "190px"}}/>
            </div>
            <div>
                <h4>Temperaments</h4>
                <h4>{temperament}</h4>
            </div>
        </div>
    )

 }