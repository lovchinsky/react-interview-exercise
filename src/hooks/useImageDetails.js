import React from "react";
import { getImageDetails } from "../images";

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const initialState = {
  imageDetails: null,
  isLoading: false,
  error: null
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST:
      return {
        imageDetails: null,
        isLoading: true,
        error: null
      };
    case SUCCESS:
      return {
        imageDetails: payload,
        isLoading: false,
        error: null
      };
    case FAILURE:
      return {
        imageDetails: null,
        isLoading: false,
        error: payload
      };
    default:
      throw new Error(`Unexpected action type: ${type}`);
  }
};

const useImageDetails = (id) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let cancel = false;
    dispatch({ type: REQUEST });

    getImageDetails(id)
      .then((imageDetails) => {
        if (!cancel) {
          dispatch({ type: SUCCESS, payload: imageDetails });
        }
      })
      .catch((error) => {
        if (!cancel) {
          dispatch({ type: FAILURE, payload: error });
        }
      });

    return () => {
      cancel = true;
    }
  }, [id]);

  return state;
};

export default useImageDetails;