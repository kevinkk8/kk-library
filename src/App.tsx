import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import { getClaims } from './auth/handleJWT';
import Menu from './menu/Menu';
import routes from './utils/routes/routes';
import configureInterceptor from './utils/httpInterceptors';
import Validations from './Validation';

Validations();
configureInterceptor();

function App() {
  
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims())
  }, [])


  function isAdmin(){
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  return (
    <Router>
      <AuthenticationContext.Provider value={{claims, update: setClaims}} >
      <Menu/>
      <div className="container">
        <Routes>
          {routes.map(route => 
            <Route key={route.path} path={route.path} 
            element={route.isAdmin && !isAdmin() ? <>
                You are not allowed to see this page
            </>:  <route.component />}/>
            )}
        </Routes>
      </div>
      <footer className="bd-footer py-5 mt-5 bg-light">
            <div className="container">
                KK Books {new Date().getFullYear().toString()}
            </div>
      </footer>
      </AuthenticationContext.Provider>
    </Router>
  );
}

export default App;
