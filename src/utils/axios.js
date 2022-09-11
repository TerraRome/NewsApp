import axios from 'axios'
import store, { persistor } from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import RNRestart from 'react-native-restart'

const Axios = axios.create()

Axios.interceptors.request.use(async config => {
  Object.assign(config, {
    // baseURL: constants.baseURL,
    baseURL: "https://newsapi.org/v2/",
    timeout: 1000 * 30,
    headers: {
      'X-Api-key': '7c760cc3beba4a0983be8f160937d4fa'
    }
  })
  return config
})

// const logout = async () => {
//   await persistor.purge()
//   await AsyncStorage.clear()
//   RNRestart.Restart()
// }

export default Axios