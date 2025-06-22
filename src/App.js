
import './App.css';
import Tableview from './components/Tableview';
import SignIn from './components/pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './components/pages/Signup';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';
import { Home } from './components/pages/Home';



function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='tableview' element={<Tableview />}></Route>
          </Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>


  );
}

export default App;
