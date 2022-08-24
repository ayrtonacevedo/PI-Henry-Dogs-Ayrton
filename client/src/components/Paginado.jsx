import React from 'react'

export default function Paginado({dogsPorPag, estadoDogs, paginado}){
    const paginaNum=[]

    for (let i = 1; i <= Math.ceil(estadoDogs/dogsPorPag); i++) {
        paginaNum.push(i)
    }
    return(
        <nav>
            <ul >
                {paginaNum &&
                paginaNum.map(n=>(
                        //<li className='number' key={n}>
                            <button key={n} onClick={()=>paginado(n)}>
                             {n}
                            </button>
                        //</li>
                    ))}
            </ul>
        </nav>
    )

}