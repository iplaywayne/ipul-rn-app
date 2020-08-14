import React from 'react';
import Button from 'react-native-button'
import { ActivityIndicator } from 'react-native'


export default function (props) {
  const { title, style, loading, disabled, children, marginTop, onPress, backgroundColor, color } = props

  return (
    <Button
      style={[{ fontSize: 13, color: 'white' }, style]}
      styleDisabled={{ color: 'white' }}
      disabled={disabled}
      containerStyle={{
        paddingTop: 8, margin: marginTop || 1, height: 32, width: 130, overflow: 'hidden', borderRadius: 5,
        backgroundColor: color ? color : backgroundColor || '#121212'
      }}
      disabledContainerStyle={{ backgroundColor: '#ddd' }}
      onPress={onPress}
    >

      {loading ? <ActivityIndicator /> : title || children}
    </Button>
  )
}