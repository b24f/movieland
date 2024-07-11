import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'

import Home from './pages/Home'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'

import MainLayout from './layouts/MainLayout'

import './app.scss'

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Route>
        </Routes>
    </BrowserRouter>
);

export default App
