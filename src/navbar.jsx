import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink to='/' >Clock</NavLink>
            <NavLink to='/countdown?hh=0&mm=5&ss=0'>Countdown</NavLink>
            <NavLink to='/timer'>Timer</NavLink>
        </div>
    )
}

export default Navbar;
