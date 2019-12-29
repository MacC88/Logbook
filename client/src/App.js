import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Logs from "./pages/Logs";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Logs} />
          <Route exact path="/logs" component={Logs} />
          <Route exact path="/logs/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
