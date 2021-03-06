import React from 'react';
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import firebase, { auth, database } from '../utils/firebase/Firebase'
import { useStore } from './StoreContext'
import { IS_ADMIN, IS_VERIFIED } from '../constants'


export const AuthContext = React.createContext({})
export const useAuth = () => React.useContext(AuthContext)


export default function AuthProvider({ children }) {
  const [{ name }, storeDispatch] = useStore()

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
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
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('_iPUser');
      } catch (e) {
        // Restoring token failed
        console.warn(e)
      }

      if (userToken) {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        const usrRef = database.ref(`/users/${userToken}`)
        usrRef.once('value', snap => {
          let isAdmin = IS_ADMIN.includes(snap.val().email.toLowerCase())
          let isVerified = IS_VERIFIED.includes(snap.val().email.toLowerCase())
          dispatch({ type: 'SET_USER', val: snap.val() })
          authDispatch.setToken(userToken)
          storeDispatch.setUser(snap.val())
          storeDispatch.setAdmin(isAdmin)
        })
      } else {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }
    };

    bootstrapAsync();
  }, []);


  const authDispatch = React.useMemo(
    () => ({
      signIn: async (data, success, error) => {
        auth.signInWithEmailAndPassword(data.username, data.password)
          .then(async result => {
            if (result.user.uid) {
              const uid = result.user.uid
              try {
                console.log('ACCOUNT ONLINE [', uid, ']')
                await AsyncStorage.setItem('_iPUser', uid);
                const usrRef = database.ref(`/users/${uid}`)
                usrRef.on('value', snap => {
                  dispatch({ type: 'SET_USER', val: snap.val() })
                  authDispatch.setToken(uid)
                })
              } catch (e) {
                console.warn(e)
              }
            }
          })
          .catch(failed => {
            switch (failed.code) {
              case 'auth/wrong-password':
                error('We could not authenticate with your credentials')
                return
              case 'auth/too-many-requests':
                error('Too many unsuccessful attempts, try later')
                return
              case 'auth/network-request-failed':
                error('Please check your internet connection to continue')
              default:
                // error('We could not complete your request', failed.code, failed.message)
                console.log(failed)
                return
            }
          })
      },
      signOut: async () => {
        auth.signOut().then(async _ => {
          console.log('ACCOUNT OFFLINE')
          await AsyncStorage.removeItem('_iPUser');
          dispatch({ type: 'SIGN_OUT' })
        })
      },
      signUp: async data => {
        auth.createUserWithEmailAndPassword(data.username, data.password)
          .then(async result => {
            try {
              console.log('ACCOUNT CREATED [', result.user.uid, ']')
              await AsyncStorage.setItem('_iPUser', result.user.uid);
              dispatch({ type: 'SIGN_IN', token: result.user.uid });
            } catch (e) {
              console.warn(e)
            }
          })
      },
      setToken: val => {
        dispatch({ type: 'RESTORE_TOKEN', token: val })
      },
      setLoading: val => {
        dispatch({ type: 'SET_LOADING', val })
      },
      setUser: user => {
        dispatch({ type: 'SET_USER', val: user })
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