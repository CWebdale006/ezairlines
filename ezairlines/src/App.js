import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./css/App.css";

import MyNavbar from "./components/Navbar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import FlightsList from "./components/FlightsList";
import BookFlight from "./components/BookFlight";
import Footer from "./components/Footer";

import history from "./utils/history";

function App() {
  return (
    <>
      <section>
        <Router history={history}>
          {/* <div className='container'> */}
            <MyNavbar />
            <Switch>
              <Route path='/' exact component={FlightsList} />
              <Route path='/book/:id' component={BookFlight} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/book" component={BookFlight} />
              {/* <PrivateRoute path="/book/:id" component={BookFlight} /> */}
            </Switch>
          {/* </div> */}
        </Router>
      </section>
      <section>
        <Footer />
      </section>
    </>
  )
}

export default App;