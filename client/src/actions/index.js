import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.get('/api/current_user')
  });
};

// This one handles the token that we receive from the STRIPE API
export const handleToken = token => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.post('/api/stripe', token)
  });
};

export const submitSurvey = (values, history) => async dispatch => {
  history.push('/surveys');
  dispatch({
    type: SUBMIT_SURVEY,
    payload: await axios.post('/api/surveys', values)
  });
};

export const fetchSurveys = () => async dispatch => {
  dispatch({
    type: FETCH_SURVEYS,
    payload: await axios.get('/api/surveys')
  });
};
