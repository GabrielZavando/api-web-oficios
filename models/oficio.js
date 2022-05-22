const {Schema, model} = require('mongoose')

const OficioSchema = Schema({
  oficio: {
    type: String,
    required: [true, 'El oficio es obligatorio']
  }
})

module.exports = model('Oficio', OficioSchema)