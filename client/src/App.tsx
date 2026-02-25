import AppRoute from './route/AppRoute'
import './App.css'
import { SearchProvider } from './context/SearchContext'

function App() {
    return (
        <div className="App">
            <SearchProvider>
                <AppRoute />
            </SearchProvider>
        </div>
    )
}

export default App
