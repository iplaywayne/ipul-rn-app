import React from 'react';

const StoreContext = React.createContext({})
export const useStore = () => React.useContext(StoreContext)


const SET_TRACKS = 'SET_TRACKS'

const initialState = {
  name: 'Stylz',
  tracks: [],
}

function reducer(state, action) {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.val };
    default:
      throw new Error();
  }
}


function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const storeDispatch =  {
    setTracks: tracks => dispatch({ type: SET_TRACKS, val: tracks })
    
  }


  return (
    <StoreContext.Provider value={[state, storeDispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
