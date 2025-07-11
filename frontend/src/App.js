import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/noteState';
import CategoryState from './context/categories/categoryState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const [alert, setAlert] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <Router>
      <NoteState>
        <CategoryState>
          <>
            <Navbar onOpenSidebar={() => setDrawerOpen(true)} />
            <Alert alert={alert} />
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={ <PrivateRoute> <Home showAlert={showAlert} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} /></PrivateRoute>} />
                <Route path="/about" element={ <PrivateRoute> <About /></PrivateRoute>} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/login" element={<Login showAlert={showAlert} />} />
                <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
          </>
        </CategoryState>
      </NoteState>
    </Router>
  );
}

export default App;
