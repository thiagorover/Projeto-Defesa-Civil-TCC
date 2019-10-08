import axios from 'axios'

import { showError, REQUEST_URL, BUSCAR_ALERTA, BUSCAR_ALERTAS } from './Constants'

const fetchAlertasSuccess = response => {
  return {
    type: BUSCAR_ALERTAS,
    payload: response
  }
}

export const fetchAlerts = () => {
  return dispatch => {
    axios.get(`${REQUEST_URL}/notifications`)
      .then(response => {
        dispatch(fetchAlertasSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}

const fetchAlertaSuccess = response => {
  return {
    type: BUSCAR_ALERTA,
    payload: response
  }
}

export const fetchAlert = id => {
  return dispatch => {
    axios.get(`${REQUEST_URL}/notifications/${id}`)
      .then(response => {
        dispatch(fetchAlertaSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}
