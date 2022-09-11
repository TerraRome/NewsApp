import { showMessage, hideMessage } from 'react-native-flash-message'
import { Platform, StatusBar } from 'react-native'

export default function showToast(message, type) {
  showMessage({
    message: type === 'success' ? 'Berhasil ' : 'Attention!',
    description: message,
    icon: type,
    type,
    hideStatusBar: Platform.OS !== 'android',
    statusBarHeight: StatusBar.currentHeight - 30,
  })
}

export function hideToast() {
  hideMessage()
}

export function showErrorToast(message) {
  showToast(message, 'danger')
}

export function showSuccessToast(message) {
  showToast(message, 'success')
}

export function showInfoToast(message) {
  showToast(message, 'info')
}