import React from 'react'
import { View, Text } from 'react-native'

const Divider = ({ style }) => {
  return (
    <View
      style={[{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
      }], style}
    />
  )
}

export default Divider
