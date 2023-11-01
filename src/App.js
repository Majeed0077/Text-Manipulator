import Navbar from "./components/Navbar";
// import About from "./components/About";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"

function App() {
  const [Mode, setMode] = useState('light') // whether dark mode is enabaled or not 
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const togglemode = () => {
    if (Mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "black"
      showAlert("Dark mode Has Been Enabled", "success")
    }
    else {
      setMode('light')
      document.body.style.backgroundColor = "#efe8e8"
      showAlert("Light mode Has Been Enabled", "success")
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar title="Text Manipulator" about="About Us" mode={Mode} togglemode={togglemode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Word Counter, Character Counter, Remove Extra Spaces" mode={Mode} />} />
            {/* <Route exact path="/about" element={<About mode={Mode} />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}
export default App;