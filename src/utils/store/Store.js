import React from 'react';

const StoreContext = React.createContext({})
export const useStore = () => React.useContext(StoreContext)


const SET_TRACKS = 'SET_TRACKS'
const SET_QUEUED = 'SET_QUEUED'
const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'

const initialState = {
  name: 'Stylz',
  tracks: [],
  queued: [],
}

function reducer(state, action) {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.val };
    case SET_QUEUED:
      return { ...state, queued: action.val };
    case ADD_TO_QUEUE:
      return { ...state, queued: state.queued.concat(action.val) };
    case REMOVE_FROM_QUEUE:
      return { ...state, queued: state.queued.filter((itm => itm.acid !== action.val.acid)) };
    default:
      return state
  }
}


function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const storeDispatch = {
    setTracks: tracks => dispatch({ type: SET_TRACKS, val: tracks }),
    setQueued: track => dispatch({ type: SET_QUEUED, val: track }),
    addToQueue: track => dispatch({ type: ADD_TO_QUEUE, val: track }),
    removeFromQueue: track => dispatch({ type: REMOVE_FROM_QUEUE, val: track })
  }

  return (
    <StoreContext.Provider value={[state, storeDispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
