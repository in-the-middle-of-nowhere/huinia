import React, {Component} from 'react';
import MapComponent from './components/MapComponent';
import NavbarComponent from './components/NavbarComponent'
import InfoComponent from './components/InfoComponent';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import BuyAccounts from './components/BuyAccounts';
import OrderComponent from './components/OrderComponent';


class App extends Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
            <NavbarComponent/>
            <Switch>
              <Route exact path="/" component={InfoComponent} />
              <Route exact path="/order" component={OrderComponent} />
              <Route exact path="/buy" component={BuyAccounts} />
              <Route path="/map" component={MapComponent} />
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;