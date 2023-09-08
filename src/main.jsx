import React from 'react'
import './theme/global.scss'
import { AppRouter } from './pages'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { persistor, store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppRouter />
        <Toaster position='top-center' reverseOrder={false} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
