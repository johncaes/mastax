import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PrimeReactProvider } from 'primereact/api'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primereact/resources/primereact.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<PrimeReactProvider>
			<App />
		</PrimeReactProvider>
	</StrictMode>
)
