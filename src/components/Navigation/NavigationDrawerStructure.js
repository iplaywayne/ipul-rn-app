import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const NavigationDrawerStructure = (props) => {
  //Structure for the navigation Drawer
  const toggleDrawer = () => props.navigationProps.toggleDrawer();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
}
