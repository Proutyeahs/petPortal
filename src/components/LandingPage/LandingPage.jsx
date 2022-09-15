import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Button variant="outlined" color="primary" className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
  );
}

export default LandingPage;
