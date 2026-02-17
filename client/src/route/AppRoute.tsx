import { Routes, Route } from "react-router-dom"
import Home from "../page/layout/Layout"
import ArtistTracks from "../page/Artist/ArtistTracks"
import Layout from "../page/layout/Layout"

function AppRoute() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/artist/:id" element={<ArtistTracks />} />
            </Route>
        </Routes>
    )
}

export default AppRoute
