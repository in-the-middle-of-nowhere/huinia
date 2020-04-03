import React, {Component} from 'react';
import '../styles/navbar.sass';
import { Link } from "react-router-dom";

class NavbarComponent extends Component{
    render(){
        return(
            <div className="navbar">
                <Link to="/" className="navbar__home">Fake Taxi</Link>
                <Link to="/map" className="navbar__map">Карта</Link>
            </div>
        )
    }
}

export default NavbarComponent;