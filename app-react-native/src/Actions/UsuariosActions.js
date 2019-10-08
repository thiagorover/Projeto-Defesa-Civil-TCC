import axios from 'axios'

import { showError, REQUEST_URL, BUSCAR_USUARIO, LOGAR, CRIAR_USUARIO, DEFINIR_NOTIFICACAO } from './Constants'

export const fetchLogin = () => {
  return {
    type: BUSCAR_USUARIO
  }
}

export const setLogged = () => {
  return {
    type: LOGAR,
    payload: {
      isLogged: true
    }
  }
}

createUserSuccess = response => {
  return {
    type: CRIAR_USUARIO,
    payload: response
  }
}

export const createUser = user => {
  return dispatch => {
    axios.post(`${REQUEST_URL}/users/`, user)
      .then(response => {
        dispatch(createUserSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}

setNotificationSuccess = response => {
  return {
    type: DEFINIR_NOTIFICACAO,
    payload: response
  }
}

export const setNotification = user => {
  return dispatch => {
    axios.post(`${REQUEST_URL}/users/notification/`, user)
      .then(response => {
        dispatch(setNotificationSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}
