import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PostHogProviderWrapper from './PostHogProviderWrapper.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProviderWrapper>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PostHogProviderWrapper>
    </StrictMode>
)
