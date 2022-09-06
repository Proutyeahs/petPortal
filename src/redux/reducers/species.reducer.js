const speciesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIES':
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default speciesReducer;
  