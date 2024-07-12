import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'

import Home from './pages/Home'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'
import NotFound from './pages/NotFound'

import MainLayout from './layouts/MainLayout'

import './app.scss'

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </BrowserRouter>
);

export default App
