import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import firebase, { auth, database } from '../utils/firebase/FirebaseStore'

export const AuthContext = React.createContext({})
export const useAuth = () => React.useContext(AuthContext)


export default function AuthProvider({ children }) {
  const [authorizedUser, setAuthorizedUser] = React.useState(null)

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: 'user' in action ? action.user : null
          };
        case 'SET_USER':
          return {
            ...prevState,
            user: action.val,
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
            user: null
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
        userToken = await AsyncStorage.getItem('_iPUser_UserToken');
      } catch (e) {
        // Restoring token failed
        console.warn(e)
      }

      if (userToken) {
        console.log(`Registered [`, userToken, ']')
        const usrRef = database.ref(`/users/${userToken}`)
        usrRef.on('value', snap => {
          dispatch({ type: 'RESTORE_TOKEN', token: userToken, user: snap.val() });
        })
      } else {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }
      // setTimeout(() => {
      //   if (auth.currentUser) authDispatch.signOut()
      // }, 3000)
    };

    bootstrapAsync();
  }, []);


  const authDispatch = React.useMemo(
    () => ({
      signIn: async data => {
        auth.signInWithEmailAndPassword(data.username, data.password)
          .then(async result => {
            if (result.user.uid) {
              const uid = result.user.uid

              try {
                console.log('ACCOUNT ONLINE [', uid, ']')
                await AsyncStorage.setItem('_iPUser_UserToken', uid);
                const usrRef = database.ref(`/users/${uid}`)
                usrRef.on('value', snap => {
                  dispatch({ type: 'SET_USER', val: snap.val() })
                })
              } catch (e) {
                console.warn(e)
              }
            }
          })
      },
      signOut: async () => {
        auth.signOut().then(async _ => {
          console.log('ACCOUNT OFFLINE')
          await AsyncStorage.removeItem('_iPUser_UserToken');
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
              console.warn(e)
            }
          })
      },
      setToken: token => {
        dispatch({ type: 'RESTORE_TOKEN', token })
      }
    }),
    []
  );


  return (
    <AuthContext.Provider value={[state, authDispatch]}>
      {children}
    </AuthContext.Provider>
  )
}