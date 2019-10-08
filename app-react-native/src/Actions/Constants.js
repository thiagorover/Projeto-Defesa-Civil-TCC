export const REQUEST_URL = 'http://10.3.79.235:9080'

export const ERROR = 'ERROR'
export const CRIAR_MARCACAO = 'CRIAR_MARCACAO'
export const CRIAR_USUARIO = 'CRIAR_USUARIO'
export const BUSCAR_ALERTAS = 'BUSCAR_ALERTAS'
export const BUSCAR_ALERTA = 'BUSCAR_ALERTA'
export const BUSCAR_MARCACOES = 'BUSCAR_MARCACOES'
export const BUSCAR_MARCACAO = 'BUSCAR_MARCACAO'
export const DEFINIR_NOTIFICACAO = 'DEFINIR_NOTIFICACAO'
export const VOTAR = 'VOTAR'
export const BUSCAR_USUARIO = 'BUSCAR_USUARIO'
export const LOGAR = 'LOGAR'
export const DEFINIR_IMAGEM = 'DEFINIR_IMAGEM'

export const showError = err => {
  console.log(err.response.request)
  console.log(err.response)
  return {
    type: ERROR,
    payload: err
  }
}
