 import {OBTENER_DOG, OBTENER_TEMPERAMENTS, FILTER_CREATED, FILTER_BY_NAME,FILTER_BY_WEIGHT, NAME_DOG, DOG_DETAIL, FILTER_BY_TEMPERAMENTS} from './actions'
 
// estado inicial 
const initialState={
    allDogs:[],
    siempreDogs:[],
    temperament:[],
    dogDetail:[],
}
export default function rootReducer(state=initialState,action){
    switch(action.type){
        case OBTENER_DOG:
            return{
                ...state,
                allDogs:action.payload,
                siempreDogs: action.payload
                
            }
            case OBTENER_TEMPERAMENTS:
                return{
                    ...state,
                    temperament:action.payload
                }
            case FILTER_BY_TEMPERAMENTS:
                    let filterTemp=state.siempreDogs.filter(dog=>{
                        if(!dog.temperament)return undefined;
                        if(action.payload==="todos")return dog.temperament
                        return dog.temperament.includes(action.payload)
                    })
                    return {
                        ...state,
                        allDogs:filterTemp
                    }
            case "POST_DOG":
                    return{
                        ...state,
                    }
            case NAME_DOG:
                    return{
                        ...state,
                        allDogs:action.payload
                    }
            case FILTER_CREATED:
                const todosDogs=state.siempreDogs
                const filter= action.payload ==='creado'? todosDogs.filter(e=>e.creatdInDb): todosDogs.filter(e=>!e.creatdInDb)
                return{
                    ...state,
                    allDogs:action.payload==='todos'? state.siempreDogs : filter
                }
            case FILTER_BY_NAME:
                let sortedArr=action.payload==="az"?
                state.allDogs.sort(function(a,b){
                    if(a.name>b.name){
                        return 1;
                    }
                    if(b.name>a.name){
                        return -1
                    }
                    return 0
                }):
                state.allDogs.sort(function(a,b){
                    if(a.name>b.name){
                        return-1
                    }
                    if(b.name>a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    allDogs: sortedArr
                }
                // case FILTER_BY_WEIGHT:
                //     let arr=state.allDogs.filter((e)=>e.weight !==false)
                //     let sortWeight=
                //     action.payload==="min-max"
                //     ? arr.sort(function(a,b){
                //         return a.weight.split(/-/)[0]===b.weight.split(/-/)[0]
                //         ? a.weight.split(/-/)[1]-b.weight.split(/-/)[1]
                //         :a.weight.split(/-/)[0]-b.weight.split(/-/)[0]
                //     })
                //     :arr.sort(function(a,b){
                //         return b.weight.split(/-/)[1]===a.weight.split(/-/)[1]
                //         ? b.weight.split(/-/)[0]-a.weight.split(/-/)[0]
                //         :b.weight.split(/-/)[1]-a.weight.split(/-/)[1]
                //     })
                //     return{
                //         ...state,
                //         allDogs:sortWeight
                //     }
            case FILTER_BY_WEIGHT:
                    let dogsPeso=[...state.allDogs];
                    let sortPeso=dogsPeso.sort((a,b)=>{
                        if(parseInt(a.weight)<parseInt(b.weight)){
                            return action.payload==="min-max" ? -1 :1;
                        }
                        if(parseInt(a.weight)>parseInt(b.weight)){
                            return action.payload ==="max-min" ? -1 : 1;
                        }
                        return 0
                    })
                    return {
                        ...state,
                        allDogs:sortPeso
                    }


            case DOG_DETAIL:
                 return({
                      ...state,
                     dogDetail:action.payload

                })
            case "clean status":
                if(action.payload==="volver")
                return[]
                return ({
                    ...state,
                    dogDetail:[]
                })    




            default:
                return state
    }
}
