import React from 'react';

const StoreContext = React.createContext({})
const StoreUpdateContext = React.createContext({})
export const useStore = () => React.useContext(StoreContext)
export const useStoreUpdate = () => React.useContext(StoreUpdateContext)

const initialState = { name: 'Stylz' }

function reducer(state, action) {
  switch (action.type) {
    case 'new':
      return { name: 'Wayne' };
    default:
      throw new Error();
  }
}


function Store({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <StoreUpdateContext.Provider value={{}}>
        {children}
      </StoreUpdateContext.Provider>
    </StoreContext.Provider>
  )
}

export default Store
