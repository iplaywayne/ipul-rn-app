import React from 'react';
import Button from 'react-native-button'


export default function (props) {
  const { title, style, disabled,children, onPress, backgroundColor } = props

  return (
    <Button
      style={[{ fontSize: 13, color: 'white', width: '100%' }, style]}
      styleDisabled={{ color: 'white' }}
      disabled={disabled}
      containerStyle={{
        padding: 7, margin: 5, height: 30, overflow: 'hidden', borderRadius: 5,
        backgroundColor: backgroundColor || '#121212'
      }}
      disabledContainerStyle={{ backgroundColor: '#ddd' }}
      onPress={onPress}
    >
      {title || children}
    </Button>
  )
}