import { Routes, Route } from "react-router-dom"
import ArtistSongs from "../page/Song/ArtistSongs"
import Layout from "../page/layout/Layout"
import Home from "../page/home/Home"
import Playlist from "../page/playlist/Playlist"
import { RegisterForm, Signin } from "../page/auth/Auth"

function AppRoute() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/artist/:id" element={<ArtistSongs />} />
                <Route path="/playlist" element={<Playlist />} />
            </Route>
            <Route path="/signin" element={<Signin />} /> 
            <Route path="/register" element={<RegisterForm />} /> 
        </Routes>
    )
}

export default AppRoute
