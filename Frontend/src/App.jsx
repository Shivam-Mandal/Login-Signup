import React from "react";
import Form from "./components/Form";
import UserState from "../context/UserState";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Employee from './components/Employee'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <UserState>
          <ToastContainer/>
          <Router>
            <Routes>
              <Route path="/" element={<Form/>}/>
              <Route path="/employee" element={<Employee/>}/>
            </Routes>
          </Router>

        </UserState>
    );
}

export default App;
