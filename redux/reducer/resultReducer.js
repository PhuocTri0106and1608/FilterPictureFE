import * as actionTypes from "../constants/resultConstants"
const RESULT_INITIAL_STATE = {
  Monet_result: {},
  Cezanne_result: {},
  Vangogh_result: {},
  Ukiyoe_result: {},
};

export const resultReducer = (state = RESULT_INITIAL_STATE, action) => {
  switch (action.type) {
    // case actionTypes.SAVE_All_RESULT:
    //   return {
    //     ...state,
    //     result: action.payload 
    //   };
    case actionTypes.SAVE_MONET:
      console.log('reducer',action.payload);
      return {
        ...state,
        Monet_result: action.payload
      };
    case actionTypes.SAVE_CEZANNE:
      console.log('reducer',action.payload);
      return {
        ...state,
        Cezanne_result: action.payload
      };
    case actionTypes.SAVE_VANGOGH:
      console.log('reducer',action.payload);
      return {
        ...state,
        Vangogh_result: action.payload
      };
    case actionTypes.SAVE_UKIYOE:
      console.log('reducer',action.payload);
      return {
        ...state,
        Ukiyoe_result: action.payload
      };
    case actionTypes.RESET_RESULT:
      return {
        ...state,
        Monet_result: {},
        Cezanne_result: {},
        Vangogh_result: {},
        Ukiyoe_result: {},
      };
    default:
      return state;
  }
};