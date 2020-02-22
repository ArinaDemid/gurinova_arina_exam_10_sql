import React, {Component} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Posts from "./containers/Posts/Posts";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Toolbar />
        </header>
        <Container>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/news" exact component={Posts} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
