import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./css/App.css";

import { useAuth0 } from "./react-auth0-spa";

import MyNavbar from "./components/Navbar";
import Profile from "./components/Profile";
import ExternalApi from "./components/ExternalApi";
import PrivateRoute from "./components/PrivateRoute";
import UpdateInfo from "./components/UpdateInfo";
import FlightsList from "./components/FlightsList";
import BookFlight from "./components/BookFlight";
import SearchDestination from "./components/SearchDestination";

import history from "./utils/history";

function App() {
  return (
    <>
      <section>
        <Router history={history}>
          <div className='container'>
            <MyNavbar />
            <Switch>
              <Route path='/' exact component={FlightsList} />
              <Route path='/book/:id' component={BookFlight} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/book" component={BookFlight} />
              {/* <PrivateRoute path="/book/:id" component={BookFlight} /> */}

              <PrivateRoute path="/external-api" component={ExternalApi} />
              <PrivateRoute path="/update-user" component={UpdateInfo} />
            </Switch>
          </div>
        </Router>
      </section>
      <section>
        <SearchDestination />
      </section>
      <section>
        {/* <Footer /> */}
      </section>
    </>
  )
}

/**
 * THIS WORKS, DO NOT DELETE
 */
// function App() {
//   return ( 
//     <div className="App">
//       <Router history={history}>
//         <header>
//           <Navbar />
//         </header>
//         <Switch>
//           <Route path="/" exact />
//           <PrivateRoute path="/profile" component={Profile} />
//           <PrivateRoute path="/external-api" component={ExternalApi} />
//           <PrivateRoute path="/update-user" component={UpdateInfo} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

export default App;