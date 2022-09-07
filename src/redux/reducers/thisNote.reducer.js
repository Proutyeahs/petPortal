const thisNoteReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_THIS_NOTE':
        return action.payload;
      default:
        return state;
    }
  };
  
export default thisNoteReducer;