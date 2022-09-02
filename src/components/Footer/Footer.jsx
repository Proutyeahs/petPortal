import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <footer>
        <div className="footerNav">
          <div>
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Link className="back" to="/info">
                  Back
                </Link>
                <Link className="home" to="/user">
                  Home
                </Link>
              </>
            )}

            <Link className="about" to="/about">
              About
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
