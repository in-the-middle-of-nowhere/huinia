import React, {Component} from 'react';
import MapComponent from './components/MapComponent';
import NavbarComponent from './components/NavbarComponent'
import InfoComponent from './components/InfoComponent';


class App extends Component {
  render(){
    return (
      <div className="App">
        <NavbarComponent/>
        <MapComponent/>
      </div>
    );
  }
}

export default App;