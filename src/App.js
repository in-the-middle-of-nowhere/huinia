import React, {Component} from 'react';
import MapComponent from './components/MapComponent';
import NavbarComponent from './components/NavbarComponent'
import InfoComponent from './components/InfoComponent';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";


class App extends Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
            <NavbarComponent/>
            <Switch>
              <Route exact path="/" component={InfoComponent} />
              <Route path="/map" component={MapComponent} />
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;