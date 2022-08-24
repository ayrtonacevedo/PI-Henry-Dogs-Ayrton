const { Router } = require('express');
const {Dog, Temperament}=require('../db');
const{API_KEY}=process.env;
const axios =require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// datos desde la db

const dogDb = async () => {
    try{
        // Traigo todos los datos de la base de datos.
        const resultado = await Dog.findAll({
            include: Temperament
        });

        // Mapeo el cada uno de los resultados para modificar el objeto que envio al front
        const listaDogs = await resultado.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                // pesoMax: dog.pesoMax,
                weight: dog.weight,
                // alturaMax: dog.alturaMax,
                image: dog.image,
                life_span: dog.life_span,
                // edadMax: dog.edadMax,
                creatdInDb:dog.creatdInDb,
                // proviene: "DB",
                temperament: dog.temperaments.map(n=>n.name).join(", "),
                
        }})
        return listaDogs;
    }
    // Si algo sale mal entrar aqui en el catch
    catch(err){
        console.log(err);
        return err;
    }
}

// const dogDb=async()=>{
//     const allDogsDb=await Dog.findAll({
//         include:{
//             model:Temperament,
//             attributes:["name"],
//             through:{
//                 attributes:[],}
//         }

//     })


//     return allDogsDb
//     // const allDogsResult=allDogsDb.map(d=>{
//     //     return {
//     //         id:d.id,
//     //         name:d.name,
//     //         weight:d.weight,
//     //         height:d.height,
//     //         life_span:d.life_span,
//     //         temperament:d.temperament,
//     //         image:d.image
//     //         // .map(t=>String(t.name)).join()
//     //         // (e=>String(e.id)===String(id))
//     //     }
//     // })
//     // return allDogsResult
// }
//datos api
const dogsApi=async()=>{
    const promApi=await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((response)=>{return response.data})
    const allDogsApi=promApi.map(d=>{
        return{
            id:d.id,
            name:d.name,
            weight:d.weight.metric //? d.weight.metri: "1"
            ,
            height:d.height.metric,
            life_span:d.life_span,
            image:d.image.url,
            temperament:d.temperament ?d.temperament:"La raza no tiene temperaments asociado"
        }
    })
    return allDogsApi
}
//concat
const allDogsApi =async()=>{
    const dataFromApi=await dogsApi();
    const dataFromDb=await dogDb();
    const alldogsconcat= [...dataFromApi,...dataFromDb];
    return alldogsconcat;
}


// rutas
// router.get("/dogs", async(req,res)=>{
//     const{name}=req.query;
//     const allDogs=await allDogsApi();
//     if(name){
//         const dog=allDogs.filter(d=>d.name.toLowerCase().includes(name.toLocaleLowerCase()));
//         dog.length? res.status(200).send(dog) : res.status(404).send("Dog no encontrado");
//     }else{
//         res.status(200).send(allDogs);
//     }
    
// })
router.get("/dogs", async(req,res)=>{
    const {name}=req.query;
    const allDogs=await allDogsApi();
    if(name){
        const dog=allDogs.filter(d=>d.name.toLowerCase().includes(name.toLocaleLowerCase()))
        dog.length
        ? res.status(200).send(dog)
        : res.status(404).send("Dog no encontrado")
    }else{
        res.status(200).send(allDogs)
    }
})


router.get("/dogs/:id", async(req,res)=>{
    
    const{id}=req.params;

        const dog=await allDogsApi();
        const iddog= dog.filter(e=>String(e.id)===String(id))
        if(iddog.length){
            res.status(200).json(iddog);
        }else{
            res.status(404).send("Dog no encontrado")
        }
})




router.get("/temperament", async (req, res) => {
    // Me traigo los Dogs de la api
    // const allDogs= await allDogsApi();
    const resultado = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    // Guardo en lista de temperamentos todos los resultados despues de aplicarle limpieza a cada uno
    
    const listaTemperamentos = resultado.data.map(dog => {
        // Si no viene un temperamento agrego undefined
        if(!dog.temperament) return dog.temperament = undefined;
        // A todos los demas los spliteo por ", " para añadirlos a un array en la constante aux
        const aux = dog.temperament.split(", "); 
        return aux;
    });

    const limparValoresUndefined = listaTemperamentos.flat().filter(Boolean); // limpio todo lo que sea null, undefine sin importar el nivel en el que este en el array
    const valoresUnicos = new Set(limparValoresUndefined); // Quito todas las repeticiones y solo dejo un valor unico
    const resultadoFinal = [...valoresUnicos]; // hago destructurin del array valores unicos y los guardo en resultadoFinal


    // Encuentro o creo en el modelo de Temperament, cada temperament donde el nombre sea igual al dog en el que estoy en ese momento
    resultadoFinal.forEach(dog => Temperament.findOrCreate({
        where: {
            name: dog
        }
    }))

    const resultado2 = await Temperament.findAll(); // Me traigo todos los temperamentos de la base de datos
    res.send(resultado2); 
})

router.post("/dogs",async (req,res)=>{
    const{name,
        height,
        // height_min,
        // height_max,
        
        weight,
        // weight_min,
        // weight_max,

        life_span,
        // life_span_min,
        // life_span_max,

        image,
        temperament}=req.body;
     const newDog= await Dog.create({
        name,

        height,
        // height:`${height_min}-${height_max}`,

        weight,
        // weight:`${weight_min}-${weight_max}`,
    

        life_span,
        // life_span:`${life_span_min}-${life_span_max}`,
    

        image : image ? image : "https://img.freepik.com/vector-gratis/lindo-perro-damatian-sentado-dibujos-animados-vector-icono-ilustracion-animal-naturaleza-icono-concepto-aislado-plano_138676-4756.jpg?w=2000"
     })
     let temp_db= await Temperament.findAll({
        where: {name:temperament},
     })
     await newDog.addTemperament(temp_db);
     res.send("Dog creado")
})




module.exports = router;
