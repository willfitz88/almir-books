import { bookConstants } from '../_constants';

export function books(state = {}, action) {
  switch (action.type) {
    case bookConstants.GETALL_REQUEST:
      console.log("GETALL_REQUEST");
      return {
        loading: true
      };
    case bookConstants.GETALL_SUCCESS:
      console.log("GETALL_SUCCESS");
      return {
        items: action.books
      };
    case bookConstants.GETALL_FAILURE:
      console.log("GETALL_FAILURE");
      return { 
        error: action.error
      };
    
    case bookConstants.GETONE_REQUEST:
      console.log("GETONE_REQUEST1");
      return {
        loading: true
      };
    case bookConstants.GETONE_SUCCESS:
      console.log("GETONE_SUCCESS1");
      return {
        items: action.books
      };
    case bookConstants.GETONE_FAILURE:
      console.log("GETONE_FAILURE1");
      return { 
        error: action.error
      };
      
    
    case bookConstants.CREATE_REQUEST:
      console.log("CREATE_REQUEST");
      return {
        registering: true
      };
    case bookConstants.CREATE_SUCCESS:
      console.log("CREATE_SUCCESS");
      return {};
    case bookConstants.CREATE_FAILURE:
      console.log("CREATE_FAILURE");
      return {};
    
    case bookConstants.UPDATE_REQUEST:
      console.log("UPDATE_REQUEST");
      return {
        updating: true
      };
    case bookConstants.CREATE_SUCCESS:
      console.log("UPDATE_SUCCESS");
      return {};
    case bookConstants.CREATE_FAILURE:
      console.log("UPDATE_FAILURE");
      return {};
      
    case bookConstants.DELETE_REQUEST:
      // add 'deleting:true' property to book being deleted
      return {
        ...state,
        items: state.items.map(book =>
          book.ID === action.id
            ? { ...book, deleting: true }
            : book
        )
      };
    case bookConstants.DELETE_SUCCESS:
      // remove deleted book from state
      return {
        items: state.items.filter(book => book.ID !== action.id)
      };
    case bookConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to book 
      return {
        ...state,
        items: state.items.map(book => {
          if (book.id === action.id) {
            // make copy of book without 'deleting:true' property
            const { deleting, ...bookCopy } = book;
            // return copy of book with 'deleteError:[error]' property
            return { ...bookCopy, deleteError: action.error };
          }

          return book;
        })
      };
    default:
      return state
  }
}