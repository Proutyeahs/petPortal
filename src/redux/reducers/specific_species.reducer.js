const specificSpeciesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIFIC_SPECIES':
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default specificSpeciesReducer;
  