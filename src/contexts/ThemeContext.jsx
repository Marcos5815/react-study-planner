import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const theme = {
    isDark: isDarkTheme,
    background: isDarkTheme 
      ? "url('/src/assets/bg-dark.png')" 
      : "url('/src/assets/bg-light.png')",
    backgroundColor: isDarkTheme ? '#1f2937' : '#f3f4f6',
    cardBg: isDarkTheme ? 'bg-card-dark' : 'bg-white',
    textPrimary: isDarkTheme ? 'text-white' : 'text-gray-800',
    textSecondary: isDarkTheme ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkTheme ? 'text-gray-400' : 'text-gray-600',
    inputBg: isDarkTheme ? 'bg-gray-700' : 'bg-white',
    inputBorder: isDarkTheme ? 'border-gray-600' : 'border-gray-400',
    dividerColor: isDarkTheme ? 'border-gray-600' : 'border-gray-300',
    dividerPurple: isDarkTheme ? 'border-purple-header' : 'border-purple-600'
  }

  const value = {
    ...theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}