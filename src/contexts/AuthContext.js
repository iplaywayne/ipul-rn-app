import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import firebase, { auth, database } from '../utils/firebase/FirebaseStore'

export const AuthContext = React.createContext({})
export const useAuth = () => React.useContext(AuthContext)


export default function AuthProvider({ children }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('_iPUser_userToken');
        if (userToken) console.log(`Registered [`, userToken, ']')
      } catch (e) {
        // Restoring token failed
        console.warn(e)
      }
      setTimeout(() => {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }, 250)
    };

    bootstrapAsync();
  }, []);


  const authDispatch = React.useMemo(
    () => ({
      signIn: async data => {
        auth.signInWithEmailAndPassword(data.username, data.password)
          .then(async result => {
            try {
              console.log('ACCOUNT ONLINE [', result.user.uid, ']')
              await AsyncStorage.setItem('_iPUser_userToken', result.user.uid);
              dispatch({ type: 'SIGN_IN', token: result.user.uid });
            } catch (e) {
              // Restoring token failed
              console.warn(e)
            }
          })
      },
      signOut: () => {
        auth.signOut().then(_ => {
          console.log('ACCOUNT OFFLINE')
          dispatch({ type: 'SIGN_OUT' })
        })
      },
      signUp: async data => {
        auth.createUserWithEmailAndPassword(data.username, data.password)
          .then(async result => {
            try {
              console.log('ACCOUNT CREATED [', result.user.uid, ']')
              await AsyncStorage.setItem('_iPUser_userToken', result.user.uid);
              dispatch({ type: 'SIGN_IN', token: result.user.uid });
            } catch (e) {
              // Restoring token failed
              console.warn(e)
            }
          })
      },
    }),
    []
  );


  return (
    <AuthContext.Provider value={[state, authDispatch]}>
      {children}
    </AuthContext.Provider>
  )
}