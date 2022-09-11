const addedFoodReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADDEDFOOD':
        return [...action.payload];
      case 'UNSET_ADDEDFOOD':
        return [];
      default:
        return state;
    }
  };
  
  export default addedFoodReducer;
  