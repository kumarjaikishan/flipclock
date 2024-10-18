import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const navi = () => {
        navigate('/countdown?hh=10&mm=5&ss=58')
    }
    return (
        <div className='navbar'>
            <NavLink to='/' >Clock </NavLink>
            <button onClick={navi} >Countdown </button>
        </div>
    )
}

export default Navbar
