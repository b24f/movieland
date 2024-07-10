import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'

import Home from './pages/Home'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'

import Layout from './components/Layout'

import './app.scss'

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Route>
        </Routes>
    </BrowserRouter>
);

export default App
