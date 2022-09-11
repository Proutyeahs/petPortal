const allFoodReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_FOOD':
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default allFoodReducer;
  