import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import router from './router/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
