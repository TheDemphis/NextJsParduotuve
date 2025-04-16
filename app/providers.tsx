import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/toaster'
function providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
        attribute="class"
      >
        {children}
      </ThemeProvider>
    </>
  )
}
export default providers
