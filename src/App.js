import './App.css';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';

import Tableview from './components/Tableview';
import { Signin } from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Register } from './components/Register';

function App() {


  const [session, setSesssion] = useState("Testsession");

  return (
    <BrowserRouter>
      <AuthContext value={{ session: session, setSession: setSesssion }}>
        <Routes>
          <Route path='/' element={<Tableview/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </AuthContext>
    </BrowserRouter>

  );
}

export default App;
