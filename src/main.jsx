import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import SweetToast from './providers/AuthProvider/SweetToast';
import AuthProvider from './providers/AuthProvider/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
   <AuthProvider>
    <SweetToast>
    <RouterProvider router={router}></RouterProvider>
    </SweetToast>
   </AuthProvider>
   </QueryClientProvider>
  </React.StrictMode>,
)