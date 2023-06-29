import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import RegisterUser from './pages/Register';
import { useCookies } from 'react-cookie';
import Profile from './pages/Profile';
import Changepass from './pages/Changepass';
function App() {
  const [cookie, setCookie] = useCookies();
  const AppLayout = () => {
    return <section>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </section>
  }
  return (
    <>
      <Routes>
        <Route path='*' element={<Navigate to='/' />}></Route>
        {
          cookie._in == "" || cookie._in == null || cookie._in == "null" || cookie._in == undefined || cookie._in == "undefined" || cookie._in == false || cookie._in == "false"
            ?
            <Route exact path='' index element={<Login />}></Route>
            // <Route exact path='/login' index element={<Login />}></Route>
            :
            <Route exact path='' element={<AppLayout />}>
              <Route exact path='' index element={<Home />}></Route>
              <Route exact path='/:nxtp' index element={<Home />}></Route>
              <Route exact path='/profile' index element={<Profile />}></Route>
              <Route exact path='/changepass' index element={<Changepass />}></Route>
            </Route>
        }
        <Route exact path='/register' index element={<RegisterUser />}></Route>
      </Routes >
    </>
  );
}

export default App;
