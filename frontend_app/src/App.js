import React, {Component} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Posts from "./containers/Posts/Posts";
import AddPost from "./containers/AddPost/AddPost";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div  style={{background: 'url(https://previews.123rf.com/images/seasons/seasons1011/seasons101101791/8300056-plant-growth-background-theme-of-growth-.jpg) no-repeat center center fixed'}} >
        <header>
          <Toolbar />
        </header>
        <Container  style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/news/new" exact component={AddPost} />
            <Route path="/news" exact component={Posts} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
