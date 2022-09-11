const newSpeciesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_NEWSPECIES':
        return [...action.payload];
      case 'UNSET_NEWSPECIES':
        return [];
      default:
        return state;
    }
  };
  
  export default newSpeciesReducer;
  