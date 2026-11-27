import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Context/AuthProvider.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SkeletonTheme
          baseColor="#0f172a"
          highlightColor="#1e293b"
        >
          <RouterProvider router={router} />
        </SkeletonTheme>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
) 
