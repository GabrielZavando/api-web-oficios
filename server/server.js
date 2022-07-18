
const express = require('express')
const cors = require('cors')

// Importamos rutas

// Usuarios
const UserRoutes = require('../routes/usuario')
const SearchRoutes = require('../routes/buscar')
// const LoginRoutes = require('./routes/login')

// Configuración base de datos
const { dbConnection } = require('../database/config')


class Server{

  constructor(){
    this.app = express()
    this.port = process.env.PORT

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi app
    this.routes()
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares(){

    // Cors // hay que configurarlo más. Sirve para restringir accesos de url indeseadas
    this.app.use(cors())

    // Lectura y parseo del body (para determinar el formato en el que podemos recibir data)
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use('/api/v1/user', UserRoutes)
    this.app.use('/api/v1/buscar', SearchRoutes)
    // this.app.use('/api/login', LoginRoutes)
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor corriendo en puerto', this.port);
    })
  }

}

module.exports = Server;
