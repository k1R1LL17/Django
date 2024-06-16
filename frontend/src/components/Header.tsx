import React from 'react';
import '../styles/Header.css';
import Head from './Head';

const Header: React.FC = () => {
  return (
    <>
      <Head></Head>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">KirShop</label>
        <ul>
          <li>
            <a className="active" href="#">
              Аssortment
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Feedback</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
