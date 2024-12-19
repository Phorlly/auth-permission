import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from './route'

const App = () => {
    return (
        <div>
            <Router>
                <AllRoutes />
            </Router>
            <ToastContainer />
        </div>
    )
}

export default App