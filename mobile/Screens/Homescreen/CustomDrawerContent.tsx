/* React / React-Native imports */
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useContext } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'

/* Icons imports */
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import { EventRegister } from 'react-native-event-listeners'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const theme = useContext(themeContext)
  const [mode, setMode] = useState(false)
  return (
    <DrawerContentScrollView
      {...props}
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.primary },
      ]}
    >
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Feather name='x' size={24} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode(!mode)
            EventRegister.emit('changeTheme', mode)
          }}
        >
          <Feather name='moon' size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      <DrawerItem
        label={'Home'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => <Feather name='home' size={20} color={theme.icon} />}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Library'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialIcons name='library-music' size={20} color={theme.icon} />
        )}
        onPress={() => props.navigation.navigate('Library')}
      />
      <DrawerItem
        label={'Liked Songs'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => <AntDesign name='hearto' size={20} color={theme.icon} />}
        onPress={() => props.navigation.navigate('LikedSongs')}
      />
      <DrawerItem
        label={'Profile'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => <AntDesign name='user' size={20} color={theme.icon} />}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Contact Us'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='message-text-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'FAQs'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='lightbulb-on-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
      <DrawerItem
        label={'Settings'}
        labelStyle={[styles.drawerRow, { color: theme.primary }]}
        icon={() => (
          <MaterialCommunityIcons
            name='cog-outline'
            size={20}
            color={theme.icon}
          />
        )}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderRightWidth: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },
  drawerRow: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
  },
})

export default CustomDrawerContent
