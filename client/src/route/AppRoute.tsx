import { Routes, Route } from "react-router-dom"
import ArtistSongs from "../page/Song/ArtistSongs"
import Layout from "../page/layout/Layout"
import Home from "../page/home/Home"
import Playlist from "../page/playlist/Playlist"
import { Signup } from "../page/auth/Signup"
import { Signin } from "../page/auth/Signin"

function AppRoute() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/artist/:id" element={<ArtistSongs />} />
                <Route path="/playlist" element={<Playlist />} />
            </Route>
            <Route path="/signin" element={<Signin />} /> 
            <Route path="/signup" element={<Signup />} /> 
        </Routes>
    )
}

export default AppRoute
