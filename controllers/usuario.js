const {request, response} = require('express')
const Usuario = require('../models/usuario')

// Formato de respuesta
// objeto respuesta que devuelve un array de objetos
// res.json({respuesta:[{resultado}]})

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
    res.status(500).json({
      error: 'Error del servidor'
    })
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
  const {limite = 6, desde = 0} = req.query
  const query = {estado: true}

  try{
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
             .skip(Number(desde))
             .limit(Number(limite))
    ])

    return res.status(200).json({
      total, usuarios
    })
  }catch(err){
    console.error(err)
    res.status(500).json({
      error: 'Error del servidor'
    })
  }

}

// Obtener usuarios destacados
const obtenerUsuariosDestacados = async(req = request, res = response) => {
  const query = {destacado: true}

  try{
    const destacados = await Usuario.find(query)

    return res.status(200).json(destacados)

  }catch(err){
    res.status(500).json({
      error: 'Error del servidor'
    })
  }

}

// Buscar /user/buscar/:termino?desde=0&limite=6
const buscarUsuarioTermino = async(req = request, res = response) => {
  
  const {termino} = req.params
  const {desde = 0, limite = 6} = req.query
  
  // transformamos el termino en expresion regular
  // 'i' es para que sea insensible a mayúsculas y minusculas
  const regex = new RegExp(termino, 'i')

  try{
    const consulta = {
      $or: [{nombre: regex},{correo: regex},{descripcion: regex}],
      $and: [{estado: true}]
    }
    
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(consulta),
      Usuario.find(consulta)
             .skip(Number(desde))
             .limit(Number(limite))
    ])

    return res.status(200).json({
      total, usuarios
    })
  }catch(err){
    console.error(err)
    res.status(500).json({
      error: 'Error del servidor'
    })
  }
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
  obtenerUsuariosDestacados,
  editarUsuario,
  eliminarUsuario,
  buscarUsuarioTermino
}