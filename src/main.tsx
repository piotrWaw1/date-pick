import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/theme-provider.tsx";
import DayFormProvider from "@/context/day-form.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DayFormProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App/>
      </ThemeProvider>
    </DayFormProvider>
  </StrictMode>,
)
