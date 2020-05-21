import * as React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Table from "./components/Table";

const Home: React.FC = () => {
  return <div>Home</div>;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>table</div>
        <Router>
          <Switch>
            <Route path="/table">
              <Table />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
