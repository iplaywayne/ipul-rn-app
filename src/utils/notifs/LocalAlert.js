import PushNotificationIOS from '@react-native-community/push-notification-ios'

export default function (title, body) {
  PushNotificationIOS.presentLocalNotification({
    alertTitle: title,
    alertBody: body,
  })
}