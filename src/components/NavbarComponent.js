import React, {Component} from 'react';
import '../styles/navbar.sass';

class NavbarComponent extends Component{
    render(){
        return(
            <div className="navbar">
                <h1 className="navbar__title">Fake Taxi</h1>
            </div>
        )
    }
}

export default NavbarComponent;