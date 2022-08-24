import axios from 'axios';

export const OBTENER_DOG="OBTENER DOG"
export const RUTA_DOGS="http://localhost:3001/dogs"

export const RUTA_TEMPERAMENTS="http://localhost:3001/temperament" 
export const OBTENER_TEMPERAMENTS="OBTENER TEMPERAMENTS"
export const FILTER_BY_TEMPERAMENTS="FILTER BY TEMPERAMENTS"

export const FILTER_CREATED="FILTER CREATED"

export const FILTER_BY_NAME="FILTER BY NAME"
export const FILTER_BY_WEIGHT="FILTER BY WEIGHT"

export const NAME_DOG="NAME DOG"
export const RUTA_POR_NAME="http://localhost:3001/dogs?name="

export const DOG_DETAIL="DOG DETAIL"
export const RUTA_POR_ID="http://localhost:3001/dogs/"


//------------TODOS LOS DOGS-------------
export function obtenerDogs(){
    return async function pedido(dispatch){
     // obtengo todos los dogs
        let aux=await axios.get(RUTA_DOGS)
        return dispatch({
            type: OBTENER_DOG,
            payload: aux.data
        })
    }
}
//---------------TODOS LOS TEMPERAMENTOS -------------------

export function obtenerTemperaments (){
    return async function (dispatch){
            // obtengo todos los temperaments
        let aux=await axios.get(RUTA_TEMPERAMENTS)
        return dispatch({
            type: OBTENER_TEMPERAMENTS,
            payload:aux.data
        })
    }
}
//-----------FILTRADO POR TEMPERAMENTS--------------
export function filterByTemperaments(payload){
    return{
        type:FILTER_BY_TEMPERAMENTS,
        payload
    }
}

// -------------FILTRADO DESDE BASE DE DATOS------------------
 export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
 }

 //---------------ORDENAMIENTO POR NAME------------
 export function filterByName(payload){
    return{
        type:FILTER_BY_NAME,
        payload
    
    }
 }
 //------------ORDENAMIENTO POR PESO------------
 export function filterByWeight(payload){
    return{
        type:FILTER_BY_WEIGHT,
        payload
    }
 }
 //--------FILTRO POR NAME----------------
 export function nameDog(name){
    return async function (dispatch){
        try{
            var dog=await axios.get(RUTA_POR_NAME + name)
            return dispatch({
                type:NAME_DOG,
                payload:dog.data
            })
        }catch(error){
            dispatch({type:NAME_DOG, payload:[]})
            // alert("Dog no encontrado")
            
        }
    }
 }
 //----------------CREACION----------
 export function postDog(payload){
    return async function(dispatch){
        const dog=await axios.post("http://localhost:3001/dogs", payload)
        return dog
    }
 }
 //--------------DOG DETAIL-------------
 export function dogDetail(id){
    return async function (dispatch){
        try {
            var dogDetail=await axios.get(RUTA_POR_ID + id)
            return dispatch({
                type:DOG_DETAIL,
                payload: dogDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
 }
 //------------LIMPIAR ESTADO DOGDETAIL-------
 export function cleanStatus(payload){
    return{
        type:"clean estado",
        payload
    }
 }

