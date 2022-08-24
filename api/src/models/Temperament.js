const{DataTypes, }=require('sequelize');
//Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize
module.exports=(sequelize)=>{
    sequelize.define('temperament',{ //en minuscula nos da la data enviada al front de ese atributo
        // no pongo el id, sequelize lo hace automaticamente 
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        timestamps:false
    })
}
//ID
//Nombre