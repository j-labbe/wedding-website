import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PostHogProviderWrapper from './PostHogProviderWrapper.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProviderWrapper>
            <App />
        </PostHogProviderWrapper>
    </StrictMode>
)
