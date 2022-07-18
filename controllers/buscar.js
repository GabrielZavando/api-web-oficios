const {response, json} = require('express')
const Usuario = require('../models/usuario')
const {ObjectId} =require('mongoose').Types

const coleccionesPermitidas = [
  'oficios',
  'usuarios'
]

// Formato de respuesta
// objeto respuesta que devuelve un array de objetos
// res.json({respuesta:[{resultado}]})

// Busquedas

// Busca usuarior o por id o por nombre, correo o descripcion
const buscarUsuarios = async(termino = '', res = response) =>{
  // Evaluamos si es un id
  const esMongoID = ObjectId.isValid(termino) // TRUE
  // transformamos el termino en expresion regular
  // 'i' es para que sea insensible a mayúsculas y minusculas
  const regex = new RegExp(termino, 'i')

  try{
    if(esMongoID){
      const usuario = await Usuario.findById(termino)
      return res.status(200).json(usuario)
    }

    const consulta = {
      $or: [{nombre: regex},{correo: regex},{descripcion: regex}],
      $and: [{estado: true}]
    }

    const usuarios = await Usuario.find(consulta)

    res.status(200).json({
      total: usuarios.length,
      usuarios
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      error: 'Error del servidor'
    })
  }
}

const buscar = (req, res = response) =>{
  const {coleccion, termino} = req.params;

  if(!coleccionesPermitidas.includes(coleccion)){
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
    })
  }

  switch (coleccion){
    case 'usuarios':
      buscarUsuarios(termino, res)
    break;
    case 'oficios':
    break;
    default:
      res.status(500).json({
        msg: 'Se me olvidó hacer esta búsqueda'
      })
  }
}



module.exports = {
  buscar
}