import { ThemeProvider } from './theme-provider'
function providers({ children }: { children: React.ReactNode }) {
  return (
    <>
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
