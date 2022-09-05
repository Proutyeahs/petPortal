import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Image} from 'cloudinary-react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  
  useEffect(() => {
    dispatch({
      type : 'GET_PET'
    })
  }, [])
  
  const pets = useSelector((store) => store.pet)
  const user = useSelector((store) => store.user);

  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <button onClick={()=> history.push('/addpet')}>Add Pet</button>
      {pets.map(pet => (
        <Image key={pet.id} cloudName="dzyea2237" publicId={pet.picture}/* save image to database and pass the saved url in here *//>
      ))}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
