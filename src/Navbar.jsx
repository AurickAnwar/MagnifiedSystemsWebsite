import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import startupLogo from './Startup.png';

import './Navbar.css';



const navItems = [

  { to: '/what-we-do', label: 'What we do' },

  { to: '/Progress', label: 'Progress' },

  { to: '/meet-the-team', label: 'Our Team' },

];



const navContent = [

  { to: '/contact', label: '📩 Contact' },

];

const isLinkActive = (pathname, to) =>
  decodeURIComponent(pathname) === decodeURIComponent(to);

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);



  return (

    <header className="navbar">

      <div className="container nav-inner">

        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>

          <img

            src={startupLogo}

            alt=""

            className="nav-logo-icon"

            width={44}

            height={44}

            aria-hidden="true"

          />

          <span className="nav-logo-text">

            <span className="nav-logo-line">Magnified</span>

            <span className="nav-logo-line">Systems</span>

          </span>

        </Link>



        <div className={`nav-right ${isMobileMenuOpen ? 'open' : ''}`}>

          <nav className="nav-links" aria-label="Main">

            {navItems.map(({ to, label }) => (

              <Link

                key={to}

                to={to}

                className={`nav-link ${isLinkActive(location.pathname, to) ? 'active' : ''}`}

                onClick={closeMobileMenu}

              >

                {label}

              </Link>

            ))}

          </nav>

        </div>

        <div className="nav-content">

          {navContent.map(({ to, label }) => (

            <Link

              key={to}

              to={to}

              className={`nav-link ${isLinkActive(location.pathname, to) ? 'active' : ''}`}

              onClick={closeMobileMenu}

            >

              {label}

            </Link>

          ))}

        </div>



        <button

          type="button"

          className="nav-toggle"

          aria-label="Toggle menu"

          aria-expanded={isMobileMenuOpen}

          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

        >

          <span className="bar" />

          <span className="bar" />

          <span className="bar" />

        </button>

      </div>

    </header>

  );

};



export default Navbar;


