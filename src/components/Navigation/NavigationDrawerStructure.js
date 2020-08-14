import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const NavigationDrawerStructure = (props) => {
  //Structure for the navigation Drawer
  const { to } = props
  const toggleDrawer = () => props.navigationProps.toggleDrawer();

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={props.onPress}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
}
