import React,{useState,useEffect} from "react";
import{Link,useHistory} from 'react-router-dom'
import { postDog, obtenerTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    // ^ coincidencia en todas las lineas ?! coincide con siempre que no este en blanco * coincidencia de muchas letras repetidas
    // $ coincide con lo ultimo /gm coincide todos los caracteres en multiples lineas 
    let pattern =  /^[0-9]+[ ]+[-]+[ ]+[0-9]*$/;
    let expresion = /^(?![ .]+$)[a-zA-Z .]*$/gm;
    
  
    let errors = {};                                                                                                                                             
  //name
    if (!input.name) {
      errors.name = "ingrese un nombre";
    } else if (!expresion.test(input.name)) {
      errors.name ="el nombre solo debe contener letras y no debe superar los 9 caracteres";}
    //
    //height
       if (!input.height) {
      errors.height = "la altura es requerida 'min - max'";
    } else if (!pattern.test(input.height)) {
      errors.height ="La altura debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
    } else if (parseInt(input.height.split(" - ")[0]) >= parseInt(input.height.split(" - ")[1])) {
      errors.height = "el primer nuemero debe ser menor que el segundo";
    } else if (
      parseInt(input.height.split(" - ")[0]) <= 0 ||
      parseInt(input.height.split(" - ")[1]) <= 0 ||
      parseInt(input.height.split(" - ")[0]) > 20 ||
      parseInt(input.height.split(" - ")[1]) > 35
    ) {
      errors.height = "no se permite numeros mayores a 35, negativos o 0";}
      //
     
      //weight
      if (!input.weight) {
      errors.weight = "el peso es requerido 'min - max'";
    } if (!pattern.test(input.weight)) {
      errors.height ="La altura debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
    }  if (parseInt(input.weight.split(" - ")[0]) >= input.weight.split(" - ")[1]) {
      errors.weight = "el primer nuemero debe ser menor que el segundo";
    }  if (
      parseInt(input.weight.split(" - ")[0]) <= 0 || 
      parseInt(input.weight.split(" - ")[1]) <= 0 ||
      parseInt(input.weight.split(" - ")[0]) > 50 || 
      parseInt(input.weight.split(" - ")[1]) > 90 
    ) {
      errors.weight = "no se permite numeros mayores a 90, negativos o 0";} 
      //
      //life span
      if (!input.life_span) {
      errors.life_span = "la esperanza de vida es requerida 'min - max'";
    }  if (!pattern.test(input.life_span)) {
      errors.life_span =
        "La life span debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
    }  if (parseInt(input.life_span.split(" - ")[0]) >= parseInt(input.life_span.split(" - ")[1])){
      errors.life_span = "el primer nuemero debe ser menor que el segundo";
    }  if (
      parseInt(input.life_span.split(" - ")[0]) <= 0 ||
      parseInt(input.life_span.split(" - ")[1]) <= 0 ||
      parseInt(input.life_span.split(" - ")[0]) > 8 || 
      parseInt(input.life_span.split(" - ")[1]) > 25 
    ) {
      errors.life_span = "no se permite numeros mayores a 25, negativos o 0";
    }
    return errors;
  }


export default function DogCreate(){
    const dispatch=useDispatch()
    const temperamentos=useSelector((state)=>state.temperament)
    const history=useHistory()
    const[errors,setErrors]=useState({})

    const [input,setInput]=useState({
        name:"",
        weight:"",
        height:"",
        life_span:"",
        image:"",
        temperament:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))

        console.log(input)
    }

    function handleSelect(e){

        if(input.temperament.includes(e.target.value)){
            alert("Temperament ya seleccionado")
        }else{
            setInput({
                ...input,
                temperament:[...input.temperament,e.target.value]
            })
        }

    }
    function handleSubmit(e){

       if(!input.name.length ||input.temperament.length<3){
        alert("Agrega al menos tres temperaments")
       }
        else if(
            errors.name !== undefined ||
            errors.weight !== undefined ||
            errors.height !== undefined ||
            errors.life_span !== undefined
        ){
            alert("Revisa los errores")
        }else{
            dispatch(postDog(input))
            alert("Dog Creado!")
            setInput({
                name:"",
                weight:"",
                height:"",
                life_span:"",
                image:"",
                temperament:[]
            })
           
            history.push('/home')
        }
    }
    
    function handleDelete(e){
        setInput({
            ...input,
            temperament:input.temperament.filter(temp=>temp!==e)
        })
    }

    useEffect(()=>{
        dispatch(obtenerTemperaments());
    },[dispatch])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu Dog</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <label>Name:</label>
                <input type="text"
                value={input.name}
                name='name'
                onChange={(e)=>handleChange(e)}
                 />
                 {errors.name&&(
                    <p>{errors.name}</p>
                 )}

                </div>

                <div>
                    <label>Weight</label>
                    <input
                    type='text'
                    value={input.weight}
                    name='weight'
                    placeholder="ejemplo...10 - 15"
                    onChange={handleChange}/>
                    {errors.weight&&(
                        <p>{errors.weight}</p>
                    )}
                </div>

                <div>
                    <label>Height:</label>
                    <input
                    type='text'
                    value={input.height}
                    name='height'
                    placeholder="ejemplo...20 - 35"
                    onChange={handleChange}/>
                    {errors.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label>Life Span:</label>
                    <input
                    type='text'
                    value={input.lifeSpan}
                    name='life_span'
                    placeholder="ejemplo...1 - 5"
                    onChange={handleChange}/>
                    {errors.life_span&&<p>{errors.life_span}</p>}
                </div>

                <div>
                    <label>Image:</label>
                    <input
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={handleChange}/>
                </div>

                <div>
                    <label>Temperaments:</label>
                    <select onChange={(e)=>handleSelect(e)}>
                     {temperamentos.map((temp)=>(<option value={temp.name}>{temp.name}</option>))}
                    </select>
                    <ul><li>{input.temperament.map(temp=>temp+", ")}</li></ul>
                </div>
                <div>
                <button type='submit'>Crear tu Dog!</button>
                </div>
             </form>
             {input.temperament.map(e=>
                <div>
                    <p>{e}</p>
                    <button onClick={()=>handleDelete(e)}>x</button>
                </div>
                )}
        </div>
    )
} 