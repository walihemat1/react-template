import { Provider } from 'react-redux'

import { LanguageProvider } from '@/app/language-provider'
import { ThemeProvider } from '@/app/theme-provider'
import { store } from '@/store'

function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </LanguageProvider>
    </Provider>
  )
}

export { AppProviders }
