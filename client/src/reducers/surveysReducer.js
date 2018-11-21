import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      // console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
