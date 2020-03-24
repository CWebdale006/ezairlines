import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ExternalApi from "./components/ExternalApi";
import PrivateRoute from "./components/PrivateRoute";
import UpdateInfo from "./components/UpdateInfo";
import FlightsList from "./components/FlightsList";
import BookFlight from "./components/BookFlight";

import history from "./utils/history";

function App() {
  return (
    <>
      <section>
        <Router history={history}>
          <div className='container'>
            <Navbar />
            <Switch>
              <Route path='/' exact component={FlightsList} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/book" component={BookFlight} />

              <PrivateRoute path="/external-api" component={ExternalApi} />
              <PrivateRoute path="/update-user" component={UpdateInfo} />
            </Switch>
          </div>
        </Router>
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