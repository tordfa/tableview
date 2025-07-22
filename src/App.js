
import './App.css';
import Tableview from './components/Tableview/Tableview';
import SignIn from './components/pages/SigninPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './components/pages/SignupPage';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Home } from './components/pages/HomePage';
import { CalendarPage } from './components/pages/CalendarPage';
import { Testpage } from './components/pages/Testpage';
import { BookingPage } from './components/pages/BookingPage';
import { Settings } from './components/pages/SettingsPage';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute></PrivateRoute>}>

          <Route path={'/'} element={<DashboardLayout />}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/tableview' element={<Tableview />}></Route>
            <Route path='/calendar' element={<CalendarPage />}></Route>
            <Route path='/testpage' element={<Testpage></Testpage>}></Route>
            <Route path='/settings' element={<Settings></Settings>}></Route>
          </Route>
        </Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/booking/:tenantName' element={<BookingPage></BookingPage>}></Route>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
