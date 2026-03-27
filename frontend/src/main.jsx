import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navigation from './navbar/navigation.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Api from './api.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
