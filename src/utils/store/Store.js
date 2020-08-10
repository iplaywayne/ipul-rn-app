import React from 'react';
import TrackPlayer from 'react-native-track-player'

const StoreContext = React.createContext({})
export const useStore = () => React.useContext(StoreContext)


const SET_TRACKS = 'SET_TRACKS'
const SET_QUEUED = 'SET_QUEUED'
const SET_CURRENT = 'SET_CURRENT'
const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'
const SET_PLAYING = 'SET_PLAYING'
const SET_LOADING = 'SET_LOADING'

const initialState = {
  name: 'Stylz',
  tracks: [],
  queued: [],
  currentTrack: null,
  isPlaying: false,
  isLoading: true,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.val };
    case SET_QUEUED:
      return { ...state, queued: action.val };
    case SET_CURRENT:
      return { ...state, currentTrack: action.val };
    case ADD_TO_QUEUE:
      if (state.queued.includes(action.val)) return state
      return { ...state, queued: state.queued.concat(action.val) };
    case REMOVE_FROM_QUEUE:
      return { ...state, queued: state.queued.filter((itm => itm.acid !== action.val.acid)) };
    case SET_PLAYING:
      return { ...state, isPlaying: action.val };
    case SET_LOADING:
      return { ...state, isLoading: action.val };
    default:
      return state
  }
}


function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const storeDispatch = {
    setTracks: tracks => dispatch({ type: SET_TRACKS, val: tracks }),
    setQueued: track => dispatch({ type: SET_QUEUED, val: track }),
    setCurrentTrack: track => dispatch({ type: SET_CURRENT, val: track }),
    addToQueue: track => {
      dispatch({ type: ADD_TO_QUEUE, val: track })
      storeDispatch.setCurrentTrack(track)
    },
    removeFromQueue: track => {
      dispatch({ type: REMOVE_FROM_QUEUE, val: track })
      TrackPlayer.reset()
    },
    setPlaying: val => {
      dispatch({ type: SET_LOADING, val: true })
      dispatch({ type: SET_PLAYING, val })
    },
    setLoading: val => dispatch({ type: SET_LOADING, val })
  }

  return (
    <StoreContext.Provider value={[state, storeDispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
