import React from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerStructure } from '../Navigation/NavigationDrawerStructure'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const AppHeader = ({ title, leftIcon, leftPress, rightIcon, rightPress, user, navigation }) => {
  return (
    <View style={{
      paddingTop: 55, height: 89, flexDirection: 'row', paddingHorizontal: 7,
      justifyContent: 'space-between', backgroundColor: '#fff', marginTop: 0,
      borderBottomColor: '#ddf', borderBottomWidth: 1
    }}>
      <NavigationDrawerStructure
        navigationProps={navigation}
        onPress={leftPress ? leftPress : () => navigation.navigate('CreatePost')}
        icon={<Icon name={leftIcon || 'rocket'} size={25} style={{ marginLeft: 20 }} />}
      />
      <Text style={{ fontWeight: '800', fontSize: 20 }}>{title || user.name}</Text>
      <NavigationDrawerStructure
        navigationProps={navigation}
        onPress={rightPress ? rightPress : () => navigation.toggleDrawer()}
        icon={<Icon name={rightIcon || 'dots-horizontal'} size={25} style={{ marginRight: 20 }} />}
      />
    </View>
  )
}

export default AppHeader
