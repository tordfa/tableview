
import './App.css';
import Tableview from './components/Tableview';
import SignIn from './components/pages/SigninPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './components/pages/SignupPage';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContextProvider } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';
import { Home } from './components/pages/HomePage';
import { CalendarPage } from './components/pages/CalendarPage';
import { Testpage } from './components/pages/Testpage';



function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='tableview' element={<Tableview />}></Route>
            <Route path='calendar' element={<CalendarPage/>}></Route>
            <Route path='testpage' element={<Testpage></Testpage>}></Route>
          </Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>


  );
}

export default App;
