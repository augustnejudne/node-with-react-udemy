import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      // console.log(action.payload.data);
      return action.payload.data;
    case DELETE_SURVEY:
      return state.filter(s => s._id !== action.payload.data);
    default:
      return state;
  }
}
