import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './UserPage.css'

function UserPage() {

  useEffect(() => {
    dispatch({
      type: 'GET_PET'
    })
  }, [])

  // gets info from the reducer
  const pets = useSelector((store) => store.pet)
  const user = useSelector((store) => store.user);

  const history = useHistory()
  const dispatch = useDispatch()

  // sends the user to the specific pet detail page
  const details = (id) => {
    console.log(id)
    dispatch({
      type: 'GET_DETAILS',
      payload: id
    })
    history.push(`/petdetails/${id}`)
  }

  return (
    <div className="container">
      <h2 className='outline'>Welcome, {user.username}!</h2>
      <div className='padding2'>
        <Button variant="outlined" color="primary" onClick={() => history.push('/addpet')}>Add Pet</Button>
      </div>
      {pets.map(pet => (
        <Card onClick={() => details(pet.id)} className='div' key={pet.id}>
          <div className='text'>{pet.name}</div>
            <CardMedia className="img" image={pet.picture} />
        </Card>
      ))}
      {pets == '' &&
      <h4 className='outline'>Add a pet to get started!</h4>}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
