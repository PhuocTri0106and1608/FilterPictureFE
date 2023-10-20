import * as actionTypes from '../constants/resultConstants';

export const saveMonet = (result) => async (dispatch) => {
  console.log('action',result);
  dispatch({
    type: actionTypes.SAVE_MONET,
    payload: {result},
  });
};
export const saveCezanne = (result) => async (dispatch) => {
  console.log('action',result);
  dispatch({
    type: actionTypes.SAVE_CEZANNE,
    payload: {result},
  });
};
export const saveVangogh = (result) => async (dispatch) => {
  console.log('action',result);
  dispatch({
    type: actionTypes.SAVE_VANGOGH,
    payload: {result},
  });
};
export const saveUkiyoe = (result) => async (dispatch) => {
  console.log('action',result);
  dispatch({
    type: actionTypes.SAVE_UKIYOE,
    payload: {result},
  });
};

// export const saveAllResult = (result) => async (dispatch) => {

//   dispatch({
//     type: actionTypes.SAVE_All_RESULT,
//     payload: {result},
//   });
// };

export const resetResult = () => async (dispatch) => {

  dispatch({
    type: actionTypes.RESET_RESULT,
    payload: {},
  });
};