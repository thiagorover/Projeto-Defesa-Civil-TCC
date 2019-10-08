import { combineReducers } from 'redux'
import ErrorReducer from './ErrorReducer'
import AlertasReducer from './AlertasReducer'
import CameraReducer from './CameraReducer'
import MarcacoesReducer from './MarcacoesReducer'
import UsuariosReducer from './UsuariosReducer'
import NavegacaoReducer from './NavegacaoReducer'

export default combineReducers({
  error: ErrorReducer,
  marcacoes: MarcacoesReducer,
  alertas: AlertasReducer,
  camera: CameraReducer,
  usuarios: UsuariosReducer,
  nav: NavegacaoReducer
})
