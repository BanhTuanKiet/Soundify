import AppRoute from './route/AppRoute'
import './App.css'
import { SearchProvider } from './context/SearchContext'
import { UserProvider } from './context/UserContext'

function App() {
    return (
        <div className="App">
            <SearchProvider>
                <UserProvider>
                    <AppRoute />
                </UserProvider>
            </SearchProvider>
        </div>
    )
}

export default App
