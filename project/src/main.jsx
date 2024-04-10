import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NumbersProvider } from './components/NumbersContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NumbersProvider>
      <App />
    </NumbersProvider>,
)
