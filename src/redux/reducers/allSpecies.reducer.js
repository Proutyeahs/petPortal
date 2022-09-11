const allSpeciesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SPECIES':
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default allSpeciesReducer;
  