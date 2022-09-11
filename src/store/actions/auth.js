import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { showErrorToast, showSuccessToast } from '../../components/toast';
import { persistor } from '../store';
import RNRestart from 'react-native-restart';

export const setAuth = (data) => ({
  type: 'SET_AUTH',
  payload: data,
})

export const regisFirebase = (data, setLoading) => async (dispatch) => {
  setLoading(true)
  auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((result) => {
      showSuccessToast('User account created & signed in!');
      dispatch(setAuth(result.user))
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showErrorToast('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        showErrorToast('That email address is invalid!');
      }

      console.error(error);
    }).finally(() => {
      setLoading(false)
    });
}

export const loginFirebase = (data, setLoading) => async (dispatch) => {
  setLoading(true)
  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((result) => {
      showSuccessToast('Signed in!');
      dispatch(setAuth(result.user))
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showErrorToast('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        showErrorToast('That email address is invalid!');
      }

      console.error(error);
    }).finally(() => {
      setLoading(false)
    });
}

export const logout = () => async (dispatch) => {
  auth()
    .signOut()
    .then(() =>
      showSuccessToast('User signed out!'),
      await persistor.purge(),
      await AsyncStorage.clear(),
      RNRestart.Restart(),
    );
}