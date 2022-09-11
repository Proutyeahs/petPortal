import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import species from './species.reducer'
import pet from './pet.reducer'
import details from './details.reducer'
import foods from './food.reducer'
import notes from './notes.reducer'
import thisNote from './thisNote.reducer'
import petsFood from './petsFood.reducer';
import specificSpecies from './specific_species.reducer'
import newSpecies from './newSpecies.reducer'
import addedFood from './newFood.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  species,
  pet, 
  details,
  foods,
  notes,
  thisNote,
  petsFood,
  specificSpecies,
  newSpecies,
  addedFood
});

export default rootReducer;
