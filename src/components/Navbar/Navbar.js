import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'

class Navbar extends Component {

    //initialize state to false
    state = { clicked: false }

    //handleClick - if clicked, have it to the opposite of what it is currently
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="NavbarItems">
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                {/* this creates the nav bar menu at the top with all the values  */}
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>





            </nav>

        )
    }
}

export default Navbar