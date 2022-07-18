const {Schema, model} = require('mongoose')
const geocoder = require('../helpers/geocoder')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres']
  },
  emprendimiento: {
    type: String,
    required: [true, 'El nombre del emprendimiento es obligatorio'],
    maxlength: [40, 'El nombre de la empresa no puede tener más de 40 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [150, 'La descripción no puede tener más de 150 caracteres']
  },
  banner: {
    type: String
  },
  logo: {
    type: String
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Cultor','Maestro','Creativo']
  },
  oficio: {
    type: String,
    required: [true, 'El oficio es obligatorio']
  },
  web: {
    type: String,
    maxlength: [30, 'La web no puede tener más de 30 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    maxlength: [30, 'El correo no puede tener más de 30 caracteres']
  },
  telefono: {
    type: String,
    maxlength: [15, 'El teléfono no puede tener más de 15 caracteres']
  },
  whatsapp: {
    type: String,
    maxlength: [15, 'El WhatsApp no puede tener más de 15 caracteres']
  },
  rrss: {
    type: Map,
    of: String
  },
  rating: {
    type: Number,
    default: 0
  },
  rol: {
    type: String,
    required: true,
    default: 'USER_ROL',
    enum: ['ADMIN_ROL', 'USER_ROL']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    maxlength: [20, 'La contraseña no puede tener más de 20 caracteres']
  },
  galeria: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  ubicacion: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordenadas: {
      type: [Number],
    },
    formatodireccion: String
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
    required: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  googleSign: {
    type: Boolean,
    default: false
  },
  destacado: {
    type: Boolean,
    default: false
  }
})

// Consumimos API Mapquest para añadir location y quitamos la direccion

UsuarioSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.direccion)
  this.ubicacion = {
    type: 'Point',
    coordenadas: [loc[0].longitude, loc[0].latitude],
    formatodireccion: loc[0].formattedAddress
  }

  // Quitamos dirección de la base de datos
  this.direccion = undefined
  next()
})

// Quitamos la versión, el password y el _id del usuario para no mostrarlo

UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject()
  usuario.uid = _id // Añadimos la propiedad uid al usuario y le asignamos el valor de _id
  return usuario // este usuario sólo se muestra en las respuestas del backend, en la base de datos se almacena el usuario exacto del modelo, incluído el _id.
}

module.exports = model('Usuario', UsuarioSchema)