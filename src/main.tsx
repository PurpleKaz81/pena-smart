import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error('Could not find root element')
}
