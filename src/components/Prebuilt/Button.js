import React from 'react';
import Button from 'react-native-button'


export default function (props) {
  const { title, style, disabled, children, onPress, backgroundColor, color } = props

  return (
    <Button
      style={[{ fontSize: 13, color: 'white' }, style]}
      styleDisabled={{ color: 'white' }}
      disabled={disabled}
      containerStyle={{
        padding: 7, margin: 1, height: 30, width: 130, overflow: 'hidden', borderRadius: 5,
        backgroundColor: color ? color : backgroundColor || '#121212'
      }}
      disabledContainerStyle={{ backgroundColor: '#ddd' }}
      onPress={onPress}
    >
      {title || children}
    </Button>
  )
}