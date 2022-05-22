const {Router} = require('express')
const router = Router()

// Middlewares
const { check, query } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {esOficioValido, emailExiste} = require('../helpers/db-validators')

// Controlador de rutas
const UserController = require('../controllers/usuario')

// Rutas

// Registrar usuario
router.post('/registrar', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  check('oficio').custom(esOficioValido),
  validarCampos
],UserController.registrarUsuario)

// Obtener usuarios paginados
router.get('/listar', UserController.obtenerUsuarios)

// Editar usuario
router.put('/editar/:id', UserController.editarUsuario)

// Eliminar usuario
router.delete('/eliminar/:id', UserController.eliminarUsuario)


// Exporto el router
module.exports = router