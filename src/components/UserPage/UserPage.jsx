import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './UserPage.css'

function UserPage() {

  useEffect(() => {
    dispatch({
      type: 'GET_PET'
    })
  }, [])

  const pets = useSelector((store) => store.pet)
  const user = useSelector((store) => store.user);

  const history = useHistory()
  const dispatch = useDispatch()

  const details = (id) => {
    console.log(id)
    dispatch({
        type : 'GET_DETAILS',
        payload: id
    })
    history.push(`/petdetails/${id}`)
}

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <button onClick={() => history.push('/addpet')}>Add Pet</button>
      {pets.map(pet => (
        <div key={pet.id}>
          <img onClick={() => details(pet.id)} className="img" src={pet.picture} />
        </div>
      ))}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
