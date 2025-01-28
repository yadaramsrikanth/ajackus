import React from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./components/Home"
import AddUser from "./components/AddUser"

import "./App.css"
const App=()=> <BrowserRouter>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/add" element={<AddUser/>}/>

</Routes>
</BrowserRouter>

export default App