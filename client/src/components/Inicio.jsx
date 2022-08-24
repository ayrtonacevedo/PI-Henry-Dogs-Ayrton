import React from 'react'
import {Link} from 'react-router-dom'
import './inicio.css'

export default function Inicio(){
    return(
        // <div classsName='IniCointainter'>
            <div className='global'>
                <h1>Bienvenido a la web Dogs </h1>
                <Link to='/home'>
                <button className='but'>Home!</button>
            </Link>
            </div>
 
    )

 }
