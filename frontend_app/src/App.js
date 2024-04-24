import React, {useState, useCallback, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';


import NewPlace from './places/pages/NewPlace';
import User from './user/pages/User';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';



const App = () => {

  const{token, login, logout, userId}=useAuth();

  let routes;
 
  if (token) {
    routes=(
      <React.Fragment>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/:userId/places" exact element={<UserPlaces />} />
          <Route path="/places/new" exact element={<NewPlace />} />
          <Route path="/places/:placeId" exact element={<UpdatePlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Fragment>
    );
  }else {
    routes=(
      <React.Fragment>
        <Routes>
          <Route path="/:userId/places" exact element={<UserPlaces />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<User />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </React.Fragment>
    );
  }

  return(
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId:userId, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
          <main>
            {routes}
          </main>
      </Router>
    </AuthContext.Provider>
  );
};



export default App;
 