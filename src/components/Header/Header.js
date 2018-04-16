import React from 'react';
import './Header.css';
import logo from '../../assets/img/jf-logo-retina.png';

const Header = props => (
  <header>
    <img src={logo} alt="Joe Fresh Logo" />
  </header>
);

export default Header;
