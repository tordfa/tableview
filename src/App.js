
import './App.css';
import Tableview from './components/Tableview';
import SignIn from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Register } from './components/Register';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContextProvider } from './context/AuthContext';




function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Tableview /></PrivateRoute>}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>


  );
}

export default App;
