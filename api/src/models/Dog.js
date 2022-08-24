const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false
    },
    // height_max:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false
    // },
    weight:{
      type:DataTypes.STRING,
      allowNull:false
    },
    // weight_max:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false
    // },
    life_span:{
      type:DataTypes.STRING,
      allowNull:true
    },
    image:{
      type:DataTypes.STRING,
    },
    creatdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
  },{
    timestamps:false
  });
};
//ID *
// Nombre *
// Altura *
// Peso *
// Años de vida
