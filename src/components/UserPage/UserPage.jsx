import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Image} from 'cloudinary-react'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory()
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <button onClick={()=> history.push('/addpet')}>Add Pet</button>
      <Image cloudName="dzyea2237" publicId="https://res.cloudinary.com/dzyea2237/image/upload/v1662310851/a6nubuj2lz9jzg7d5nzi.jpg"/* save image to database and pass the saved url in here *//>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
