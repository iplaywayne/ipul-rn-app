import React from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerStructure } from '../Navigation/NavigationDrawerStructure'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const AppHeader = ({ user, navigation }) => {
  return (
    <View style={{
      paddingTop: 55, height: 89, flexDirection: 'row', paddingHorizontal: 7,
      justifyContent: 'space-between', backgroundColor: '#fff', marginTop: 0,
      borderBottomColor: '#ddf', borderBottomWidth: 1
    }}>
      <NavigationDrawerStructure
        navigationProps={navigation}
        onPress={() => navigation.navigate('CreatePost')}
        icon={<Icon name='rocket' size={25} style={{ marginLeft: 20 }} />}
      />
      <Text style={{ fontWeight: '800', fontSize: 20 }}>{user.name}</Text>
      <NavigationDrawerStructure
        navigationProps={navigation}
        onPress={() => navigation.toggleDrawer()}
        icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
      />
    </View>
  )
}

export default AppHeader
