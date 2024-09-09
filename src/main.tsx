import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/theme-provider.tsx";
import DayFormProvider from "@/context/day-form.tsx";
import { setDefaultOptions } from "date-fns";
import { pl } from "date-fns/locale";
import { Toaster } from "@/components/ui/toaster.tsx";

setDefaultOptions({ locale: pl })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DayFormProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App/>
        <Toaster />
      </ThemeProvider>
    </DayFormProvider>
  </StrictMode>,
)
