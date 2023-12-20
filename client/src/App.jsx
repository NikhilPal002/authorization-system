import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />} >
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
