import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Componente  : Bloco isolado de HTML, CSS, JS
// Estado      : Armazena informações de um componente
// Propriedade : Informações que um Componente PAI passa para o Componente FILHO

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
