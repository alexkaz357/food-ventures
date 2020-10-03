import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from './cmps/NavBar';
import { Footer } from './cmps/Footer';
import { FoodApp } from './pages/FoodApp';
import { UserDetails } from './pages/UserDetails';
import { Chefs } from './pages/Chefs';
import { ReservationPage } from './pages/ReservationPage';
import { Login } from './pages/Login';

function App() {

  return (
    <div className="app-wrapper">
      <NavBar />
      <Switch>
        <Route component={ReservationPage} path='/reservations' />
        <Route component={UserDetails} path='/details/:userId' />
        <Route component={Chefs} path='/chef' />
        <Route component={Login} path="/login" />
        <Route component={FoodApp} path='/' />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;