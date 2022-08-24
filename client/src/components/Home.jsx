import React, { Fragment, useEffect, useState } from "react";
import CardDog from "./CardDog";
import SearchBar from "./SearchBar";
// import Temperaments from "./Temperaments";
import { useSelector,useDispatch } from "react-redux";
import {  obtenerDogs,obtenerTemperaments,filterByTemperaments, filterCreated, filterByName, filterByWeight  } from "../redux/actions";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import './home.css'


export default function Home(){
    const dispatch= useDispatch()
    //estados 
    const estadoDogs= useSelector(state=>state.allDogs)
    const estadoTemperaments=useSelector(state=>state.temperament)

//---------ESTADOS LOCALES------------
    // numero de pagina
    const [numPag,setNumPag]=useState(1)
    // dogs por pagina
    const [dogsPorPag,setDogsPorPag]=useState(8)
    const[orden,setOrden]=useState('')

    
    const indexUltDog =numPag * dogsPorPag //8
    const indexPriDog= indexUltDog - dogsPorPag //0
    const numdog= estadoDogs.slice(indexPriDog,indexUltDog)
    
    const paginado=(pagNum)=>{
        setNumPag(pagNum)
    }

    //------FUNCIONES--------
    // function handleTemp(e){
    //     e.preventDefault()
    //     dispatch(obtenerTemperaments())
    // }

     function handleClick(e){
        e.preventDefault();
        dispatch(obtenerDogs());
     }
     const handleFilterTemperament=(e)=>{
        // e.preventDefault();
        dispatch(filterByTemperaments(e.target.value))
     }
  
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    
    function handleSort(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setNumPag(1);
        setOrden(`Ordenado${e.target.value}`)
    }
    function handleSortWeight(e){
        e.preventDefault();
        dispatch(filterByWeight(e.target.value))
        setNumPag(1);
        setOrden(e.target.value)
    }


    useEffect(()=>{
        //acciones a despachar despues de renderizar componente
        dispatch(obtenerDogs());
        dispatch(obtenerTemperaments())
        
     }, [dispatch])



    return (
        <div value="div" className="fondo">
            <div className="titulo">
            <Link to='/dogs'>Crear dog</Link>
            </div>
             <h2>Breed</h2>
             {/* <button onClick={e=>{handleTemp(e)}}>Temperaments</button> */}
             <button onClick={e=>{handleClick(e)}}>
                Volver a cargar los dog
             </button>
             <div>
                <div className="titulo">
                Ordenamiento: 
                </div>
                <select onChange={e=>handleSort(e)} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Alfabetico</option>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                </select>
                <select onChange={e=>handleSortWeight(e)} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Peso</option>
                    <option value='min-max'>Min-Max</option>
                    <option value='max-min'>Max-Min</option>
                </select>
                <select onChange={e=>handleFilterCreated(e)} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Origen</option>
                    <option value='todos'>Todos</option>
                    <option value='creado'>Desde Base Datos</option>
                    <option value='api'>Desde Api</option>
                </select>

                <div className="titulo">
                <span>Temperaments:</span>
                </div>
                <div>

                    
                    {/* 1 */}

                    <select onChange={handleFilterTemperament}  defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Temperaments</option>
                    <option value="todos">Todos</option>
                        {
                            estadoTemperaments.map(temp=><option key={temp.name}>{temp.name}</option>)
                        }
                    </select>
                </div>
                {/* 2 */}
                {/* <select onChange={handleFilterTemperament}>
                    <option disabled selected defaultValue>Temperaments</option>
                    <option value='todos'>Todos</option>
                    {
                        estadoTemperaments?.map(temp=>(
                            <option value={temp.name} key={temp.id}>{temp.name}</option>
                        ))
                    }
                </select> */}

                <Paginado
                dogsPorPag={dogsPorPag}
                estadoDogs={estadoDogs.length}
                paginado={paginado}
                />
                <SearchBar/>

             {
             numdog?.map(allDogs=>
                <div key={allDogs.id} className="contenedor">
                    <Fragment>
                    <Link to={"/detail/" +allDogs.id }>
                        <CardDog name={allDogs.name} image={allDogs.image} temperament={allDogs.temperament} weight={allDogs.weight} key={allDogs.id}/>
                        </Link>
                     </Fragment>

                </div>
             )}
            </div>
        </div>
    )
}