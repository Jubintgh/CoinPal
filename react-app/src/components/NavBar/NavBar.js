import './NavBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import DemoUserButton from '../auth/DemoUserButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const profImage = user?.img_url
  let navContent = null;
  if(!user) {
    navContent = (
      <ul className='navbar'>
        <NavLink id='navbar__logo' to='/'>
          <img id='navbar__img' src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo' />
        </NavLink>
        <li className='navbar__link'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            SignUp
          </NavLink>
        </li>
        <li className="navbar__button">
          <DemoUserButton/>
        </li>
      </ul>
    )
  } else {
    navContent = (
        <ul className="navbar">
          <NavLink id='navbar__logo' to='/my/home'>
            <img  id='navbar__img' src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo'/>
          </NavLink>
          <li className="navbar__link">
            <NavLink to='/my/contacts' exact={true}  activeClassName='active'>
              Contacts
            </NavLink>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
            <NavLink to={`/my/transaction/history`} exact={true} activeClassName='active'>
              Activity
            </NavLink>
            <NavLink to={`/my/wallet`} exact={true} activeClassName='active'>
              Wallet
            </NavLink>
            <NavLink to={`/my/SendNrequest`} exact={true} activeClassName='active'>
              Send
              & 
              Request
            </NavLink>
          </li>
          <li className="navbar__logout_button">
            <img className="logged_in_profile" src={user.img} alt='profile-pic'/>
            <LogoutButton/>
          </li>
        </ul>
    )
  }
  return (
    <nav>
      { user? <div className="nav-logo">
          <NavLink id="navbar__brand-home" to='/' exact={true} activeClassName='active'>
          </NavLink>
        </div> : <div className="nav-logo">
          <NavLink id="navbar__brand-home" to='/' exact={true} activeClassName='active'>
          </NavLink>
        </div>}
      {navContent}
    </nav>
  );
};

export default NavBar;
