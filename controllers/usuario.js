const {request, response} = require('express')
const Usuario = require('../models/usuario')

// Registrar un usuario
const registrarUsuario = async (req = request, res = response) =>{
  try{
    const usuario = new Usuario(req.body)

    await usuario.save()


    return res.status(200).json({
      usuario
    })
  }catch(err){
    console.error(err)
    res.status(500).json({error: 'Error del servidor'})
  }

  // const usuario = req.body
  
  // const {nombre, correo, password, rol} = req.body
  // const usuario = new Usuario({nombre,correo,password,rol})

  // // encriptar la contraseña
  // // salt = complejidad de la encriptacion (10 por defecto)
  // const salt = bcrypt.genSaltSync(12)
  // usuario.password = bcrypt.hashSync(password, salt)

  // // Guardar en BD
  // await usuario.save()

  // Emitir una respuesta
  // res.json({
  //   msg: 'Registrar Usuario',
  //   usuario
  // })
}

// Obtener usuarios paginados
const obtenerUsuarios = async(req = request, res = response) =>{
  try{
    const usuarios = await Usuario.find()

    return res.status(200).json({
      count: usuarios.length,
      data: usuarios
    })
  }catch(err){
    console.error(err)
    res.status(500).json({error: 'Error del servidor'})
  }
  // const query = {estado: true}
  // const {limite = 5, desde = 0} = req.query

  // // Esta es una forma de hacerlo
  // // const usuarios = await Usuario.find(query)
  // //                               .skip(Number(desde))
  // //                               .limit(Number(limite))
  
  // // const total = await Usuario.countDocuments(query)


  // // Esta forma es más mucho más rápida porque ejecuta los dos await en uno solo. Es como si el array de promesas se ejecutara de manera asincrona.

  // const [total, usuarios] = await Promise.all([
  //   Usuario.countDocuments(query),
  //   Usuario.find(query)
  //          .skip(Number(desde))
  //          .limit(Number(limite))
  // ])

  // res.json({
  //   msg: 'Obtener usuarios paginados'
  // })
}

// Editar un usuario específico
const editarUsuario = async (req = request, res = response) =>{
  const {id} = req.params
  // const {_id, password, google, ...resto} = req.body // en el resto tenemos toda la información del usuario menos el password y google

  // // Pendiente, validar contra base de datos
  // if(password){ // si envía la contraseña para editarla, la volvemos a encripar
  //   // encriptar la contraseña
  //   const salt = bcrypt.genSaltSync(12)
  //   resto.password = bcrypt.hashSync(password, salt)
  // }

  // // Editamos el usuario
  // const usuario = await Usuario.findByIdAndUpdate(id, resto)

  // Enviamos la respuesta
  res.json({
    msg: 'Editar Usuario'
  })
}

// Eliminar un usuario especifico
const eliminarUsuario = async (req = request, res = response) =>{

  // const {id} = req.params

  // // Borrado fisicamente
  // // const usuarioBorrado = await Usuario.findByIdAndDelete(id)

  // // Cambiando de estado
  // const usuarioBorrado = await Usuario.findByIdAndUpdate(id, {estado: false})
  
  // // Obtenemos usuario auteticado que añadimos en la función validar-jwt
  // const usuarioAutenticado = req.usuario

  // Enviamos respuesta
  res.json({
    msg: 'Eliminar Usuario'
  })
}

// Exportamos las funciones
module.exports = {
  registrarUsuario,
  obtenerUsuarios,
  editarUsuario,
  eliminarUsuario
}