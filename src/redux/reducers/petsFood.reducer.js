const petsFoodReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PETS_FOOD':
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default petsFoodReducer;