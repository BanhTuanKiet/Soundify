import { Routes, Route } from "react-router-dom"
import Home from "../page/home/Home"

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default AppRoute
